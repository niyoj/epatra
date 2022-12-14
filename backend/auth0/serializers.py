from rest_framework import serializers
from rest_framework.exceptions import ValidationError, APIException, AuthenticationFailed
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.conf import settings
from django.shortcuts import get_object_or_404

from .helper import jwt_encode_for_user, send_email, jwt_decode

import jwt

User = get_user_model()


class UserSignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "first_name",
            "last_name",
            "username",
            "email",
            "password",
            "display_picture",
        ]
        extra_kwargs = {
            "password": {"write_only": True, 'min_length': 8},
            "display_picture": {"required": False},
            "first_name": {"required": True},
            "last_name": {"required": True},
        }

    def jwt_encode(self, data):
        encoded = jwt.encode(
            {
                "id": str(data.id),
                "email": data.email,
            },
            key=settings.SECRET_KEY,
        )
        return str(encoded)

    def send_confirmation_email(self, user):
        mail_subject = "Activate your account."
        message = render_to_string(
            "email_template.html",
            {
                "token": self.jwt_encode(user),
            },
        )
        to_email = user.email
        send_mail(
            mail_subject, message, "from@example.com", [to_email], fail_silently=False
        )

    def create(self, validated_data):
        user = super().create(validated_data=validated_data)
        user.is_verified = False
        user.set_password(validated_data["password"])
        self.send_confirmation_email(user=user)
        user.save()
        return user


class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField(required=False)
    username = serializers.CharField(max_length=255, required=False)

    def validate(self, attrs):
        email = attrs.get("email", None)
        username = attrs.get("username", None)

        if (not email) and (not username):
            raise ValidationError("Either email or username is required")
        return super().validate(attrs)

    def save(self):
        email = self.validated_data.get("email", None)
        username = self.validated_data.get("username", None)
        kwargs = {}
        if email:
            kwargs["email"] = email
        if username:
            kwargs["username"] = username
        user = get_object_or_404(User, **kwargs)
        context = {'token' : jwt_encode_for_user(user)}
        template_name = 'password_reset_email.html'
        subject = 'Password reset email'
        to_email = user.email
        send_email(to_email=to_email, subject=subject, template_name=template_name, context=context)
        return user


class PasswordResetChangeSerializer(serializers.Serializer):
    password = serializers.CharField(min_length=8, required=True)
    confirm_password = serializers.CharField(min_length=8, required=True)
    token = serializers.CharField(max_length=255, required=True)

    def validate(self, attrs):
        password = attrs.get('password', None)
        confirm_password = attrs.get('confirm_password', None)

        if password != confirm_password:
            raise ValidationError('Passwords do not match.')

        return super().validate(attrs)

    def save(self):
        token = self.validated_data.get('token')
        password = self.validated_data.get('token')

        decoded_data = jwt_decode(str(token))
        email = decoded_data.get('email', None)
        user = get_object_or_404(User, email=email)
        user.set_password(password)
        user.save()
        return user


class ChangePasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField(min_length=8, required=True)
    new_password = serializers.CharField(min_length=8, required=True)
    confirm_password = serializers.CharField(min_length=8, required=True)


    def validate(self, attrs):
        new_password = attrs.get('new_password', None)
        confirm_password = attrs.get('confirm_password', None)
        current_password = attrs.get('current_password', None)

        if new_password != confirm_password:
            raise ValidationError('Passwords do not match.')

        return super().validate(attrs)

    def save(self):
        passwd = self.validated_data.get('new_password')
        request = self.context.get('request', None)
        current_password = self.validated_data.get('current_password', None)
        if not request:
            raise APIException('No request object found in serializer. Must be passed via context.')
        
        if not request.user.is_authenticated:
            raise AuthenticationFailed('User not authenticated.')

        user = request.user

        print(passwd, current_password)
        if not user.check_password(current_password):
            raise ValidationError({'detail': 'Invalid old password.'})
        user.set_password(passwd)
        user.save()
        return user


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        read_only_fields=("is_active", 'is_verified', 'is_google_linked', 'email', 'ep', 'id', 'is_staff', 'is_superuser', 'date_joined', 'last_login',)
        exclude=('password', 'groups', 'user_permissions')
