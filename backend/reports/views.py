from django.shortcuts import get_object_or_404, redirect
from django.contrib import messages
from django.urls import reverse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.db.models import F

from core.mixins import ResponseMixin
from .serializers import ReportSerializer
from .models import Report
from news.models import News
from reviews.models import Review

# Create your views here.


class CreateReportAPIView(APIView, ResponseMixin):
    serializer_class = ReportSerializer
    permission_classes = [IsAuthenticated, ]
    
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        if 'news' in request.path.lower():
            content_object = get_object_or_404(News, pk=serializer.validated_data['object_id'])
        elif 'reviews' in request.path.lower():
            content_object = get_object_or_404(Review, pk=serializer.validated_data['object_id'])

        report = serializer.save()
        report.reported_by = request.user
        if content_object:
            report.content_object = content_object
        
        report.save()
        
        return self.send_response(data=serializer.data, message='Report creation successful.', status=status.HTTP_201_CREATED)


@api_view(['GET'])
def approve_decline_view(request, idx, status):
    obj = get_object_or_404(Report, pk=idx)
    if obj.status is not None:
        messages.info(request, 'Action already taken.')
        return redirect(reverse("admin:{}_{}_changelist".format(obj._meta.app_label, obj._meta.model_name)))
    if status.lower() == 'approved':
        obj.status = True
        if obj.reported_by:
            obj.reported_by.ep = F('ep') + 5
            obj.reported_by.save()
        obj.save()
        messages.success(request, 'Approved')
    else:
        obj.status = False
        obj.save()
        messages.error(request, 'Declined')
    return redirect(reverse("admin:{}_{}_changelist".format(obj._meta.app_label, obj._meta.model_name)))