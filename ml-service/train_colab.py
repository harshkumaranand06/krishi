# =============================================================================
# 🌿 KRISHI - PlantVillage Model Training Script
# Run this in Google Colab with a GPU runtime (Runtime > Change runtime type > T4 GPU)
#
# STEPS:
#   1. Open https://colab.research.google.com
#   2. Create a new notebook
#   3. Copy each CELL section below into separate Colab cells
#   4. Run all cells in order
#   5. Download the saved plant_model.h5 file
#   6. Place it in: Krishi/ml-service/model/plant_model.h5
# =============================================================================

# ─────────────────────────────────────────────────────────────
# CELL 1: Install Kaggle and download PlantVillage dataset
# ─────────────────────────────────────────────────────────────
"""
!pip install -q kaggle

# Upload your kaggle.json API key when prompted
# Get it from: https://www.kaggle.com/settings → API → Create New Token
from google.colab import files
files.upload()  # Upload kaggle.json

import os
os.makedirs('/root/.kaggle', exist_ok=True)
!cp kaggle.json /root/.kaggle/
!chmod 600 /root/.kaggle/kaggle.json

# Download PlantVillage dataset from Kaggle
!kaggle datasets download -d abdallahalidev/plantvillage-dataset -p /content/ --unzip
print("✅ Dataset downloaded!")
"""

# ─────────────────────────────────────────────────────────────
# CELL 2: Setup & Imports
# ─────────────────────────────────────────────────────────────
import os
import json
import numpy as np
import tensorflow as tf
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import (
    GlobalAveragePooling2D, Dense, Dropout, BatchNormalization
)
from tensorflow.keras.models import Model
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.callbacks import (
    EarlyStopping, ModelCheckpoint, ReduceLROnPlateau
)
import matplotlib.pyplot as plt

print(f"TensorFlow version: {tf.__version__}")
print(f"GPU Available: {tf.config.list_physical_devices('GPU')}")

# ─────────────────────────────────────────────────────────────
# CELL 3: Configuration
# ─────────────────────────────────────────────────────────────

# ⚠️ UPDATE THIS PATH to where the PlantVillage dataset was extracted
# In Colab, it's usually: '/content/plantvillage dataset/color'
DATASET_PATH = '/content/plantvillage dataset/color'

IMG_SIZE    = 224       # MobileNetV2 standard input size
BATCH_SIZE  = 32        # Reduce to 16 if you run out of memory
EPOCHS      = 20        # Will stop early if no improvement
NUM_CLASSES = 38        # Fixed: PlantVillage has 38 classes
SAVE_PATH   = '/content/plant_model.h5'

# Verify dataset path
if os.path.exists(DATASET_PATH):
    class_names = sorted(os.listdir(DATASET_PATH))
    print(f"✅ Dataset found! Classes: {len(class_names)}")
    for i, c in enumerate(class_names):
        print(f"  [{i:02d}] {c}")
else:
    print(f"❌ Dataset not found at: {DATASET_PATH}")
    print("Please update DATASET_PATH above.")

# ─────────────────────────────────────────────────────────────
# CELL 4: Data Generators (with Augmentation)
# ─────────────────────────────────────────────────────────────

train_datagen = ImageDataGenerator(
    rescale=1.0 / 255.0,          # Normalize pixels to [0, 1]
    rotation_range=40,            # Randomly rotate images
    width_shift_range=0.2,        # Horizontal shift
    height_shift_range=0.2,       # Vertical shift
    shear_range=0.2,              # Shear transformation
    zoom_range=0.2,               # Random zoom
    horizontal_flip=True,         # Flip left-right
    brightness_range=[0.8, 1.2],  # Vary brightness (simulate lighting)
    fill_mode='nearest',
    validation_split=0.2          # 80% train, 20% validation
)

val_datagen = ImageDataGenerator(
    rescale=1.0 / 255.0,
    validation_split=0.2
)

train_generator = train_datagen.flow_from_directory(
    DATASET_PATH,
    target_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    subset='training',
    shuffle=True
)

