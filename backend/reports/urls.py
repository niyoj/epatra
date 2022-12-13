from django.urls import path
from . import views

urlpatterns = [
    path('r/reviews/', views.CreateReportAPIView.as_view(), name='create_review_report'),
    path('r/news/', views.CreateReportAPIView.as_view(), name='create_news_report'),
    path('r/ad/<str:idx>/<str:status>/', views.approve_decline_view, name='report_approve_decline_view')
]
