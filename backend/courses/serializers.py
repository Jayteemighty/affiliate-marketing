from rest_framework import serializers
from .models import Course, Lesson, UserRegisteredCourse, CourseRequest
from rest_framework import serializers
from .models import Course
from affiliates.models import Commission
from django.conf import settings

class CourseSerializer(serializers.ModelSerializer):
    instructor_name = serializers.SerializerMethodField()
    commission_rate = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = ['id', 'title', 'price', 'instructor_name', 'description', 'commission_rate', 'video_url', "created_at", 'seller_name', 'is_approved']

    def get_instructor_name(self, obj):
        return f"{obj.instructor.first_name} {obj.instructor.last_name}"

    def get_commission_rate(self, obj):
        try:
            commission = Commission.objects.get(course=obj)
            return commission.rate * 100
        except Commission.DoesNotExist:
            return 0

class LessonSerializer(serializers.ModelSerializer):
    video = serializers.SerializerMethodField()
    
    class Meta:
        model = Lesson
        fields = '__all__'
        read_only_fields = ['course']
    
    def get_video(self, obj):
        return obj.get_video_url()

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