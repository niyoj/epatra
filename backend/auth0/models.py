from django.db import models
from django.contrib.auth.models import AbstractUser
from rest_framework_simplejwt.tokens import RefreshToken
from core.models import BaseModel
import uuid


def image_upload_path(instance, filename):

    return "user_{0}/dp/{1}".format(instance.id, uuid.uuid4())


class MyUser(AbstractUser):
    id = models.UUIDField(
        verbose_name="User Id", default=uuid.uuid4, primary_key=True, unique=True
    )
    email = models.EmailField(verbose_name="email", max_length=60, unique=True)
    is_verified = models.BooleanField(verbose_name="Is Verified", default=False)
    is_google_linked = models.BooleanField(verbose_name="Google Link", default=False)

    display_picture = models.ImageField(
        upload_to=image_upload_path, null=True, blank=True
    )
    ep = models.PositiveIntegerField(default=0, verbose_name="ePatra Points")


    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    class Meta:
        ordering = ('-date_joined',)

    def __str__(self) -> str:
        return self.email

    @classmethod
    def get_token(self, user):
        refresh_token = RefreshToken.for_user(user=user)

        data = {}

        data["refresh"] = str(refresh_token)
        data["access"] = str(refresh_token.access_token)

        return data
