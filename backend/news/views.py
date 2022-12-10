from rest_framework.views import APIView
from core.mixins import ResponseMixin
from .serializers import CreatePostArticleSerializer
from rest_framework.permissions import IsAuthenticated


class GetCreateNewsArticleAPIView(APIView, ResponseMixin):
    serializer_class = CreatePostArticleSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        news = serializer.save()
        news.created_by = request.user
        return self.send_response(message='Creating a post', data=serializer.data)
