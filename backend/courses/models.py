from django.conf import settings
from django.db import models
from django.contrib.auth import get_user_model
from cloudinary.models import CloudinaryField

User = get_user_model()

class Course(models.Model):
    """Model representing a course."""
    
    title = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    instructor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="courses")
    created_at = models.DateTimeField(auto_now_add=True)
    video_url = models.URLField(blank=True, null=True)  # URL to the video (e.g., hosted on S3 or YouTube)
    seller_name = models.CharField(max_length=255, blank=True, null=True)  # Seller's name
    is_approved = models.BooleanField(default=False)  # Admin approval status

    def __str__(self):
        return self.title


class Lesson(models.Model):
    """Model representing lessons inside a course."""

    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="lessons")
    title = models.CharField(max_length=255)
    description = models.TextField(default="")
    content = models.TextField()
    video = CloudinaryField(resource_type="video", folder="course_videos") # URL to the lesson video
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    def __str__(self):
        return f"{self.course.title} - {self.title}"


class UserRegisteredCourse(models.Model):
    """Tracks users who have registered for courses."""

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="registered_courses")
    course = models.ForeignKey("Course", on_delete=models.CASCADE, related_name="registrations")
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('user', 'course')

    def __str__(self):
        return f"{self.user.email} - {self.course.title}"


class CourseRequest(models.Model):
    """Model for users to request courses to be uploaded."""

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="course_requests")
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    course_title = models.CharField(max_length=255)
    seller_name = models.CharField(max_length=255)
    affiliate_commission = models.DecimalField(max_digits=4, decimal_places=2, default=0.40) 
    email = models.EmailField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_fulfilled = models.BooleanField(default=False)  # Admin marks as fulfilled once the course is uploaded

    def __str__(self):
        return f"{self.course_title} requested by {self.user.email}"