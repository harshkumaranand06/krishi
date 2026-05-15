"""
Krishi ML Service — FastAPI Inference Server
Runs on http://localhost:8000
POST /predict → accepts an image file, returns disease prediction
"""

import os
import io
import json
import numpy as np
import tensorflow as tf
from PIL import Image
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

# ─────────────────────────────────────────────────────────────
# Paths
# ─────────────────────────────────────────────────────────────
BASE_DIR       = os.path.dirname(__file__)
MODEL_PATH     = os.path.join(BASE_DIR, "model", "plant_model.h5")
CLASS_MAP_PATH = os.path.join(BASE_DIR, "class_labels.json")
CLASS_ORD_PATH = os.path.join(BASE_DIR, "model", "class_order.json")

IMG_SIZE = 224  # Must match training

# ─────────────────────────────────────────────────────────────
# Globals (loaded once on startup)
# ─────────────────────────────────────────────────────────────
model         = None
class_names   = []   # Ordered list of 38 class strings
disease_map   = {}   # PlantVillage class → Krishi disease_key


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Load model and class labels on server startup."""
    global model, class_names, disease_map

    print("🚀 Loading Krishi ML model...")

    # Load class_labels.json (disease key mapping)
    with open(CLASS_MAP_PATH, "r") as f:
        label_data  = json.load(f)
        disease_map = label_data["disease_key_map"]

    # Load class order (from training output class_order.json)
    if os.path.exists(CLASS_ORD_PATH):
        with open(CLASS_ORD_PATH, "r") as f:
            class_names = json.load(f)
        print(f"✅ Loaded class order from class_order.json ({len(class_names)} classes)")
    else:
        # Fallback: use order from class_labels.json
        class_names = label_data["classes"]
        print(f"⚠️  class_order.json not found. Using default order ({len(class_names)} classes)")

    # Load the Keras model
    if os.path.exists(MODEL_PATH):
        model = tf.keras.models.load_model(MODEL_PATH)
        print(f"✅ Model loaded: {MODEL_PATH}")
        print(f"   Input shape:  {model.input_shape}")
        print(f"   Output shape: {model.output_shape}")
    else:
        print(f"❌ Model not found at: {MODEL_PATH}")
        print("   Please place your trained plant_model.h5 in ml-service/model/")
        print("   Running in DEMO mode — predictions will not be available.")

    yield  # Server is running
    print("👋 Shutting down ML service...")


# ─────────────────────────────────────────────────────────────
# FastAPI App
# ─────────────────────────────────────────────────────────────
app = FastAPI(
    title="Krishi ML Service",
    description="Plant disease detection powered by MobileNetV2 trained on PlantVillage",
    version="1.0.0",
    lifespan=lifespan
)

# Allow requests from the React frontend (localhost:5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# ─────────────────────────────────────────────────────────────
# Image Preprocessing
# ─────────────────────────────────────────────────────────────
def preprocess_image(image_bytes: bytes) -> np.ndarray:
    """
    Convert raw image bytes → normalized numpy array
    ready for MobileNetV2 inference.
    """
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    image = image.resize((IMG_SIZE, IMG_SIZE))
    img_array = np.array(image, dtype=np.float32)
    img_array = img_array / 255.0            # Normalize to [0, 1]
    img_array = np.expand_dims(img_array, 0) # Add batch dimension → (1, 224, 224, 3)
    return img_array


# ─────────────────────────────────────────────────────────────
# Routes
# ─────────────────────────────────────────────────────────────
@app.get("/")
def root():
    return {
        "service": "Krishi ML Service",
        "status": "running",
        "model_loaded": model is not None,
        "classes": len(class_names),
        "endpoints": {
            "predict": "POST /predict",
            "health":  "GET /health",
            "classes": "GET /classes"
        }
    }


@app.get("/health")
def health():
    return {
        "status": "ok" if model is not None else "model_not_loaded",
        "model_loaded": model is not None,
        "num_classes": len(class_names)
    }


@app.get("/classes")
def get_classes():
    """Return all 38 class names in order."""
    return {
        "total": len(class_names),
        "classes": class_names
    }


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    """
    Accept an uploaded plant leaf image and return the disease prediction.

    Returns:
        class_name:  Full PlantVillage class name  (e.g. "Tomato___Early_blight")
        disease_key: Krishi disease key            (e.g. "tomato_early_blight")
        confidence:  Prediction confidence 0→1    (e.g. 0.97)
        top3:        Top 3 predictions             (for transparency)
    """
    # ── Validate model loaded ──────────────────────────────────
    if model is None:
        print("⚠️ DEMO MODE: Returning mock prediction because model is not loaded.")
        return {
            "class_name":  "Tomato___Early_blight",
            "disease_key": "tomato_early_blight",
            "confidence":  0.95,
            "is_healthy":  False,
            "top3": [
                {"class": "Tomato___Early_blight", "disease_key": "tomato_early_blight", "confidence": 0.95},
                {"class": "Tomato___Late_blight", "disease_key": "tomato_late_blight", "confidence": 0.03},
                {"class": "Tomato___healthy", "disease_key": "healthy", "confidence": 0.01}
            ]
        }

    # ── Validate file type ────────────────────────────────────
    if not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail=f"Expected an image file, got: {file.content_type}"
        )

    # ── Read & preprocess image ───────────────────────────────
    try:
        image_bytes = await file.read()
        img_tensor  = preprocess_image(image_bytes)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Could not process image: {str(e)}")

    # ── Run inference ─────────────────────────────────────────
    try:
        predictions  = model.predict(img_tensor, verbose=0)[0]  # Shape: (38,)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Inference error: {str(e)}")

    # ── Decode results ────────────────────────────────────────
    pred_idx        = int(np.argmax(predictions))
    confidence      = float(np.max(predictions))
    class_name      = class_names[pred_idx] if pred_idx < len(class_names) else "Unknown"
    disease_key     = disease_map.get(class_name, "tomato_early_blight")  # fallback key

    # Build top-3 results
    top3_indices = np.argsort(predictions)[::-1][:3]
    top3 = [
        {
            "class":       class_names[i] if i < len(class_names) else "Unknown",
            "disease_key": disease_map.get(class_names[i] if i < len(class_names) else "", "tomato_early_blight"),
            "confidence":  float(predictions[i])
        }
        for i in top3_indices
    ]

    print(f"🔍 Prediction: {class_name} ({confidence * 100:.1f}%)")

    return {
        "class_name":  class_name,
        "disease_key": disease_key,
        "confidence":  confidence,
        "is_healthy":  disease_key == "healthy",
        "top3":        top3
    }
