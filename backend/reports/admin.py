from django.contrib import admin
from django.urls import reverse
from django.utils.html import format_html
from .models import Report


@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    list_display = ('title', 'reported_by', 'content_type', 'created_on', 'approve', 'decline')

    def approve(self, obj):
        link = reverse('report_approve_decline_view', kwargs={
            'idx': obj.id,
            'status': 'approved'
        })
        html = '<input type="button" class="btn btn-info" onclick="location.href=\'{link}\'" value="Approve" {disabled} />'.format(
            link=link, disabled='disabled' if obj.status is not None else "")
        return format_html(html)

    def decline(self, obj):
        link = reverse('report_approve_decline_view', kwargs={
            'idx': obj.id,
            'status': 'declined'
        })
        html = '<input type="button" class="btn btn-warning" onclick="location.href=\'{link}\'" value="Decline" {disabled} />'.format(
            link=link, disabled='disabled' if obj.status is not None else "")
        return format_html(html)