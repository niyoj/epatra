from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.shortcuts import get_object_or_404
from .serializers import ReviewSerializer
from .models import Review
from core.mixins import ResponseMixin
from news.serializers import LikeNewsArticleSerializer


class ListCreateReviewAPIView(ListCreateAPIView, ResponseMixin):
    serializer_class = ReviewSerializer
    model = Review

    def get_permissions(self):
        permissions = super().get_permissions()
        method = self.request.method.lower()
        if not (method == 'get'):
            permissions.append(IsAuthenticated())

        return permissions

    def get_queryset(self):
        return Review.objects.filter(is_deleted=False)

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        news = serializer.save()
        news.created_by = request.user
        return self.send_response(message='Create review successful.', data=serializer.data)

    def get(self, request, *args, **kwargs):
        return self.send_response(super().get(request, *args, **kwargs).data, message='Reviews fetch successful.')


class GetUpdateDeleteAPIView(RetrieveUpdateDestroyAPIView, ResponseMixin):
    queryset = Review.objects.filter(is_deleted=False)
    lookup_url_kwarg = 'idx'
    http_method_names = ['get', 'put', 'patch', 'delete']
    serializer_class = ReviewSerializer

    def get_permissions(self):
        permissions = super().get_permissions()
        method = self.request.method.lower()
        if (method == 'patch' or method == 'delete' or method == 'put'):
            permissions.append(IsAuthenticated())

        return permissions

    def check_if_owner_superuser_or_staff(self, request, review=None):
        if request.method.lower() == 'get':
            return True
        if review == None:
            return False
        if request.user.is_superuser or request.user.is_staff or review.created_by == request.user:
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


class LikeUnlikeReviewAPIView(APIView, ResponseMixin):
    serializer_class = LikeNewsArticleSerializer
    permission_classes = [IsAuthenticated, ]
    model = Review

    def post(self, request, idx, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        like_status = serializer.validated_data.get('like')
        post = get_object_or_404(self.model, pk=idx, is_deleted=False)

        if (like_status == True) and (post in request.user.liked_reviews.all()):
            return self.send_response(message='Review already liked', status=status.HTTP_400_BAD_REQUEST)

        if (like_status == False) and (post not in request.user.liked_reviews.all()):
            return self.send_response(message='Review not liked yet.', status=status.HTTP_400_BAD_REQUEST)
        message = ""
        if like_status == False:
            request.user.liked_reviews.remove(post)
            message = 'Review unliked successfully.'
        else:
            request.user.liked_reviews.add(post)
            message = 'Review liked successfully.'

        return self.send_response(message=message)
