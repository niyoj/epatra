from django.db import models
from core.models import BaseModel
from django.utils.translation import gettext_lazy as _
from django.core.exceptions import ValidationError

def validate_ratings(value):
    print(value)
    if int(value) <= 5:
        return value
    else:
        raise ValidationError("This field accepts ratings from 1-5 only")
 

class Reviews(BaseModel):
    title = models.CharField(_("Reviews Title"), max_length=255)
    description = models.TextField()
    ratings = models.PositiveSmallIntegerField(validators=[validate_ratings])
    reacts = models.PositiveBigIntegerField(default=0)
    image = models.ImageField(null=True,blank=True)
    is_deleted = models.BooleanField(default=False)
    created_by = models.ForeignKey(
        "auth0.MyUser", on_delete=models.SET_NULL, null=True, blank=True, related_name='reviews')

    def delete(self):
        """Method override to prevent default delete behaviour"""
        self.is_deleted = True
        self.save()


