from django.urls import path
from . import views

urlpatterns = [
    path('dashboard/', views.AffiliateDashboardView.as_view(), name='affiliate-dashboard'),
    path('generate-link/', views.GenerateAffiliateLinkView.as_view(), name='generate-affiliate-link'),
    path('track-referral/', views.TrackReferralView.as_view(), name='track-referral'),
    path('sales/', views.AffiliateSalesView.as_view(), name='affiliate-sales'),
    path('leaderboard/', views.AffiliateLeaderboardView.as_view(), name='affiliate-leaderboard'),
]