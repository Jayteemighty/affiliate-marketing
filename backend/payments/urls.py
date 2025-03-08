from django.urls import path
from . import views


urlpatterns = [
    path('paystack/initiate/', views.InitiatePaystackPayment.as_view(), name='initiate-paystack-payment'),
    path('paystack/callback/', views.PaystackPaymentCallback.as_view(), name='paystack-payment-callback'),
    path('payments/', views.ListUserPayments.as_view(), name='list-user-payments'),
    
    # ADMIN
    path('payments/all/', views.PaymentListView.as_view(), name='payments-list'),
    path('payments/total/', views.TotalPaymentView.as_view(), name='total-payment'),
]
