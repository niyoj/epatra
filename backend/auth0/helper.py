from django.core.mail import send_mail
from datetime import datetime
from rest_framework.exceptions import APIException

from django.conf import settings
from django.template.loader import render_to_string
import jwt


def jwt_encode_for_user(data):
    encoded = jwt.encode(
        {"id": str(data.id), "email": data.email, "time": str(datetime.now())},
        key=settings.SECRET_KEY,
        algorithm="HS256",
    )
    return str(encoded)


def jwt_decode(token):
    decoded = jwt.decode(
        token,
        key=settings.SECRET_KEY,
        algorithms=[
            "HS256",
        ],
    )
    return decoded


def send_email(to_email, from_email=settings.DEFAULT_FROM_EMAIL, subject="", content=None, template_name=None, fail_silently=None, context={}):
    if not content and not template_name:
        raise APIException(detail='Either content or template_name should be provided', code=400)
    message = ""
    if content:
        message = content
    
    if template_name:
        message = render_to_string(template_name, context=context)

    return send_mail(subject, message, from_email, [to_email], fail_silently=False)
