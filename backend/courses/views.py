from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Course, Lesson, UserRegisteredCourse, CourseRequest
from .serializers import CourseSerializer, LessonSerializer, UserRegisteredCourseSerializer, CourseRequestSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from django.shortcuts import get_object_or_404


# Course Views
class CourseListView(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        if self.request.user.is_staff:  # Only admins can create courses
            serializer.save(instructor=self.request.user)
        else:
            raise permissions.PermissionDenied("Only admins can create courses.")

class CourseDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_update(self, serializer):
        if self.request.user.is_staff:  # Only admins can update courses
            serializer.save()
        else:
            raise permissions.PermissionDenied("Only admins can update courses.")

    def perform_destroy(self, instance):
        if self.request.user.is_staff:  # Only admins can delete courses
            instance.delete()
        else:
            raise permissions.PermissionDenied("Only admins can delete courses.")

# Lesson Views
class LessonListView(generics.ListCreateAPIView):
    serializer_class = LessonSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        course_id = self.kwargs['course_id']
        course = get_object_or_404(Course, id=course_id)

        # Check if the user has access to the course
        if not UserRegisteredCourse.objects.filter(user=self.request.user, course=course).exists():
            raise PermissionDenied("You do not have access to this course.")

        return Lesson.objects.filter(course_id=course_id)

    def perform_create(self, serializer):
        if self.request.user.is_staff:  # Only admins can create lessons
            course_id = self.kwargs['course_id']
            course = Course.objects.get(id=course_id)
            serializer.save(course=course)
        else:
            raise permissions.PermissionDenied("Only admins can create lessons.")

class LessonDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_object(self):
        lesson = super().get_object()
        course = lesson.course

        # Check if the user has access to the course
        if not UserRegisteredCourse.objects.filter(user=self.request.user, course=course).exists():
            raise PermissionDenied("You do not have access to this course.")

        return lesson

    def perform_update(self, serializer):
        if self.request.user.is_staff:  # Only admins can update lessons
            serializer.save()
        else:
            raise permissions.PermissionDenied("Only admins can update lessons.")

    def perform_destroy(self, instance):
        if self.request.user.is_staff:  # Only admins can delete lessons
            instance.delete()
        else:
            raise permissions.PermissionDenied("Only admins can delete lessons.")


# UserRegisteredCourse Views
class UserRegisteredCourseListView(generics.ListCreateAPIView):
    serializer_class = UserRegisteredCourseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return UserRegisteredCourse.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# CourseRequest Views
class CourseRequestListView(generics.ListAPIView):
    queryset = CourseRequest.objects.all()
    serializer_class = CourseRequestSerializer
    permission_classes = [permissions.IsAdminUser]  # Only admins can view all requests

# Create CourseRequest Views
class CourseRequestCreateView(generics.CreateAPIView):
    queryset = CourseRequest.objects.all()
    serializer_class = CourseRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# Get User Products
class UserProductsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        # Fetch courses owned by the user
        courses = Course.objects.filter(instructor=request.user)
        course_data = CourseSerializer(courses, many=True).data

        # Fetch course requests made by the user
        course_requests = CourseRequest.objects.filter(user=request.user)
        course_request_data = CourseRequestSerializer(course_requests, many=True).data

        # Combine the data
        response_data = {
            "courses": course_data,
            "course_requests": course_request_data,
        }

        return Response(response_data)

# Course Access
class CheckCourseAccessView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, course_id):
        user = request.user
        has_access = UserRegisteredCourse.objects.filter(user=user, course_id=course_id).exists()
        return Response({"has_access": has_access})
