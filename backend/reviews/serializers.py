from rest_framework import serializers
from .models import Review
from news.models import Tag
from auth0.models import MyUser


class ReviewSerializer(serializers.ModelSerializer):
    tags = serializers.PrimaryKeyRelatedField(many=True, queryset=Tag.objects.all())
    liked_by = serializers.PrimaryKeyRelatedField(many=True, queryset=MyUser.objects.all())

    class Meta:
        model = Review
        fields = '__all__'
        read_only_fields = ('reacts', 'is_deleted',)
