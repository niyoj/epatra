import uuid
from django.db import models


class BaseModel(models.Model):
    """
    Abstract model that everyone should inherit in order to get id as primary_key and created_on and modified_on fields by default.
    """
    id = models.UUIDField(primary_key=True, unique=True, default=uuid.uuid4)
    created_on = models.DateTimeField(auto_now_add=True)
    modified_on = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
        ordering = ('-created_on',)
