from fastapi import FastAPI
from pydantic import BaseModel, validator
from typing import List
import torch
import os
import ast
import numpy as np
import boto3

from ultralytics import YOLO

DEVICE = torch.device("cuda") if torch.cuda.is_available() else torch.device("cpu")


class Payload(BaseModel):
    input: List[List[List[int]]]

    @validator('input')
    def validate_image(cls, v):
        arr = np.array(v)
        if not isinstance(arr, np.ndarray):
            raise ValueError('Image must be a NumPy array')
        if arr.ndim != 3 or arr.shape[2] not in {1, 3, 4}:
            raise ValueError('Image must be a 3D NumPy array with 1, 3, or 4 channels')
        return v

def load_weights_from_s3(s3_bucket, model_name):
    s3 = boto3.client("s3")
    model_weights = f"weights/{model_name}"
    s3.download_file(s3_bucket, model_weights, model_weights)
    return model_weights

def load_model(s3_bucket, model_name):
    model_path = load_weights_from_s3(s3_bucket, model_name)
    model = YOLO(model_path)

    return model

def invoke(image, model):
    torch.cuda.empty_cache()
    with torch.no_grad():
        results = model.predict(image)

    image_results = []

    for idx, result in enumerate(results):
        image_array = result.plot()
        # image_array = image[..., [2, 1, 0]] # prediction comes out in BGR format
        image_results.append(image_array.tolist())

    return {"output": image_results}

def load_payload(payload: Payload):
    """
    loads payload recieved by FastAPI
    """
    payload = payload.json()
    payload = ast.literal_eval(payload)
    image = payload['input']
    image = np.array(image)
    image = image.astype(np.uint8)
    return image


app = FastAPI()
model = load_model(s3_bucket="shelteraid", model_name="shelteraid_yolov8.pt")

@app.get("/health")
def health_check():
    return "I'm alive!"

@app.post("/predict")
def predict(payload: Payload):
    image = load_payload(payload)
    # image = preprocess(image)
    output = invoke(image, model)
    return output


