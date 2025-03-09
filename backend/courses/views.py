from rest_framework import generics, permissions
from .models import Course, Lesson, UserRegisteredCourse, CourseRequest
from .serializers import CourseSerializer, LessonSerializer, UserRegisteredCourseSerializer, CourseRequestSerializer

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