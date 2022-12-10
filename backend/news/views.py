from rest_framework.views import APIView
from core.mixins import ResponseMixin
from rest_framework.permissions import IsAuthenticated
from django.urls import reverse

from .serializers import CreatePostArticleSerializer
from .models import News

class GetCreateNewsArticleAPIView(APIView, ResponseMixin):
    serializer_class = CreatePostArticleSerializer
    permission_classes = [IsAuthenticated]
    model = News

    def get_queryset(self, is_article=False):
        return News.objects.filter(is_article=is_article) 

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
