import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
from rest_framework import serializers, generics, permissions
from django.conf import settings
from django.db.models import Sum
from django.shortcuts import get_object_or_404
from django.http import HttpResponseRedirect
from decimal import Decimal
from rest_framework import generics
from affiliates.models import Affiliate
from .models import Payment, WithdrawalRequest, CustomerAccount, Transaction
from .serializers import PaymentSerializer, WithdrawalRequestSerializer, CustomerAccountSerializer
from affiliates.models import Referral, Sale, Commission, AffiliateCourse
from courses.models import Course, UserRegisteredCourse
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from affiliates.serializers import SaleSerializer


class InitiatePaymentView(APIView):
    """API to initiate a Paystack payment."""
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        course_id = request.data.get('course_id')
        unique_token = request.data.get('unique_token')  # Unique token from the affiliate link

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
        # redirect_url = f"{settings.FRONTEND_URL}/payment-completed/"  # Frontend page to handle payment status

        # Prepare metadata for affiliate tracking
        metadata = {
            "course_id": course.id,
            "unique_token": unique_token,  # Include the affiliate token
            "referred_user_email": user.email  # Include the referred user's email
        }

        payload = {
            "email": user.email,
            "amount": int(amount * 100),  # Convert to kobo
            "callback_url": callback_url,  # Backend callback URL
            # "redirect_url": redirect_url,  # Frontend redirect URL
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

                # Handle affiliate commission (if applicable)
                metadata = response_data['data']['metadata']
                unique_token = metadata.get('unique_token')
                course_id = metadata.get('course_id')
                referred_user_email = metadata.get('referred_user_email')
                
                # Register the user for the course
                course_id = response_data['data']['metadata'].get('course_id')
                course = get_object_or_404(Course, id=course_id)
                UserRegisteredCourse.objects.get_or_create(user=payment.user, course=course)

                if unique_token and course_id and referred_user_email:
                    # Find the affiliate course using the unique token
                    affiliate_course = get_object_or_404(AffiliateCourse, unique_token=unique_token)
                    affiliate = affiliate_course.affiliate
                    course = affiliate_course.course

                    # Get the commission rate for the course
                    commission_rate = Decimal(str(Commission.objects.get(course=course).rate))  # Ensure Decimal

                    # Calculate the commission amount
                    commission_amount = Decimal(str(payment.amount)) * commission_rate  # Ensure Decimal

                    # Find the referral record and mark it as completed
                    referral = Referral.objects.filter(
                        course=course,
                        affiliate=affiliate,
                        referred_user_email=referred_user_email,
                        is_completed=False
                    ).first()

                    if referral:
                        referral.is_completed = True
                        referral.save()

                        # Update affiliate earnings and sales
                        affiliate.overall_sales += 1
                        affiliate.today_sales += 1
                        affiliate.overall_affiliate_earnings += commission_amount
                        affiliate.today_affiliate_earnings += commission_amount
                        affiliate.available_affiliate_earnings += commission_amount
                        affiliate.save()

                        # Record the sale (vendor is the course owner, affiliate_seller is the affiliate)
                        sale = Sale.objects.create(
                            vendor=course.instructor,  # Set vendor to the course owner (instructor)
                            affiliate_seller=affiliate.user,  # Set affiliate_seller to the affiliate
                            amount=Decimal(str(payment.amount)),
                            commission=commission_amount,
                            referral=referral
                        )


                # Redirect to frontend success page
                return HttpResponseRedirect(f"{settings.FRONTEND_URL}/payment/success")
            else:
                payment = Payment.objects.get(reference=reference)
                payment.status = 'failed'
                payment.save()

                # Redirect to frontend failure page
                return HttpResponseRedirect(f"{settings.FRONTEND_URL}/payment/failure")

        except requests.exceptions.RequestException:
            return Response({'error': 'Failed to verify payment'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class WithdrawalRequestView(generics.CreateAPIView):
    """API for affiliates and vendors to request withdrawals."""
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = WithdrawalRequestSerializer

    def perform_create(self, serializer):
        user = self.request.user
        affiliate = get_object_or_404(Affiliate, user=user)

        # Get the withdrawal type and amount
        withdrawal_type = serializer.validated_data.get('withdrawal_type', 'affiliate')
        amount = serializer.validated_data['amount']

        # Log the withdrawal type and amount
        print(f"Withdrawal Type: {withdrawal_type}, Amount: {amount}")

        # Ensuring the withdrawal amount does not exceed available earnings
        if withdrawal_type == 'affiliate':
            if amount > affiliate.available_affiliate_earnings:
                raise serializers.ValidationError({"amount": "Withdrawal amount exceeds available affiliate earnings."})
        elif withdrawal_type == 'vendor':
            if amount > affiliate.available_vendor_earnings:
                raise serializers.ValidationError({"amount": "Withdrawal amount exceeds available vendor earnings."})
        else:
            raise serializers.ValidationError({"withdrawal_type": "Invalid withdrawal type. Must be 'affiliate' or 'vendor'."})

        # Automatically set the user and withdrawal type
        serializer.save(user=user, withdrawal_type=withdrawal_type)

class WithdrawalListView(generics.ListAPIView):
    """API to list withdrawal requests for the logged-in user."""
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = WithdrawalRequestSerializer

    def get_queryset(self):
        # Return withdrawal requests for the logged-in user
        return WithdrawalRequest.objects.filter(user=self.request.user)


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


class TransactionStatusView(generics.ListAPIView):
    """API to list all transactions for a user (payments, affiliate sales, and withdrawal requests)."""
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        # Get all payments made by the user
        user_payments = Payment.objects.filter(user=user)
        # Get payments for courses owned by the user (if they are an instructor)
        course_payments = Payment.objects.filter(course__instructor=user, status='completed')
        # Get affiliate sales for the user (if they are an affiliate)
        affiliate_sales = Sale.objects.filter(affiliate_seller=user)
        # Get withdrawal requests for the user
        withdrawal_requests = WithdrawalRequest.objects.filter(user=user)

        # Combine all data into a single response
        return {
            "user_payments": user_payments,
            "course_payments": course_payments,
            "affiliate_sales": affiliate_sales,
            "withdrawal_requests": withdrawal_requests,
        }

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        user_payments = PaymentSerializer(queryset["user_payments"], many=True).data
        course_payments = PaymentSerializer(queryset["course_payments"], many=True).data
        affiliate_sales = SaleSerializer(queryset["affiliate_sales"], many=True).data
        withdrawal_requests = WithdrawalRequestSerializer(queryset["withdrawal_requests"], many=True).data

        return Response({
            "user_payments": user_payments,
            "course_payments": course_payments,
            "affiliate_sales": affiliate_sales,
            "withdrawal_requests": withdrawal_requests,
        })
