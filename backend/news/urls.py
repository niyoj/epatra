from django.urls import path
from . import views


urlpatterns = [
    path('n/', views.GetCreateNewsArticleAPIView.as_view(), name='create-news'),
    path('a/', views.GetCreateNewsArticleAPIView.as_view(), name='create_article')
]
