FROM python:3.8

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR /server

COPY ./requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt