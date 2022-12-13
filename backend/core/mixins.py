from rest_framework import status as rest_status
from rest_framework.response import Response


class ResponseMixin:
    def send_response(self, data=None, message="Success", status=rest_status.HTTP_200_OK):
        response = {}
        if data is not None:
            response['data'] = data
        response['message'] = message
        return Response(response, status=status)

    def send_error_response(self, error={}, message=None, status=rest_status.HTTP_400_BAD_REQUEST):
        return Response({"error": error, "detail": message}, status=status)

    def send_message_response(self, message=None, status=200):
        return Response({"detail": message}, status=status)