val_generator = val_datagen.flow_from_directory(
    DATASET_PATH,
    target_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    subset='validation',
    shuffle=False
)

print(f"\n✅ Training samples:   {train_generator.samples}")
print(f"✅ Validation samples: {val_generator.samples}")
print(f"✅ Classes detected:   {len(train_generator.class_indices)}")

# Save the class indices for reference
class_indices = train_generator.class_indices
idx_to_class  = {v: k for k, v in class_indices.items()}
print("\nClass → Index mapping:")
for cls, idx in sorted(class_indices.items()):
    print(f"  [{idx:02d}] {cls}")

# ─────────────────────────────────────────────────────────────
# CELL 5: Build the Model (MobileNetV2 + Transfer Learning)
# ─────────────────────────────────────────────────────────────

# Load MobileNetV2 pretrained on ImageNet (without the top classifier)
base_model = MobileNetV2(
    input_shape=(IMG_SIZE, IMG_SIZE, 3),
    include_top=False,      # Remove the ImageNet classifier head
    weights='imagenet'      # Use pretrained weights
)

# Phase 1: Freeze the base model (train only the new head)
base_model.trainable = False

# Build our custom classifier head
x = base_model.output
x = GlobalAveragePooling2D()(x)         # Pool spatial features
x = BatchNormalization()(x)
x = Dense(256, activation='relu')(x)    # Fully connected layer
x = Dropout(0.5)(x)                     # Prevent overfitting
x = Dense(128, activation='relu')(x)
x = Dropout(0.3)(x)
predictions = Dense(NUM_CLASSES, activation='softmax')(x)  # 38 output classes

model = Model(inputs=base_model.input, outputs=predictions)

model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=0.001),
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

print(f"✅ Model built!")
print(f"   Total layers:     {len(model.layers)}")
print(f"   Trainable params: {model.count_params():,}")
model.summary()

# ─────────────────────────────────────────────────────────────
# CELL 6: Phase 1 Training (Train only the head — fast!)
# ─────────────────────────────────────────────────────────────

callbacks_phase1 = [
    EarlyStopping(
        monitor='val_accuracy',
        patience=4,
        restore_best_weights=True,
        verbose=1
    ),
    ReduceLROnPlateau(
        monitor='val_loss',
        factor=0.5,
        patience=2,
        min_lr=1e-7,
        verbose=1
    ),
    ModelCheckpoint(
        '/content/best_phase1.keras',
        monitor='val_accuracy',
        save_best_only=True,
        verbose=1
    )
]

print("🚀 Phase 1: Training the classifier head...")
history1 = model.fit(
    train_generator,
    epochs=10,
    validation_data=val_generator,
    callbacks=callbacks_phase1,
    verbose=1
)

print(f"\n✅ Phase 1 complete!")
print(f"   Best Val Accuracy: {max(history1.history['val_accuracy']):.4f}")

# ─────────────────────────────────────────────────────────────
# CELL 7: Phase 2 — Fine-Tuning (Unfreeze top layers of base)
# ─────────────────────────────────────────────────────────────

# Unfreeze the last 30 layers of the base model for fine-tuning
base_model.trainable = True
fine_tune_at = len(base_model.layers) - 30

for layer in base_model.layers[:fine_tune_at]:
    layer.trainable = False

# Recompile with a lower learning rate for fine-tuning
model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=1e-5),  # Very low LR!
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

callbacks_phase2 = [
    EarlyStopping(
        monitor='val_accuracy',
        patience=5,
        restore_best_weights=True,
        verbose=1
    ),
    ReduceLROnPlateau(
        monitor='val_loss',
        factor=0.3,
        patience=3,
        min_lr=1e-8,
        verbose=1
    ),
    ModelCheckpoint(
        SAVE_PATH,
        monitor='val_accuracy',
        save_best_only=True,
        verbose=1
    )
]

print("🚀 Phase 2: Fine-tuning the model...")
history2 = model.fit(
    train_generator,
    epochs=EPOCHS,
    validation_data=val_generator,
    callbacks=callbacks_phase2,
    initial_epoch=len(history1.history['accuracy']),
    verbose=1
)

