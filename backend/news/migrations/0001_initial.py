# Generated by Django 3.2 on 2022-12-10 05:47

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False, unique=True)),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('modified_on', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=50)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False, unique=True)),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('modified_on', models.DateTimeField(auto_now=True)),
                ('name', models.SlugField(max_length=25)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='News',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False, unique=True)),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('modified_on', models.DateTimeField(auto_now=True)),
                ('title', models.CharField(max_length=255, verbose_name='News Title')),
                ('slug', models.SlugField(unique=True, verbose_name='Slug')),
                ('description', models.TextField()),
                ('is_breaking_news', models.BooleanField(default=False)),
                ('summary', models.TextField()),
                ('is_archived', models.BooleanField(default=False)),
                ('archived_on', models.DateTimeField(blank=True, null=True)),
                ('react_count', models.PositiveBigIntegerField(default=0)),
                ('view_count', models.PositiveBigIntegerField(default=0)),
                ('is_draft', models.BooleanField(default=False)),
                ('is_article', models.BooleanField(default=False)),
                ('archived_by', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='deleted_articles', related_query_name='deleted_article', to=settings.AUTH_USER_MODEL)),
                ('category', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='articles', related_query_name='article', to='news.category')),
                ('created_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='articles', to=settings.AUTH_USER_MODEL)),
                ('tags', models.ManyToManyField(related_name='articles', related_query_name='article', to='news.Tag')),
            ],
            options={
                'verbose_name': 'news',
                'verbose_name_plural': 'news',
            },
        ),
    ]
