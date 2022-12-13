from django.db import models
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey
from core.models import BaseModel

# Create your models here.
class Report(BaseModel):
    title = models.CharField(max_length=255)
    description = models.TextField()

    content_type = models.ForeignKey(ContentType, on_delete=models.SET_NULL, null=True)
    object_id = models.UUIDField()
    content_object = GenericForeignKey()

    status = models.BooleanField(default=None, null=True, blank=True)
    reported_by = models.ForeignKey('auth0.MyUser', on_delete=models.SET_NULL, null=True, blank=True)

    class Meta:
        indexes = [
            models.Index(fields=['content_type', 'object_id']),
        ]