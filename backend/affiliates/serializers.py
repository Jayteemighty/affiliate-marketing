from rest_framework import serializers
from .models import Affiliate, AffiliateCourse, Referral, Sale

class AffiliateSerializer(serializers.ModelSerializer):
    overall_vendor_earnings = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    available_vendor_earnings = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    total_withdrawals = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    my_products = serializers.IntegerField(read_only=True)
    affiliate_sales = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    affiliate_commission = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = Affiliate
        fields = [
            'today_sales', 'overall_sales', 'today_affiliate_earnings', 'overall_affiliate_earnings',
            'available_affiliate_earnings', 'withdrawal_fee', 'overall_vendor_earnings',
            'available_vendor_earnings', 'total_withdrawals', 'my_products',
            'affiliate_sales', 'affiliate_commission',
        ]

class AffiliateCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = AffiliateCourse
        fields = '__all__'

class ReferralSerializer(serializers.ModelSerializer):
    class Meta:
        model = Referral
        fields = '__all__'

class SaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sale
        fields = '__all__'