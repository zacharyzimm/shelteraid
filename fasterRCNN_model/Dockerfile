FROM nvidia/cuda:12.2.2-base-ubuntu22.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y \
        git \
        python3-pip \
        python3-dev \
        python3-opencv \
        libglib2.0-0


COPY ./app.py /app/app.py
COPY ./requirements.txt /app/requirements.txt
COPY ./weights /app/weights

WORKDIR /app

RUN --mount=type=cache,target=/root/.cache/pip \
    pip3 install -r requirements.txt

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
