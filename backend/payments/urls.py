from django.urls import path
from . import views

urlpatterns = [
    # Payment APIs
    path('initiate-payment/', views.InitiatePaymentView.as_view(), name='initiate-payment'),
    path('payment/callback/', views.PaymentCallbackView.as_view(), name='payment-callback'),
    path('payments/', views.PaymentListView.as_view(), name='payment-list'),
    path('total-payments/', views.TotalPaymentView.as_view(), name='total-payments'),
    path('user-payments/', views.ListUserPayments.as_view(), name='user-payments'),

    # Withdrawal APIs
    path('withdrawal-request/', views.WithdrawalRequestView.as_view(), name='withdrawal-request'),

    # Account APIs
    path('account/', views.CustomerAccountView.as_view(), name='customer-account'),

    # Dummy Pages for Testing
    path('success-dummy/', views.DummySuccessPageView.as_view(), name='success-dummy'),
    path('failure-dummy/', views.DummyFailurePageView.as_view(), name='failure-dummy'),
]