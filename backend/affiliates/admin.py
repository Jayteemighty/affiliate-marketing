from django.contrib import admin
from .models import Affiliate, AffiliateCourse, Referral, Sale, Commission

@admin.register(Affiliate)
class AffiliateAdmin(admin.ModelAdmin):
    list_display = ('user', 'today_sales', 'overall_sales', 'today_affiliate_earnings', 'overall_affiliate_earnings')
    search_fields = ('user__email',)

@admin.register(AffiliateCourse)
class AffiliateCourseAdmin(admin.ModelAdmin):
    list_display = ('affiliate', 'course', 'affiliate_link')
    search_fields = ('affiliate__user__email', 'course__title')

@admin.register(Referral)
class ReferralAdmin(admin.ModelAdmin):
    list_display = ('affiliate', 'course', 'referred_user_email', 'is_completed')
    search_fields = ('affiliate__user__email', 'course__title', 'referred_user_email')

@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    list_display = ('vendor', 'amount', 'commission', 'date')
    search_fields = ('vendor__email',)

@admin.register(Commission)
class CommissionAdmin(admin.ModelAdmin):
    list_display = ('course', 'rate')
    search_fields = ('course__title',)