print(f"\n✅ Phase 2 complete!")
print(f"   Best Val Accuracy: {max(history2.history['val_accuracy']):.4f}")

# ─────────────────────────────────────────────────────────────
# CELL 8: Evaluate & Plot Results
# ─────────────────────────────────────────────────────────────

# Evaluate on validation set
val_loss, val_acc = model.evaluate(val_generator, verbose=1)
print(f"\n📊 Final Validation Accuracy: {val_acc * 100:.2f}%")
print(f"📊 Final Validation Loss:     {val_loss:.4f}")

# Plot training history
all_acc = history1.history['accuracy']     + history2.history['accuracy']
all_val = history1.history['val_accuracy'] + history2.history['val_accuracy']

plt.figure(figsize=(12, 5))

plt.subplot(1, 2, 1)
plt.plot(all_acc,  label='Train Accuracy',      color='#22c55e')
plt.plot(all_val,  label='Validation Accuracy', color='#3b82f6')
plt.axvline(x=len(history1.history['accuracy']), color='red',
            linestyle='--', label='Fine-tune start')
plt.title('Model Accuracy', fontsize=14)
plt.xlabel('Epoch')
plt.ylabel('Accuracy')
plt.legend()
plt.grid(True, alpha=0.3)

all_loss     = history1.history['loss']     + history2.history['loss']
all_val_loss = history1.history['val_loss'] + history2.history['val_loss']

plt.subplot(1, 2, 2)
plt.plot(all_loss,     label='Train Loss',      color='#22c55e')
plt.plot(all_val_loss, label='Validation Loss', color='#3b82f6')
plt.axvline(x=len(history1.history['loss']), color='red',
            linestyle='--', label='Fine-tune start')
plt.title('Model Loss', fontsize=14)
plt.xlabel('Epoch')
plt.ylabel('Loss')
plt.legend()
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('/content/training_history.png', dpi=150)
plt.show()
print("✅ Training plot saved!")

# ─────────────────────────────────────────────────────────────
# CELL 9: Save final model & Test a prediction
# ─────────────────────────────────────────────────────────────

# Save the final best model
model.save(SAVE_PATH)
print(f"✅ Model saved to: {SAVE_PATH}")

# Save the class index list in ORDER (important for the API!)
ordered_classes = [idx_to_class[i] for i in range(len(idx_to_class))]
with open('/content/class_order.json', 'w') as f:
    json.dump(ordered_classes, f, indent=2)
print(f"✅ Class order saved to: /content/class_order.json")

# Quick sanity check prediction
print("\n🧪 Running a test prediction...")
test_images, test_labels = next(val_generator)
test_pred = model.predict(test_images[:1], verbose=0)
pred_class_idx = np.argmax(test_pred[0])
pred_confidence = float(np.max(test_pred[0]))
true_class_idx  = np.argmax(test_labels[0])

print(f"   True class:      {idx_to_class[true_class_idx]}")
print(f"   Predicted class: {idx_to_class[pred_class_idx]}")
print(f"   Confidence:      {pred_confidence * 100:.2f}%")
print(f"   Match: {'✅ YES' if pred_class_idx == true_class_idx else '❌ NO'}")

# ─────────────────────────────────────────────────────────────
# CELL 10: Download files from Colab
# ─────────────────────────────────────────────────────────────
"""
from google.colab import files

# Download the trained model
files.download('/content/plant_model.h5')

# Download the class order
files.download('/content/class_order.json')

# Download the training plot
files.download('/content/training_history.png')

print("✅ Files downloaded!")
print("📌 Next steps:")
print("   1. Place plant_model.h5   → Krishi/ml-service/model/plant_model.h5")
print("   2. Place class_order.json → Krishi/ml-service/model/class_order.json")
print("   3. Run: cd Krishi/ml-service && pip install -r requirements.txt")
print("   4. Run: uvicorn main:app --reload --port 8000")
"""
