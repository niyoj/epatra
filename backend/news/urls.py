from django.urls import path, include
from . import views


news_articles_urlpatterns = [
    path('n/', views.GetCreateNewsArticleAPIView.as_view(), name='create_news'),
    path('n/breaking-news/', views.BreakingNewsListAPIView.as_view(), name='list_breaking_news'),
    path('a/', views.GetCreateNewsArticleAPIView.as_view(), name='create_article'),
    path('na/<str:idx>/', views.GetUpdateDeleteAPIView.as_view(), name='get_update_delete_view'),
    path('na/<str:idx>/like/', views.LikeUnlikeAPIView.as_view(), name='like_unlike_view'),
    path('na/<str:idx>/view/', views.IncreaseViewsAPIView.as_view(), name='increase_view'),
]

tag_urlpatterns = [
    path('t/', views.TagListCreateAPIView.as_view(), name='list_create_tags')
]

category_urlpatterns = [
    path('c/', views.CategoryListCreateAPIView.as_view(), name='list_create_categories')
]

urlpatterns = [
    path('news/', include(news_articles_urlpatterns)),
    path('tags/', include(tag_urlpatterns)),
    path('category/', include(category_urlpatterns)),
]
