from rest_framework import serializers
from .models import Course, Lesson, UserRegisteredCourse, CourseRequest

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'
        read_only_fields = ['created_at', 'is_approved']

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