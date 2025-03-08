from django.contrib import admin
from .models import Payment, WithdrawalRequest, CustomerAccount, Transaction

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('user', 'amount', 'reference', 'status', 'created_at')
    search_fields = ('user__email', 'reference')
    list_filter = ('status', 'created_at')

@admin.register(WithdrawalRequest)
class WithdrawalRequestAdmin(admin.ModelAdmin):
    list_display = ('user', 'amount', 'bank_name', 'account_number', 'status', 'created_at')
    search_fields = ('user__email', 'bank_name', 'account_number')
    list_filter = ('status', 'created_at')

@admin.register(CustomerAccount)
class CustomerAccountAdmin(admin.ModelAdmin):
    list_display = ('user', 'balance')
    search_fields = ('user__email',)

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('user', 'amount', 'status', 'created_at')
    search_fields = ('user__email',)
    list_filter = ('status', 'created_at')