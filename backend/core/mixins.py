from rest_framework import status as rest_status
from rest_framework.response import Response


class ResponseMixin:
    def send_response(self, data={}, message=None, status=rest_status.HTTP_200_OK):
        return Response({"data": data, "detail": message}, status=status)

    def send_error_response(self, error={}, message=None, status=rest_status.HTTP_400_BAD_REQUEST):
        return Response({"error": error, "detail": message}, status=status)

    def send_message_response(self, message=None, status=200):
        return Response({"detail": message}, status=status)
