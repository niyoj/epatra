import uuid
from datetime import datetime

from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils.text import slugify

from core.models import BaseModel


# Create your models here.
class News(BaseModel):
    title = models.CharField(_("News Title"), max_length=255)
    slug = models.SlugField(_("Slug"), unique=True, max_length=255)
    description = models.TextField()
    is_breaking_news = models.BooleanField(default=False)
    summary = models.TextField()
    is_archived = models.BooleanField(default=False)
    archived_on = models.DateTimeField(null=True, blank=True)
    archived_by = models.ForeignKey("auth0.MyUser", on_delete=models.PROTECT, related_name='deleted_articles', related_query_name='deleted_article', null=True, blank=True)
    react_count = models.PositiveBigIntegerField(default=0)
    view_count = models.PositiveBigIntegerField(default=0)
    is_draft = models.BooleanField(default=False)
    is_article = models.BooleanField(default=False)
    is_approved = models.BooleanField(default=False)
    created_by = models.ForeignKey(
        "auth0.MyUser", on_delete=models.SET_NULL, null=True, blank=True, related_name='articles')
    category = models.ForeignKey(
        "Category", on_delete=models.SET_NULL, null=True, blank=True, related_name='articles', related_query_name='article')
    tags = models.ManyToManyField("Tag", related_name='articles', related_query_name='article')
    liked_by = models.ManyToManyField('auth0.MyUser', related_name='liked_articles', related_query_name='article')

    class Meta:
        verbose_name = _("News or Article")
        verbose_name_plural = _("News or Articles")
        ordering = ('-created_on', )

    def __str__(self):
        return self.title

    def delete(self):
        """Method override to prevent default delete behaviour"""
        self.is_archived = True
        self.archived_on = datetime.now()
        self.save()
    
    def save(self, force_insert=False, force_update=False, using=None,
             update_fields=None):
        self.is_approved = False
        if not self.is_article:
            self.is_approved = True
        super().save(force_insert, force_update, using, update_fields)

class Tag(BaseModel):
    name = models.SlugField(max_length=25, unique=True)


class Category(BaseModel):
    name = models.CharField(max_length=50)
