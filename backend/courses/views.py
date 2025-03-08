from rest_framework import generics, permissions
from .models import CourseRequest
from .serializers import CourseRequestSerializer

class CourseRequestCreateView(generics.CreateAPIView):
    queryset = CourseRequest.objects.all()
    serializer_class = CourseRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)