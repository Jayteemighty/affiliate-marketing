import uuid
from django.db import models
from django.contrib.auth import get_user_model
from courses.models import Course
from django.conf import settings

User = get_user_model()

class Affiliate(models.Model):
    """Model representing an affiliate promoting courses."""

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="affiliate_profile")
    today_sales = models.PositiveIntegerField(default=0)
    overall_sales = models.PositiveIntegerField(default=0)
    today_affiliate_earnings = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    overall_affiliate_earnings = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    available_affiliate_earnings = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    withdrawal_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return f"{self.user.email} - Affiliate"


class AffiliateCourse(models.Model):
    """Tracks courses promoted by an affiliate."""

    affiliate = models.ForeignKey(Affiliate, on_delete=models.CASCADE, related_name="courses")
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="affiliate_courses")
    affiliate_link = models.URLField(unique=True)  # Unique link for tracking
    unique_token = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)  # Unique token for the link

    def __str__(self):
        return f"{self.affiliate.user.email} - {self.course.title}"


class Commission(models.Model):
    """Tracks commission rates for courses."""

    course = models.OneToOneField(Course, on_delete=models.CASCADE, related_name="commission")
    rate = models.DecimalField(max_digits=4, decimal_places=2, default=0.40)  # 40% default commission

    def __str__(self):
        return f"{self.course.title} - {self.rate * 100}%"


class Referral(models.Model):
    """Tracks referrals made by affiliates."""

    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="referrals")
    affiliate = models.ForeignKey(Affiliate, on_delete=models.CASCADE, related_name="referrals")
    referred_user_email = models.EmailField()
    is_completed = models.BooleanField(default=False)  # Track if the referral resulted in a sale

    def __str__(self):
        return f"{self.affiliate.user.email} referred {self.referred_user_email} for {self.course.title}"


class Sale(models.Model):
    """Tracks sales made through affiliates."""

    vendor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="sales")
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    commission = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)
    referral = models.ForeignKey(Referral, on_delete=models.SET_NULL, null=True, blank=True)  # Link to the referral

    def __str__(self):
        return f"Sale by {self.vendor.email} - ${self.amount} - Commission: ${self.commission}"