from rest_framework import serializers
from .models import Affiliate, AffiliateCourse, Referral, Sale

class AffiliateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Affiliate
        fields = '__all__'

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