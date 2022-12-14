from django.contrib.auth import get_user_model
from django.db.models import F
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.exceptions import PermissionDenied
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from .models import MyUser

from core.mixins import ResponseMixin

from django.core.files import File
from urllib.request import urlretrieve

from datetime import datetime

from google.oauth2 import id_token
from google.auth.transport import requests
import os

from decouple import config

from .serializers import (
    UserSignUpSerializer,
    PasswordResetSerializer,
    PasswordResetChangeSerializer,
    ChangePasswordSerializer, UserDetailSerializer
)
import jwt
from django.conf import settings


User = get_user_model()
# Create your views here.


@api_view(["GET"])
def test(request):
    return Response({"message": "Running"})


class LoginWithGoogle(APIView):
    def post(self, request, *args, **kwargs):
        try:
            token = request.data.get("token", None)
            # Specify the CLIENT_ID of the app that accesses the backend:
            CLIENT_ID = config("GOOGLE_CLIENT_ID")
            decoded = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)

            usr = None
            try:
                usr = User.objects.get(email=decoded["email"])
                if not usr.is_google_linked:
                    usr.is_google_linked = True
                    usr.save()
            except User.DoesNotExist:
                usr = User()
                usr.email = decoded["email"]
                usr.first_name = decoded["given_name"]
                usr.last_name = decoded["family_name"]
                usr.username = (
                    decoded["given_name"] + "_" + str(datetime.now().microsecond)
                )
                image_url = decoded.get("picture", None)
                if image_url:
                    print(image_url)
                    result = urlretrieve(image_url)
                    usr.display_picture.save(
                        os.path.basename(image_url), File(open(result[0], "rb"))
                    )
                usr.is_active = True
                usr.is_verified = True
                usr.set_unusable_password()
                usr.save()
            tokens = User.get_token(usr)
            print(tokens)
            return Response(tokens, status=status.HTTP_200_OK)
        except ValueError as e:
            print(e)
            return Response(
                {"detail": "Login failed", "error": str(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )


class UserSignUpView(APIView):
    serializer_class = UserSignUpSerializer
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"detail": "Sign up view", "data": serializer.data},
            status=status.HTTP_201_CREATED,
        )


@api_view(["POST"])
def verify_account(request, *args, **kwargs):
    token = request.data.get("token", None)
    decoded = jwt.decode(
        token,
        key=settings.SECRET_KEY,
        algorithms=[
            "HS256",
        ],
    )
    user = User.objects.get(id=decoded["id"])

    if user.is_verified:
        return Response({"detail": "Email already verified."})

    user.is_verified = True
    user.save()

    return Response({"detail": "Email verified successfully."})


class LogoutView(APIView, ResponseMixin):
    def post(self, request, *args, **kwargs):
        token = request.data.get("token", None)
        if not token:
            return self.send_message_response(
                message="No token provided", status=status.HTTP_400_BAD_REQUEST
            )
        try:
            token = RefreshToken(str(token))
            token.blacklist()
        except Exception as e:
            return self.send_message_response(message=str(e))
        return self.send_message_response(message="Logged out successfully.")


class ResetPasswordView(APIView, ResponseMixin):
    serializer_class = PasswordResetSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return self.send_message_response(message="Password reset")


class PasswordResetChangeView(APIView, ResponseMixin):
    serializer_class = PasswordResetChangeSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        serializer.save()

        return self.send_message_response(message="Password reset success")


class ChangePasswordView(APIView, ResponseMixin):
    serializer_class = ChangePasswordSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return self.send_message_response(message='Password changed successfully.')


class UserRetrieveUpdateApiView(RetrieveUpdateAPIView, ResponseMixin):
    serializer_class = UserDetailSerializer
    queryset = User.objects.filter(is_active=True)
    lookup_field = 'username'
    lookup_url_kwarg = 'username'
    permission_classes = [IsAuthenticated, ] 

    def get(self, request, *args, **kwargs):
        return self.send_response(data=super().get(request, *args, **kwargs).data, message='User details fetched successfully.')
    
    def post(self, request, *args, **kwargs):
        return self.patch(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        print(kwargs.get('username', None), request.user.username)
        if kwargs.get('username', None) != request.user.username:
            raise PermissionDenied("You can only edit your profile.")
        return self.send_response(super().patch(request, *args, **kwargs).data, message='User details update successful.')


@api_view(['POST'])
def consume_ep(request, username):
    ep_to_consume = int(request.data.get('ep', 0))
    user = get_object_or_404(User, username=username)
    if user.ep < ep_to_consume:
        return Response({'message': 'Not enough EP.'}, status=400)
    
    user.ep = F('ep') - ep_to_consume
    user.save()
    return Response({'message': 'EP consumed.'}, status=200)



class GetUserDetail(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly, ]
    def get(request, *args, **kwargs):
        User =  MyUser.get(request.user.id)
        serializer = UserDetailSerializer(User, context={"request":"request"})
        return Response(serializer.data)

@api_view(['POST'])
def increase_ep(request, username):
    ep_to_increase = int(request.data.get('ep', 0))
    user = get_object_or_404(User, username=username)
    user.ep = F('ep') + ep_to_increase
    user.save()
    return Response({'message': 'EP increased.'}, status=200)