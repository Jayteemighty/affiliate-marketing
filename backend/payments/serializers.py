from rest_framework import serializers
from .models import Payment, WithdrawalRequest, CustomerAccount

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'

class WithdrawalRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = WithdrawalRequest
        fields = '__all__'

class CustomerAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerAccount
        fields = '__all__'