from rest_framework import serializers
from .models import Course, Lesson, UserRegisteredCourse, CourseRequest
from rest_framework import serializers
from .models import Course
from affiliates.models import Commission

class CourseSerializer(serializers.ModelSerializer):
    commission_rate = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = [
            "id", "title", "description", "price", "instructor", "created_at", 
            "video_url", "seller_name", "is_approved", "commission_rate"
        ]

    def get_commission_rate(self, obj):
        """Retrieve commission rate for the course, default to None if not set."""
        commission = getattr(obj, "commission", None)
        return commission.rate if commission else None


class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = '__all__'
        read_only_fields = ['course']

class UserRegisteredCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRegisteredCourse
        fields = '__all__'
        read_only_fields = ['user', 'created_at']

class CourseRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseRequest
        fields = '__all__'
        read_only_fields = ['user', 'created_at', 'is_fulfilled']