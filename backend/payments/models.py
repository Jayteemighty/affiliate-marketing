from django.db import models
from django.contrib.auth import get_user_model
from django.conf import settings
from courses.models import Course
from affiliates.models import Affiliate

User = get_user_model()

# models.py
class WithdrawalRequest(models.Model):
    """Model for tracking withdrawal requests."""
    
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Approved', 'Approved'),
        ('Rejected', 'Rejected'),
    ]

    TYPE_CHOICES = [
        ('affiliate', 'Affiliate Earnings'),
        ('vendor', 'Vendor Earnings'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="withdrawals")
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    bank_name = models.CharField(max_length=255)
    account_number = models.CharField(max_length=50)
    account_name = models.CharField(max_length=255, default="Unknown")
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Pending')
    withdrawal_type = models.CharField(max_length=10, choices=TYPE_CHOICES, default='affiliate')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Withdrawal of ${self.amount} by {self.user.email} - {self.status}"


class Payment(models.Model):
    """Model for tracking user payments."""

    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="payments")
    course = models.ForeignKey(Course, on_delete=models.SET_NULL, null=True, blank=True, related_name="payments")
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    reference = models.CharField(max_length=100, unique=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    authorization_url = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Payment {self.reference} - {self.status}"


class Withdrawal(models.Model):
    """Model for completed withdrawals."""

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="completed_withdrawals")
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    bank_name = models.CharField(max_length=255)
    account_number = models.CharField(max_length=50)
    status = models.CharField(max_length=10, default="Pending")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Withdrawal of ${self.amount} by {self.user.email} - {self.status}"


class CustomerAccount(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="account")
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return f'{self.user.email} - {self.balance}'


class Transaction(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='transactions')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=Payment.STATUS_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.email} - {self.amount} - {self.status}'


# Signals
from django.db.models.signals import pre_save
from django.dispatch import receiver

@receiver(pre_save, sender=WithdrawalRequest)
def deduct_earnings_on_approval(sender, instance, **kwargs):
    if instance.pk:  # Check if the instance already exists (i.e., it's being updated)
        old_instance = WithdrawalRequest.objects.get(pk=instance.pk)
        if old_instance.status != 'Approved' and instance.status == 'Approved':
            affiliate = Affiliate.objects.get(user=instance.user)
            if instance.withdrawal_type == 'affiliate':
                affiliate.available_affiliate_earnings -= instance.amount
            elif instance.withdrawal_type == 'vendor':
                affiliate.available_vendor_earnings -= instance.amount
            affiliate.save()