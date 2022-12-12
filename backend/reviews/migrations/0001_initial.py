# Generated by Django 3.2 on 2022-12-10 08:38

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import reviews.models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Reviews',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False, unique=True)),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('modified_on', models.DateTimeField(auto_now=True)),
                ('title', models.CharField(max_length=255, verbose_name='Reviews Title')),
                ('description', models.TextField()),
                ('ratings', models.PositiveSmallIntegerField(validators=[reviews.models.validate_ratings])),
                ('reacts', models.PositiveBigIntegerField(default=0)),
                ('image', models.ImageField(blank=True, null=True, upload_to='')),
                ('is_deleted', models.BooleanField(default=False)),
                ('created_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='reviews', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
