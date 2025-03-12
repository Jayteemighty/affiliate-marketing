from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
from rest_framework import serializers, generics, permissions
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
from affiliates.models import AffiliateCourse


class InitiatePaymentView(APIView):
    """API to initiate a Paystack payment."""
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        course_id = request.data.get('course_id')
        affiliate_token = request.data.get('affiliate_token')  # Unique token from the affiliate link

        if not course_id:
            return Response({'error': 'Course ID is required'}, status=status.HTTP_400_BAD_REQUEST)

        course = get_object_or_404(Course, id=course_id)
        amount = course.price

        # Initialize Paystack payment
        paystack_url = "https://api.paystack.co/transaction/initialize"
        secret_key = settings.PAYSTACK_SECRET_KEY

        # Define the callback URL (backend API endpoint)
        callback_url = f"{settings.BACKEND_URL}/api/payment/callback/"

        # Define the redirect URL (frontend generic "payment completed" page)
        redirect_url = f"{settings.FRONTEND_URL}/payment-completed/"  # Frontend page to handle payment status

        # Prepare metadata for affiliate tracking
        metadata = {
            "course_id": course.id,
            "affiliate_token": affiliate_token,  # Include the affiliate token
            "referred_user_email": user.email  # Include the referred user's email
        }

        payload = {
            "email": user.email,
            "amount": int(amount * 100),  # Convert to kobo
            "callback_url": callback_url,  # Backend callback URL
            "redirect_url": redirect_url,  # Frontend redirect URL
            "metadata": metadata  # Include metadata for affiliate tracking
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
                # account, _ = CustomerAccount.objects.get_or_create(user=payment.user)
                # account.balance += Decimal(str(payment.amount))  # Ensure Decimal
                # account.save()

                # Handle affiliate commission (if applicable)
                metadata = response_data['data']['metadata']
                affiliate_token = metadata.get('affiliate_token')
                course_id = metadata.get('course_id')
                referred_user_email = metadata.get('referred_user_email')

                if affiliate_token and course_id and referred_user_email:
                    # Find the affiliate course using the unique token
                    affiliate_course = get_object_or_404(AffiliateCourse, unique_token=affiliate_token)
                    affiliate = affiliate_course.affiliate
                    course = affiliate_course.course

                    # Get the commission rate for the course
                    commission_rate = Decimal(str(Commission.objects.get(course=course).rate))  # Ensure Decimal

                    # Calculate the commission amount
                    commission_amount = Decimal(str(payment.amount)) * commission_rate  # Ensure Decimal

                    # Create a referral record and mark it as completed
                    referral = Referral.objects.create(
                        course=course,
                        affiliate=affiliate,
                        referred_user_email=referred_user_email,
                        is_completed=True  # Mark the referral as completed
                    )

                    # Update affiliate earnings and sales
                    affiliate.overall_sales += 1
                    affiliate.today_sales += 1
                    affiliate.overall_affiliate_earnings += Decimal(str(commission_amount))  # Ensure Decimal
                    affiliate.today_affiliate_earnings += Decimal(str(commission_amount))  # Ensure Decimal
                    affiliate.available_affiliate_earnings += Decimal(str(commission_amount))  # Ensure Decimal
                    affiliate.save()

                    # Record the sale
                    Sale.objects.create(
                        vendor=affiliate.user,
                        amount=Decimal(str(payment.amount)),  # Ensure Decimal
                        commission=Decimal(str(commission_amount)),  # Ensure Decimal
                        referral=referral  # Link to the referral
                    )

                # Redirect to frontend success page
                return HttpResponseRedirect("https://profits-plus-tau.vercel.app/payment/success")
            else:
                payment = Payment.objects.get(reference=reference)
                payment.status = 'failed'
                payment.save()

                # Redirect to frontend failure page
                return HttpResponseRedirect("https://profits-plus-tau.vercel.app/payment/failure")

        except requests.exceptions.RequestException:
            return Response({'error': 'Failed to verify payment'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        


class WithdrawalRequestView(generics.CreateAPIView):
    """API for affiliates to request withdrawals."""
    permission_classes = [IsAuthenticated]
    serializer_class = WithdrawalRequestSerializer

    def perform_create(self, serializer):
        user = self.request.user
        affiliate = get_object_or_404(Affiliate, user=user)
        
        # Ensure the withdrawal amount does not exceed available earnings
        amount = serializer.validated_data['amount']
        if amount > affiliate.available_affiliate_earnings:
            raise serializers.ValidationError({"amount": "Withdrawal amount exceeds available earnings."})
        
        # Automatically set the user
        serializer.save(user=user)


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