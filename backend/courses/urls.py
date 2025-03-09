from django.urls import path
from . import views

urlpatterns = [
    # Course Endpoints
    path('courses/', views.CourseListView.as_view(), name='course-list'),
    path('courses/<int:pk>/', views.CourseDetailView.as_view(), name='course-detail'),

    # Lesson Endpoints
    path('courses/<int:course_id>/lessons/', views.LessonListView.as_view(), name='lesson-list'),
    path('lessons/<int:pk>/', views.LessonDetailView.as_view(), name='lesson-detail'),

    # UserRegisteredCourse Endpoints
    path('user-registered-courses/', views.UserRegisteredCourseListView.as_view(), name='user-registered-course-list'),

    # CourseRequest Endpoints
    path('course-requests/', views.CourseRequestListView.as_view(), name='course-request-list'),
    path('course-requests/create/', views.CourseRequestCreateView.as_view(), name='course-request-create'),
]