# Generated by Django 3.2 on 2022-12-10 07:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('news', '0003_news_is_approved'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tag',
            name='name',
            field=models.SlugField(max_length=25, unique=True),
        ),
    ]
