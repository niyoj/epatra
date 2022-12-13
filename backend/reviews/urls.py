from django.urls import path
from . import views

urlpatterns = [
    path('r/', views.ListCreateReviewAPIView.as_view(), name='list_create_review'),
    path('r/<str:idx>/', views.GetUpdateDeleteAPIView.as_view(), name='get_update_delete_review'),
    path('r/<str:idx>/like/', views.LikeUnlikeReviewAPIView.as_view(), name='like_unlike_review'),
]