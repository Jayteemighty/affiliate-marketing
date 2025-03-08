from django.urls import path
from .views import CourseRequestCreateView

urlpatterns = [
    path('course-requests/', CourseRequestCreateView.as_view(), name='course-request-create'),
]