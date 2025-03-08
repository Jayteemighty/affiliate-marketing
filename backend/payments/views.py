from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.conf import settings
from .models import Payment, WithdrawalRequest, Withdrawal
from .serializers import PaymentSerializer, WithdrawalRequestSerializer, WithdrawalSerializer
import uuid
import requests
import random
import string
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from django.db.models import Sum
from datetime import timedelta
from rest_framework import generics
from django.http import JsonResponse
from django.utils import timezone
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from decimal import Decimal
from .models import Payment, CustomerAccount, Transaction
import logging

# Configure the logger
logger = logging.getLogger(__name__)

class PaymentListView(generics.ListAPIView):
    """ Endpoint to get all payment details. """
    
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [IsAdminUser]
        

class TotalPaymentView(APIView):
    """ Endpoint to get the total amount of successful payments. """
    
    permission_classes = [IsAdminUser]

    def get(self, request):
        total_payment = Payment.objects.filter(status='successful').aggregate(total=Sum('amount'))['total'] or 0.00
        return Response({"total_payment": total_payment})

class ListUserPayments(generics.ListAPIView):
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Payment.objects.filter(user=user)

class InitiatePaystackPayment(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        amount = request.data.get('amount')

        if not amount or float(amount) <= 0:
            return Response({'error': 'Invalid amount'}, status=400)

        paystack_url = "https://api.paystack.co/transaction/initialize"
        secret_key = settings.PAYSTACK_SECRET_KEY

        payload = {
            "email": user.email,
            "amount": int(float(amount) * 100),  # Convert amount to kobo
            "callback_url": f"http://127.0.0.1:8000/api/v1/payment/paystack/callback",  # Frontend success page
        }

        headers = {
            "Authorization": f"Bearer {secret_key}",
            "Content-Type": "application/json"
        }

        try:
            response = requests.post(paystack_url, json=payload, headers=headers)
            response_data = response.json()

            # Store the reference Paystack returns
            paystack_reference = response_data.get("data", {}).get("reference")

            Payment.objects.create(
                user=user,
                amount=amount,
                reference=paystack_reference,
                status="pending"
            )

            return Response({
                "status": "success",
                "message": "Payment initialized",
                "data": response_data
            }, status=200)

        except requests.exceptions.RequestException:
            return Response({'error': 'Payment initiation failed'}, status=500)


class PaystackPaymentCallback(APIView):
    def get(self, request):
        reference = request.GET.get('reference')

        if not reference:
            return Response({'error': 'Reference not provided'}, status=400)

        paystack_url = f"https://api.paystack.co/transaction/verify/{reference}"
        secret_key = settings.PAYSTACK_SECRET_KEY

        headers = {
            "Authorization": f"Bearer {secret_key}",
            "Content-Type": "application/json"
        }

        try:
            response = requests.get(paystack_url, headers=headers)
            response_data = response.json()

            if response_data.get('status') and response_data.get('data', {}).get('status') == 'success':
                try:
                    payment = Payment.objects.get(reference=reference)
                    payment.status = 'successful'
                    payment.save()

                    # Update user account balance
                    account, _ = CustomerAccount.objects.get_or_create(user=payment.user)
                    account.balance += Decimal(str(payment.amount))
                    account.save()

                    # Add transaction entry
                    Transaction.objects.create(
                        user=payment.user,
                        amount=payment.amount,
                        status='successful'
                    )

                    # Redirect to frontend success page
                    return HttpResponseRedirect(f"http://127.0.0.1:8000/api/v1/payment/success-dummy")

                except Payment.DoesNotExist:
                    return Response({'error': 'Payment not found'}, status=404)

            else:
                # Mark payment as failed
                try:
                    payment = Payment.objects.get(reference=reference)
                    payment.status = 'failed'
                    payment.save()

                    # Add transaction entry
                    Transaction.objects.create(
                        user=payment.user,
                        amount=payment.amount,
                        status='failed'
                    )

                except Payment.DoesNotExist:
                    return Response({'error': 'Payment not found'}, status=404)

                # Redirect to frontend failure page
                return HttpResponseRedirect(f"http://127.0.0.1:8000/api/v1/payment/failure-dummy")

        except requests.exceptions.RequestException:
            return Response({'error': 'Failed to verify payment status'}, status=500)


class DummySuccessPageView(APIView):
    def get(self, request):
        return HttpResponse("Payment was successful. Frontend is under construction.")
        
class DummyFailurePageView(APIView):
    def get(self, request):
        return HttpResponse("Payment failed. Frontend is under construction.")


# class WithdrawFunds(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         user = request.user
#         account_number = request.data.get('account_number')
#         bank_code = request.data.get('bank_code')
#         amount = request.data.get('amount')
#         narration = request.data.get('narration', 'Withdrawal from app account')
#         account_name = request.data.get('account_name')  # Add account name
#         sender_name = request.data.get('sender_name', 'Your App Name')  # Add sender name

#         if not account_number or not bank_code or not amount or Decimal(amount) <= 0:
#             return Response({'error': 'Invalid data provided'}, status=status.HTTP_400_BAD_REQUEST)

#         try:
#             # Check if the user has sufficient balance
#             account = CustomerAccount.objects.get(user=user)
#             if account.balance < Decimal(amount):
#                 return Response({'error': 'Insufficient balance'}, status=status.HTTP_400_BAD_REQUEST)

#             # Withdraw funds using Nomba
#             response = NombaPaymentService.withdraw_funds(
#                 account_number=account_number,
#                 bank_code=bank_code,
#                 amount=Decimal(amount),
#                 narration=narration,
#                 account_name=account_name,  # Pass account name
#                 sender_name=sender_name  # Pass sender name
#             )

#             if response.get('code') == "202":  # Check for processing status
#                 # Get the transaction reference
#                 transaction_ref = response.get("data", {}).get("meta", {}).get("merchantTxRef")

#                 # Poll the transaction status until it is completed
#                 max_attempts = 10  # Maximum number of attempts
#                 delay = 5  # Delay between attempts (in seconds)

#                 for attempt in range(max_attempts):
#                     time.sleep(delay)  # Wait before checking the status
#                     status_response = NombaPaymentService.check_transaction_status(transaction_ref)

#                     if status_response.get("data", {}).get("status") == "SUCCESS":
#                         # Deduct the amount from the user's balance
#                         account.balance -= Decimal(amount)
#                         account.save()

#                         # Add transaction entry
#                         Transaction.objects.create(
#                             user=user,
#                             amount=amount,
#                             status='successful'
#                         )

#                         return Response({
#                             "status": "success",
#                             "message": "Withdrawal successful",
#                             "data": status_response.get("data", {})
#                         }, status=status.HTTP_200_OK)

#                     elif status_response.get("data", {}).get("status") == "FAILED":
#                         return Response({
#                             "status": "failed",
#                             "message": "Withdrawal failed",
#                             "data": status_response.get("data", {})
#                         }, status=status.HTTP_400_BAD_REQUEST)

#                 # If the transaction is still processing after max attempts
#                 return Response({
#                     "status": "processing",
#                     "message": "Withdrawal is still processing. Please check again later.",
#                     "data": response.get("data", {})
#                 }, status=status.HTTP_200_OK)

#             else:
#                 return Response({'error': 'Withdrawal failed', "details": response}, status=status.HTTP_400_BAD_REQUEST)

#         except Exception as e:
#             logger.error(f"Error withdrawing funds: {str(e)}")
#             return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)