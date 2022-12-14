from django.urls import path, include
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


auth_urlpatterns = [
    path("test/", views.test, name="api_test"),
    path("login/", TokenObtainPairView.as_view(), name="login"),
    path("login/refresh-token/", TokenRefreshView.as_view(), name="token_refresh"),
    path("login/google/", views.LoginWithGoogle.as_view(), name="google_login"),
    path("register/", views.UserSignUpView.as_view(), name="signup"),
    path("verify-account/", views.verify_account, name="verify-account"),
    path("logout/", views.LogoutView.as_view(), name="logout"),
    path('reset-password/', views.ResetPasswordView.as_view(), name='reset-password'),
    path('reset-password-change/', views.PasswordResetChangeView.as_view(),
         name='reset-password-change'),
    path('change-password/', views.ChangePasswordView.as_view(),
         name='change-password')
]

user_urlpatterns = [
    path('u/<str:username>/', views.UserRetrieveUpdateApiView.as_view(), name='get_update_user'),
    path('u/<str:username>/increase-ep/', views.increase_ep, name='increase_ep'),
    path('u/<str:username>/consume-ep/', views.consume_ep, name='consume_ep')
]

urlpatterns = [
    path('auth/', include(auth_urlpatterns)),
    path('user/', include(user_urlpatterns))
]
