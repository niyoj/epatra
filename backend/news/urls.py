from django.urls import path
from . import views


urlpatterns = [
    path('n/', views.GetCreateNewsArticleAPIView.as_view(), name='create_news'),
    path('a/', views.GetCreateNewsArticleAPIView.as_view(), name='create_article'),
    path('na/<str:idx>/', views.GetUpdateDeleteAPIView.as_view(), name='get_update_delete_view')
]
