from rest_framework import serializers
from .models import CourseRequest

class CourseRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseRequest
        fields = ['id', 'user', 'course_title', 'seller_name', 'email', 'created_at', 'is_fulfilled']
        read_only_fields = ['user', 'created_at', 'is_fulfilled']