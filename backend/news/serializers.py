import uuid

from rest_framework import serializers
from django.utils.text import slugify
from .models import News, Tag, Category
from django.contrib.auth import get_user_model

User = get_user_model()
class CreatePostArticleSerializer(serializers.ModelSerializer):
    tags = serializers.PrimaryKeyRelatedField(many=True, queryset=Tag.objects.all())
    liked_by = serializers.PrimaryKeyRelatedField(many=True, queryset=User.objects.all())
    slug = serializers.SlugField(required=False)

    class Meta:
        model = News
        # fields = ('title', 'slug', 'description', 'summary', 'is_breaking_news', 'react_count',
        #           'is_draft', 'is_article', 'is_approved', 'created_by', 'category', 'tags',)
        fields = '__all__'
        read_only_fields = ('archived_by', 'archived_on',
                            'is_archived', 'react_count', 'view_count', 'created_on', 'modified_on', 'id')
        extra_kwargs = {}
    
    def validate_slug(self, value):
        print("---------------", value)
    
    def create(self, validated_data):
        slug = slugify(self.validated_data.get('title', "")) + '-' + str(uuid.uuid1())
        validated_data['slug'] = slug[:254] if len(slug) >= 255 else slug
        return super().create(validated_data)

    def save(self, **kwargs):
        kwargs['is_article'] = self.validated_data.get('is_article', False)
        
        return super().save(**kwargs)


class LikeNewsArticleSerializer(serializers.Serializer):
    like = serializers.BooleanField(required=True)


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = '__all__'