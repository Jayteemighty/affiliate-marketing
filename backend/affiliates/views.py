from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Affiliate, AffiliateCourse, Referral, Sale
from .serializers import AffiliateSerializer, AffiliateCourseSerializer, ReferralSerializer, SaleSerializer
from courses.models import Course
from django.shortcuts import get_object_or_404

class AffiliateDashboardView(generics.RetrieveAPIView):
    """API for affiliates to view their dashboard."""
    permission_classes = [IsAuthenticated]
    serializer_class = AffiliateSerializer

    def get_object(self):
        return get_object_or_404(Affiliate, user=self.request.user)


class GenerateAffiliateLinkView(generics.CreateAPIView):
    """API to generate a unique affiliate link for a course."""
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        course_id = request.data.get('course_id')

        if not course_id:
            return Response({'error': 'Course ID is required'}, status=status.HTTP_400_BAD_REQUEST)

        course = get_object_or_404(Course, id=course_id)
        affiliate, _ = Affiliate.objects.get_or_create(user=user)

        # Generate a unique affiliate link
        affiliate_link = f"https://profitplus.com.ng/course/{course.id}/affiliate/{affiliate.id}"

        # Save the affiliate link
        affiliate_course, created = AffiliateCourse.objects.get_or_create(
            affiliate=affiliate,
            course=course,
            defaults={'affiliate_link': affiliate_link}
        )

        if not created:
            return Response({'affiliate_link': affiliate_course.affiliate_link}, status=status.HTTP_200_OK)

        return Response({'affiliate_link': affiliate_course.affiliate_link}, status=status.HTTP_201_CREATED)


class TrackReferralView(generics.CreateAPIView):
    """API to track referrals when a user clicks an affiliate link."""
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        affiliate_id = request.data.get('affiliate_id')
        course_id = request.data.get('course_id')
        referred_user_email = request.data.get('referred_user_email')

        if not affiliate_id or not course_id or not referred_user_email:
            return Response({'error': 'Missing required fields'}, status=status.HTTP_400_BAD_REQUEST)

        affiliate = get_object_or_404(Affiliate, id=affiliate_id)
        course = get_object_or_404(Course, id=course_id)

        # Create a referral record
        referral = Referral.objects.create(
            course=course,
            affiliate=affiliate,
            referred_user_email=referred_user_email
        )

        return Response({'message': 'Referral tracked successfully'}, status=status.HTTP_201_CREATED)


class AffiliateSalesView(generics.ListAPIView):
    """API for affiliates to view their sales."""
    permission_classes = [IsAuthenticated]
    serializer_class = SaleSerializer

    def get_queryset(self):
        affiliate = get_object_or_404(Affiliate, user=self.request.user)
        return Sale.objects.filter(vendor=affiliate.user)