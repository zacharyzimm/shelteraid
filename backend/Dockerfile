FROM python:3.9-slim

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y \
        git \
        python3-pip \
        python3-dev \
        libglib2.0-0

COPY ./app.py /app/app.py
COPY ./requirements.txt /app/requirements.txt

WORKDIR /app

RUN --mount=type=cache,target=/root/.cache/pip \
    pip3 install -r requirements.txt

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1