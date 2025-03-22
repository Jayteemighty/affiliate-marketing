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
from django.db.models import Sum
from courses.models import Course
from payments.models import Withdrawal
from django.db.models import Sum
from django.utils import timezone
from django.db.models import Count
from django.db.models import Q


import logging
logger = logging.getLogger(__name__)


class AffiliateDashboardView(generics.RetrieveAPIView):
    """API for affiliates to view their dashboard."""
    permission_classes = [IsAuthenticated]
    serializer_class = AffiliateSerializer

    def get_object(self):
        # Get or create the Affiliate object for the authenticated user
        affiliate, created = Affiliate.objects.get_or_create(user=self.request.user)
        return affiliate

    def retrieve(self, request, *args, **kwargs):
        try:
            # Retrieve the affiliate object
            affiliate = self.get_object()

            # Calculate vendor earnings
            vendor_earnings = Sale.objects.filter(vendor=self.request.user).aggregate(
                total_earnings=Sum('amount', default=Decimal('0.00')) - Sum('commission', default=Decimal('0.00'))
            )
            overall_vendor_earnings = vendor_earnings.get('total_earnings', Decimal('0.00'))

            # Calculate available vendor earnings (excluding withdrawn amounts)
            total_withdrawals = Withdrawal.objects.filter(user=self.request.user, status='Approved').aggregate(
                total_withdrawn=Sum('amount', default=Decimal('0.00'))
            ).get('total_withdrawn', Decimal('0.00'))

            available_vendor_earnings = overall_vendor_earnings - total_withdrawals

            # Count the number of courses owned by the user
            my_products = Course.objects.filter(instructor=self.request.user).count()

            # Get affiliate sales data
            affiliate_sales = Sale.objects.filter(affiliate_seller=self.request.user).aggregate(
                total_sales=Sum('amount', default=Decimal('0.00')),
                total_commission=Sum('commission', default=Decimal('0.00'))
            )

            # Serialize the data
            serializer = self.get_serializer(affiliate)
            data = serializer.data
            data.update({
                'overall_vendor_earnings': overall_vendor_earnings,
                'available_vendor_earnings': available_vendor_earnings,
                'total_withdrawals': total_withdrawals,
                'my_products': my_products,
                'affiliate_sales': affiliate_sales.get('total_sales', Decimal('0.00')),
                'affiliate_commission': affiliate_sales.get('total_commission', Decimal('0.00')),
                'first_name': request.user.first_name,  # Add first name
                'email': request.user.email,  # Add email
            })
            return Response(data, status=status.HTTP_200_OK)

        except Exception as e:
            # Log the error for debugging
            logger.error(f"Error in AffiliateDashboardView: {str(e)}", exc_info=True)
            return Response(
                {"error": "An error occurred while fetching the dashboard data.", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


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
        queryset = Sale.objects.filter(affiliate_seller=affiliate.user)

        # Add search functionality by referred_user_email
        search_email = self.request.query_params.get('search', None)
        if search_email:
            queryset = queryset.filter(
                Q(referral__referred_user_email__icontains=search_email)
            )

        return queryset

class AffiliateLeaderboardView(APIView):
    """API to get the affiliate leaderboard."""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Get the current month and year
        now = timezone.now()
        current_month = now.month
        current_year = now.year

        # Get the leaderboard type from the query parameters (default to 'all_time')
        leaderboard_type = request.query_params.get('type', 'all_time')

        # Filter sales based on the leaderboard type
        if leaderboard_type == 'monthly':
            # Filter sales for the current month
            sales = Sale.objects.filter(
                date__month=current_month,
                date__year=current_year
            )
        else:
            # Include all sales for all-time rankings
            sales = Sale.objects.all()

        # Count the number of sales by affiliate
        affiliate_rankings = sales.values('affiliate_seller').annotate(
            sales_count=Count('id')  # Count the number of sales
        ).order_by('-sales_count')  # Order by sales count in descending order

        # Get affiliate details for each ranking
        rankings = []
        for rank, data in enumerate(affiliate_rankings, start=1):
            try:
                affiliate = Affiliate.objects.get(user=data['affiliate_seller'])
                rankings.append({
                    'rank': rank,
                    'affiliate': affiliate.user.email,  # Use affiliate's email or name
                    'sales_count': data['sales_count'] or 0,  # Ensure sales_count is not None
                })
            except Affiliate.DoesNotExist:
                continue  # Skip if the affiliate does not exist

        return Response(rankings, status=status.HTTP_200_OK)