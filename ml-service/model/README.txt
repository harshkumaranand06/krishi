Place your trained model files here:

1. plant_model.h5     → The trained Keras model (downloaded from Google Colab)
2. class_order.json   → The exact class ordering from training (downloaded from Google Colab)

After training in Google Colab using train_colab.py:
  - Download plant_model.h5  → put here
  - Download class_order.json → put here

Then start the ML server:
  cd ml-service
  python -m uvicorn main:app --reload --port 8000
