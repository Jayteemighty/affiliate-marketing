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
        read_only_fields = ['user', 'status', 'created_at']

    def validate_amount(self, value):
        if value <= 0:
            raise serializers.ValidationError("Withdrawal amount must be greater than zero.")
        return value

    def validate_withdrawal_type(self, value):
        if value not in ['affiliate', 'vendor']:
            raise serializers.ValidationError("Invalid withdrawal type. Must be 'affiliate' or 'vendor'.")
        return value

class CustomerAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerAccount
        fields = '__all__'