from django.urls import path
from . import views


urlpatterns = [
    path('n/', views.GetCreateNewsArticleAPIView.as_view(), name='create_news'),
    path('n/breaking-news/', views.BreakingNewsListAPIView.as_view(), name='list_breaking_news'),
    path('a/', views.GetCreateNewsArticleAPIView.as_view(), name='create_article'),
    path('na/<str:idx>/', views.GetUpdateDeleteAPIView.as_view(), name='get_update_delete_view'),
    path('na/<str:idx>/like/', views.LikeUnlikeAPIView.as_view(), name='like_unlike_view'),
    path('na/<str:idx>/view/', views.IncreaseViewsAPIView.as_view(), name='increase_view'),
]
