from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Affiliate, AffiliateCourse, Referral, Sale, Commission
from .serializers import AffiliateSerializer, AffiliateCourseSerializer, ReferralSerializer, SaleSerializer
from courses.models import Course
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from django.conf import settings
from decimal import Decimal

class AffiliateDashboardView(generics.RetrieveAPIView):
    """API for affiliates to view their dashboard."""
    permission_classes = [IsAuthenticated]
    serializer_class = AffiliateSerializer

    def get_object(self):
        return get_object_or_404(Affiliate, user=self.request.user)


class GenerateAffiliateLinkView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        course_id = request.data.get('course_id')

        if not course_id:
            return Response({'error': 'Course ID is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            course = get_object_or_404(Course, id=course_id)
            affiliate, _ = Affiliate.objects.get_or_create(user=user)

            # Generate a unique affiliate link using the unique_token
            affiliate_course, created = AffiliateCourse.objects.get_or_create(
                affiliate=affiliate,
                course=course
            )

            affiliate_link = f"{settings.FRONTEND_URL}/course/{course_id}/{affiliate_course.unique_token}"
            print("Generated Affiliate Link:", affiliate_link)  # Debug log

            # Update the affiliate_link field
            affiliate_course.affiliate_link = affiliate_link
            affiliate_course.save()

            return Response({'affiliate_link': affiliate_link}, status=status.HTTP_201_CREATED)
        except Exception as e:
            print(f"Error generating affiliate link: {e}")  # Log the error
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class TrackReferralView(APIView):
    """API to track affiliate referrals."""
    permission_classes = []

    def post(self, request):
        unique_token = request.data.get('unique_token')
        referred_user_email = request.data.get('referred_user_email')  # Get referred user email

        if not unique_token:
            return Response({'error': 'Unique token is required'}, status=status.HTTP_400_BAD_REQUEST)

        if not referred_user_email:
            return Response({'error': 'Referred user email is required'}, status=status.HTTP_400_BAD_REQUEST)

        affiliate_course = get_object_or_404(AffiliateCourse, unique_token=unique_token)

        # Create a referral record
        referral = Referral.objects.create(
            course=affiliate_course.course,
            affiliate=affiliate_course.affiliate,
            referred_user_email=referred_user_email,  # Ensure this is provided
            is_completed=False  # Mark as incomplete initially
        )

        # Update referral count
        affiliate_course.referral_count += 1
        affiliate_course.save()

        return Response({'message': 'Referral tracked successfully'}, status=status.HTTP_200_OK)


class AffiliateSalesView(generics.ListAPIView):
    """API for affiliates to view their sales."""
    permission_classes = [IsAuthenticated]
    serializer_class = SaleSerializer

    def get_queryset(self):
        affiliate = get_object_or_404(Affiliate, user=self.request.user)
        return Sale.objects.filter(vendor=affiliate.user)