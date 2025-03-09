from django.contrib import admin
from .models import Course, Lesson, UserRegisteredCourse, CourseRequest

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    """Admin interface for the Course model."""
    
    list_display = ('title', 'instructor', 'price', 'seller_name', 'is_approved', 'created_at')
    list_filter = ('is_approved', 'created_at', 'instructor')
    search_fields = ('title', 'description', 'seller_name')
    list_editable = ('is_approved',)  # Allow admins to approve courses directly from the list view
    actions = ['approve_courses']

    def approve_courses(self, request, queryset):
        """Admin action to approve selected courses."""
        queryset.update(is_approved=True)
    approve_courses.short_description = "Approve selected courses"


@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    """Admin interface for the Lesson model."""
    
    list_display = ('title', 'course')
    list_filter = ('course',)
    search_fields = ('title', 'content')


@admin.register(UserRegisteredCourse)
class UserRegisteredCourseAdmin(admin.ModelAdmin):
    """Admin interface for the UserRegisteredCourse model."""
    
    list_display = ('user', 'course', 'created_at')
    list_filter = ('course', 'created_at')
    search_fields = ('user__email', 'course__title')


@admin.register(CourseRequest)
class CourseRequestAdmin(admin.ModelAdmin):
    """Admin interface for the CourseRequest model."""
    
    list_display = ('course_title', 'seller_name', 'user', 'email', 'is_fulfilled', 'created_at')
    list_filter = ('is_fulfilled', 'created_at')
    search_fields = ('course_title', 'seller_name', 'user__email')
    list_editable = ('is_fulfilled',)  # Allow admins to mark requests as fulfilled
    actions = ['mark_as_fulfilled']

    def mark_as_fulfilled(self, request, queryset):
        """Admin action to mark selected course requests as fulfilled."""
        queryset.update(is_fulfilled=True)
    mark_as_fulfilled.short_description = "Mark selected requests as fulfilled"