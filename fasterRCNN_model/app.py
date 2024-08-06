from fastapi import FastAPI
from pydantic import BaseModel, validator
from typing import List
import boto3
import torch
import torchvision
from torchvision.models.detection.faster_rcnn import FastRCNNPredictor
from torchvision.models.detection import FasterRCNN_ResNet50_FPN_V2_Weights
from torchvision.utils import draw_bounding_boxes
from torchvision.transforms import PILToTensor, Compose, ConvertImageDtype
import os
import ast
from PIL import Image
import numpy as np

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

def get_model(num_classes):
    model = torchvision.models.detection.fasterrcnn_resnet50_fpn_v2(weights=FasterRCNN_ResNet50_FPN_V2_Weights.DEFAULT)

    # Freeze the backbone layers
    for param in model.backbone.parameters():
        param.requires_grad = False

    # Get in features and feed them into a custom predictor
    in_features = model.roi_heads.box_predictor.cls_score.in_features
    model.roi_heads.box_predictor = FastRCNNPredictor(in_features, num_classes)

    return model

def download_weights_from_s3(model_name):
    s3 = boto3.client("s3")
    weights_dir = 'weights'

    # Ensure the directory exists
    if not os.path.exists(weights_dir):
        os.makedirs(weights_dir)

    # Download file
    try:
        local_path = os.path.join(os.getcwd(), f"{weights_dir}/{model_name}")
        s3.download_file("shelteraid", f"{weights_dir}/{model_name}", local_path)
    except FileNotFoundError as e:
        print(f"File not found error: {e}")
    except Exception as e:
        print(f"An error occurred: {e}")

def load_weights_from_s3(model_name):
    download_weights_from_s3(model_name)
    model_weights = f"weights/{model_name}"
    return torch.load(os.path.join(os.getcwd(), model_weights), map_location=DEVICE)


def load_model(model_name):
    checkpoint = load_weights_from_s3(model_name)
    model = get_model(2)
    model.load_state_dict(checkpoint['model_state_dict'])
    model.to(DEVICE)
    return model

def invoke(image, model, threshold=0.5):
    model.eval()
    image = image.to(DEVICE)
    with torch.no_grad():
        prediction = model([image])[0]

    keep = prediction['scores'] > threshold
    boxes = prediction['boxes'][keep]
    scores = prediction['scores'][keep]
    labels = prediction['labels'][keep]

    image_for_drawing = (image * 255).byte()

    # draw the bounding box predictions around the image
    pred_image = draw_bounding_boxes(
        image_for_drawing.squeeze(0),
        boxes,
        labels=[f"{l.item()}: {s:.2f}" for l, s in zip(labels, scores)],
        colors="yellow",
        width=4
    )

    # detach the image from the GPU and convert it to a numpy array
    # so that it can be displayed
    output = pred_image.permute(1, 2, 0).detach().cpu().numpy()
    output = output.tolist()
    return {"output": [output]}

def preprocess(np_image):
    """
    The same preprocessing that was done in the Dataset.get()
    """
    image = Image.fromarray(np.uint8(np_image)).convert('RGB')
    transforms_to_apply = [
        PILToTensor(),
        ConvertImageDtype(torch.float32),
    ]
    return Compose(transforms_to_apply)(image)

def load_payload(payload: Payload):
    """
    loads payload recieved by FastAPI
    """
    payload = payload.json()
    payload = ast.literal_eval(payload)
    image = payload['input']
    image = np.array(image)
    return image


app = FastAPI()
model = load_model(model_name="resnet50_fasterRCNN.pt")

@app.get("/health")
def health_check():
    return "I'm alive!"

@app.post("/predict")
def predict(payload: Payload):
    image_payload = load_payload(payload)
    preprocessed_image = preprocess(image_payload)
    output_image = invoke(image=preprocessed_image, model=model)
    return output_image


