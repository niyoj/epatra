from rest_framework import serializers
from .models import News, Tag


class CreatePostArticleSerializer(serializers.ModelSerializer):
    tags = serializers.PrimaryKeyRelatedField(many=True, queryset=Tag.objects.all())
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

    def save(self, **kwargs):
        print(self.validated_data)
        if not hasattr(self.validated_data, 'is_article'):
            kwargs['is_article'] = False
        return super().save(**kwargs)
