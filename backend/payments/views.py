from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
from django.conf import settings
from django.db.models import Sum
import requests
from django.shortcuts import get_object_or_404
from django.http import HttpResponseRedirect
from decimal import Decimal
from rest_framework import generics
from affiliates.models import Affiliate
from .models import Payment, WithdrawalRequest, CustomerAccount, Transaction
from .serializers import PaymentSerializer, WithdrawalRequestSerializer, CustomerAccountSerializer
from affiliates.models import Referral, Sale, Commission
from courses.models import Course

class InitiatePaymentView(APIView):
    """API to initiate a Paystack payment."""
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        course_id = request.data.get('course_id')
        referred_user_email = request.data.get('referred_user_email')  # Optional: For affiliate tracking

        if not course_id:
            return Response({'error': 'Course ID is required'}, status=status.HTTP_400_BAD_REQUEST)

        course = get_object_or_404(Course, id=course_id)
        amount = course.price

        # Initialize Paystack payment
        paystack_url = "https://api.paystack.co/transaction/initialize"
        secret_key = settings.PAYSTACK_SECRET_KEY

        payload = {
            "email": user.email,
            "amount": int(amount * 100),  # Convert to kobo
            "callback_url": f"{settings.FRONTEND_URL}/payment/callback/",  # Frontend callback URL
            "metadata": {
                "course_id": course.id,
                "referred_user_email": referred_user_email  # Track affiliate referral
            }
        }

        headers = {
            "Authorization": f"Bearer {secret_key}",
            "Content-Type": "application/json"
        }

        try:
            response = requests.post(paystack_url, json=payload, headers=headers)
            response_data = response.json()

            if response_data.get('status'):
                # Save payment record
                payment = Payment.objects.create(
                    user=user,
                    amount=amount,
                    reference=response_data['data']['reference'],
                    authorization_url=response_data['data']['authorization_url'],
                    status='pending'
                )

                return Response({
                    'status': 'success',
                    'authorization_url': response_data['data']['authorization_url']
                }, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Payment initiation failed'}, status=status.HTTP_400_BAD_REQUEST)

        except requests.exceptions.RequestException:
            return Response({'error': 'Payment initiation failed'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class PaymentCallbackView(APIView):
    """API to handle Paystack payment callback."""
    def get(self, request):
        reference = request.GET.get('reference')

        if not reference:
            return Response({'error': 'Reference not provided'}, status=status.HTTP_400_BAD_REQUEST)

        # Verify payment with Paystack
        paystack_url = f"https://api.paystack.co/transaction/verify/{reference}"
        secret_key = settings.PAYSTACK_SECRET_KEY

        headers = {
            "Authorization": f"Bearer {secret_key}",
            "Content-Type": "application/json"
        }

        try:
            response = requests.get(paystack_url, headers=headers)
            response_data = response.json()

            if response_data.get('status') and response_data['data']['status'] == 'success':
                payment = Payment.objects.get(reference=reference)
                payment.status = 'completed'
                payment.save()

                # Update user account balance
                account, _ = CustomerAccount.objects.get_or_create(user=payment.user)
                account.balance += payment.amount
                account.save()

                # Handle affiliate commission (if applicable)
                metadata = response_data['data']['metadata']
                referred_user_email = metadata.get('referred_user_email')
                course_id = metadata.get('course_id')

                if referred_user_email and course_id:
                    course = Course.objects.get(id=course_id)
                    commission_rate = Commission.objects.get(course=course).rate

                    # Find the affiliate who made the referral
                    referral = Referral.objects.filter(
                        course=course,
                        referred_user_email=referred_user_email
                    ).first()

                    if referral:
                        affiliate = referral.affiliate
                        commission_amount = payment.amount * commission_rate

                        # Update affiliate earnings
                        affiliate.overall_affiliate_earnings += commission_amount
                        affiliate.available_affiliate_earnings += commission_amount
                        affiliate.save()

                        # Record the sale
                        Sale.objects.create(
                            vendor=affiliate.user,
                            amount=payment.amount,
                            commission=commission_amount,
                            referral=referral
                        )

                # Redirect to frontend success page
                return HttpResponseRedirect("http://127.0.0.1:8000/api/v1/payment/success-dummy")
            else:
                payment = Payment.objects.get(reference=reference)
                payment.status = 'failed'
                payment.save()

                # Redirect to frontend failure page
                return HttpResponseRedirect("http://127.0.0.1:8000/api/v1/payment/failure-dummy")

        except requests.exceptions.RequestException:
            return Response({'error': 'Failed to verify payment'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class WithdrawalRequestView(generics.CreateAPIView):
    """API for affiliates to request withdrawals."""
    permission_classes = [IsAuthenticated]
    serializer_class = WithdrawalRequestSerializer

    def perform_create(self, serializer):
        user = self.request.user
        affiliate = get_object_or_404(Affiliate, user=user)
        serializer.save(user=user, amount=affiliate.available_affiliate_earnings)


class DummySuccessPageView(APIView):
    """Dummy success page for testing."""
    def get(self, request):
        return Response({"message": "Payment was successful. Frontend is under construction."})


class DummyFailurePageView(APIView):
    """Dummy failure page for testing."""
    def get(self, request):
        return Response({"message": "Payment failed. Frontend is under construction."})


class PaymentListView(generics.ListAPIView):
    """API to list all payments."""
    permission_classes = [IsAuthenticated]
    serializer_class = PaymentSerializer

    def get_queryset(self):
        return Payment.objects.filter(user=self.request.user)


class CustomerAccountView(generics.RetrieveAPIView):
    """API to retrieve a user's account balance."""
    permission_classes = [IsAuthenticated]
    serializer_class = CustomerAccountSerializer

    def get_object(self):
        return get_object_or_404(CustomerAccount, user=self.request.user)
        

class TotalPaymentView(APIView):
    """ Endpoint to get the total amount of successful payments. """
    
    permission_classes = [IsAdminUser]

    def get(self, request):
        total_payment = Payment.objects.filter(status='successful').aggregate(total=Sum('amount'))['total'] or 0.00
        return Response({"total_payment": total_payment})

class ListUserPayments(generics.ListAPIView):
    """API to list a user payments."""
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Payment.objects.filter(user=user)