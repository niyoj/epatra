from rest_framework.views import APIView
from core.mixins import ResponseMixin
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListAPIView, ListCreateAPIView
from rest_framework.decorators import api_view
from django.urls import reverse
from django.shortcuts import get_object_or_404
from django.utils.decorators import method_decorator
from django.db.models import F

from .serializers import CreatePostArticleSerializer, LikeNewsArticleSerializer, TagSerializer, CategorySerializer
from .models import News, Tag, Category


class GetCreateNewsArticleAPIView(APIView, ResponseMixin):
    serializer_class = CreatePostArticleSerializer
    model = News

    def get_permissions(self):
        permissions = super().get_permissions()
        method = self.request.method.lower()
        if not (method == 'get'):
            permissions.append(IsAuthenticated())

        return permissions

    def get_queryset(self, is_article=False):
        return News.objects.filter(is_article=is_article, is_archived=False, is_approved=True, is_draft=False)

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        news = serializer.save()
        news.created_by = request.user
        return self.send_response(message='Creating a post', data=serializer.data)

    def get(self, request, *args, **kwargs):
        # TODO add pagination in list fetch
        is_article = False
        if request.path == reverse('create_article'):
            is_article = True
        qs = self.get_queryset(is_article=is_article)
        res_data = self.serializer_class(qs, many=True).data
        to_fetch = 'Articles' if is_article == True else 'News'
        return self.send_response(message=f'{to_fetch} fetched successfully.', data=res_data)


class GetUpdateDeleteAPIView(RetrieveUpdateDestroyAPIView, ResponseMixin):
    queryset = News.objects.filter(
        is_archived=False, is_approved=True, is_draft=False)
    lookup_url_kwarg = 'idx'
    lookup_field = 'slug'
    http_method_names = ['get', 'put', 'patch', 'delete']
    serializer_class = CreatePostArticleSerializer

    def get_permissions(self):
        permissions = super().get_permissions()
        method = self.request.method.lower()
        if (method == 'patch' or method == 'delete' or method == 'put'):
            permissions.append(IsAuthenticated())

        return permissions

    def check_if_owner_superuser_or_staff(self, request, post=None):
        if request.method.lower() == 'get':
            return True
        if post == None:
            return False
        if request.user.is_superuser or request.user.is_staff or post.created_by == request.user:
            return True

        return False

    def get_object(self):
        obj = super().get_object()
        is_permitted = self.check_if_owner_superuser_or_staff(
            self.request, obj)
        if not is_permitted:
            self.permission_denied(
                request=self.request, message='You are not authorized for the action.', code='unauthorized')
        return obj

    # @method_decorator(permission_classes([IsAuthenticated]))
    def get(self, request, *args, **kwargs):
        return self.send_response(data=super().get(request, *args, **kwargs).data, message='Fetched successfully')

    def put(self, request, *args, **kwargs):
        return self.patch(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.send_response(super().patch(request, *args, **kwargs).data, message='Updated successfully.')

    def delete(self, request, *args, **kwargs):
        return self.send_response(data=super().delete(request, *args, **kwargs).data, message="Deleted successfully", status=status.HTTP_204_NO_CONTENT)


class LikeUnlikeAPIView(APIView, ResponseMixin):
    serializer_class = LikeNewsArticleSerializer
    permission_classes = [IsAuthenticated, ]

    def post(self, request, idx, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        like_status = serializer.validated_data.get('like')
        post = get_object_or_404(News, pk=idx)

        if (like_status == True) and (post in request.user.liked_articles.all()):
            return self.send_response(message='Post already liked', status=status.HTTP_400_BAD_REQUEST)

        if (like_status == False) and (post not in request.user.liked_articles.all()):
            return self.send_response(message='Post not liked yet.', status=status.HTTP_400_BAD_REQUEST)
        message = ""
        if like_status == False:
            request.user.liked_articles.remove(post)
            message = 'Article unliked successfully.'
        else:
            request.user.liked_articles.add(post)
            message = 'Article liked successfully.'

        return self.send_response(message=message)


class IncreaseViewsAPIView(APIView, ResponseMixin):
    def post(self, request, idx, *args, **kwargs):
        if not idx:
            return self.send_response(message='IDX not provided in url')

        article = get_object_or_404(News, pk=idx)

        article.view_count = F('view_count') + 1
        article.save()
        if request.user.is_authenticated:
            request.user.ep = F('ep') + 1
            request.user.save()
        return self.send_response(message='View increased')


class BreakingNewsListAPIView(ListAPIView, ResponseMixin):
    queryset = News.objects.filter(
        is_approved=True, is_archived=False, is_article=False, is_draft=False, is_breaking_news=True)
    serializer_class = CreatePostArticleSerializer

    def get(self, request, *args, **kwargs):
        return self.send_response(data=super().get(request, *args, **kwargs).data, message='Breaking news fetched successfully.')


class TagListCreateAPIView(ListCreateAPIView, ResponseMixin):
    serializer_class = TagSerializer
    queryset = Tag.objects.all()

    def get_permissions(self):
        permissions = super().get_permissions()
        method = self.request.method.lower()
        if not (method == 'get'):
            permissions.append(IsAuthenticated())

        return permissions

    def get(self, request, *args, **kwargs):
        return self.send_response(data=super().get(request, *args, **kwargs).data, message='Tags fetch successful.')

    def post(self, request, *args, **kwargs):
        return self.send_response(super().post(request, *args, **kwargs).data, message='Tag creation successful.', status=status.HTTP_201_CREATED)


class CategoryListCreateAPIView(ListCreateAPIView, ResponseMixin):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()

    def get_permissions(self):
        permissions = super().get_permissions()
        method = self.request.method.lower()
        if not (method == 'get'):
            permissions.append(IsAuthenticated())

        return permissions

    def get(self, request, *args, **kwargs):
        return self.send_response(data=super().get(request, *args, **kwargs).data, message='Tags fetch successful.')

    def post(self, request, *args, **kwargs):
        return self.send_response(super().post(request, *args, **kwargs).data, message='Tag creation successful.', status=status.HTTP_201_CREATED)
