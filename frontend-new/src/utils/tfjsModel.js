import * as tf from '@tensorflow/tfjs';

const MODEL_HTTP_URL = '/model/model.json';
const MODEL_INDEXEDDB_URL = 'indexeddb://plant-model';
const CLASS_ORDER_URL = '/model/class_order.json';

// Default 38 PlantVillage classes mapping in case external JSON is not loaded
export const DEFAULT_CLASSES = [
    "Apple___Apple_scab",
    "Apple___Black_rot",
    "Apple___Cedar_apple_rust",
    "Apple___healthy",
    "Blueberry___healthy",
    "Cherry_(including_sour)___Powdery_mildew",
    "Cherry_(including_sour)___healthy",
    "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot",
    "Corn_(maize)___Common_rust_",
    "Corn_(maize)___Northern_Leaf_Blight",
    "Corn_(maize)___healthy",
    "Grape___Black_rot",
    "Grape___Esca_(Black_Measles)",
    "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)",
    "Grape___healthy",
    "Orange___Haunglongbing_(Citrus_greening)",
    "Peach___Bacterial_spot",
    "Peach___healthy",
    "Pepper,_bell___Bacterial_spot",
    "Pepper,_bell___healthy",
    "Potato___Early_blight",
    "Potato___Late_blight",
    "Potato___healthy",
    "Raspberry___healthy",
    "Soybean___healthy",
    "Squash___Powdery_mildew",
    "Strawberry___Leaf_scorch",
    "Strawberry___healthy",
    "Tomato___Bacterial_spot",
    "Tomato___Early_blight",
    "Tomato___Late_blight",
    "Tomato___Leaf_Mold",
    "Tomato___Septoria_leaf_spot",
    "Tomato___Spider_mites Two-spotted_spider_mite",
    "Tomato___Target_Spot",
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus",
    "Tomato___Tomato_mosaic_virus",
    "Tomato___healthy"
];

// Map PlantVillage class names to internal Krishi disease keys
export const DISEASE_KEY_MAP = {
    "Apple___Apple_scab": "apple_scab",
    "Apple___Black_rot": "apple_black_rot",
    "Apple___Cedar_apple_rust": "apple_cedar_rust",
    "Apple___healthy": "healthy",
    "Blueberry___healthy": "healthy",
    "Cherry_(including_sour)___Powdery_mildew": "powdery_mildew",
    "Cherry_(including_sour)___healthy": "healthy",
    "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot": "corn_gray_leaf_spot",
    "Corn_(maize)___Common_rust_": "corn_common_rust",
    "Corn_(maize)___Northern_Leaf_Blight": "corn_northern_blight",
    "Corn_(maize)___healthy": "healthy",
    "Grape___Black_rot": "grape_black_rot",
    "Grape___Esca_(Black_Measles)": "grape_esca",
    "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)": "grape_leaf_blight",
    "Grape___healthy": "healthy",
    "Orange___Haunglongbing_(Citrus_greening)": "orange_citrus_greening",
    "Peach___Bacterial_spot": "peach_bacterial_spot",
    "Peach___healthy": "healthy",
    "Pepper,_bell___Bacterial_spot": "pepper_bacterial_spot",
    "Pepper,_bell___healthy": "healthy",
    "Potato___Early_blight": "potato_early_blight",
    "Potato___Late_blight": "potato_late_blight",
    "Potato___healthy": "healthy",
    "Raspberry___healthy": "healthy",
    "Soybean___healthy": "healthy",
    "Squash___Powdery_mildew": "powdery_mildew",
    "Strawberry___Leaf_scorch": "strawberry_leaf_scorch",
    "Strawberry___healthy": "healthy",
    "Tomato___Bacterial_spot": "tomato_bacterial_spot",
    "Tomato___Early_blight": "tomato_early_blight",
    "Tomato___Late_blight": "tomato_late_blight",
    "Tomato___Leaf_Mold": "tomato_leaf_mold",
    "Tomato___Septoria_leaf_spot": "tomato_septoria",
    "Tomato___Spider_mites Two-spotted_spider_mite": "tomato_spider_mites",
    "Tomato___Target_Spot": "tomato_target_spot",
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus": "tomato_yellow_curl",
    "Tomato___Tomato_mosaic_virus": "tomato_mosaic_virus",
    "Tomato___healthy": "healthy"
};

let activeModel = null;
let classOrderList = DEFAULT_CLASSES;

/**
 * Check if the model has been downloaded and is available in IndexedDB
 */
export async function isModelCached() {
    try {
        const modelInfo = await tf.io.listModels();
        return !!modelInfo[MODEL_INDEXEDDB_URL.replace('://', '://')];
    } catch (e) {
        console.warn('⚠️ Error checking IndexedDB for model:', e);
        return false;
    }
}

/**
 * Attempt to load the model from IndexedDB, falling back to HTTP if not cached.
 * Emits download progress if fetching from HTTP.
 */
export async function loadTFJSModel(onProgress = null) {
    if (activeModel) {
        return activeModel;
    }

    // Try loading from IndexedDB first
    try {
        const isCached = await isModelCached();
        if (isCached) {
            console.log("🚀 Loading offline model from IndexedDB...");
            activeModel = await tf.loadGraphModel(MODEL_INDEXEDDB_URL);
            console.log("✅ Offline model loaded from IndexedDB successfully!");
            await loadClassOrder();
            return activeModel;
        }
    } catch (err) {
        console.warn("⚠️ Failed to load model from IndexedDB, falling back to HTTP...", err);
    }

    // Fall back to HTTP download
    console.log("🌐 Model not in IndexedDB. Downloading from server/public directory...");
    try {
        activeModel = await tf.loadGraphModel(MODEL_HTTP_URL, {
            onProgress: (fraction) => {
                if (onProgress) onProgress(Math.round(fraction * 100));
            }
        });

        console.log("✅ Model downloaded! Saving to IndexedDB for offline use...");
        await activeModel.save(MODEL_INDEXEDDB_URL);
        console.log("🚀 Model successfully cached in IndexedDB!");
        await loadClassOrder();
        return activeModel;
    } catch (err) {
        console.error("❌ Failed to download model from HTTP:", err);
        activeModel = null;
        throw err;
    }
}

/**
 * Loads the class order list from public/model/class_order.json if it exists, otherwise falls back to defaults.
 */
async function loadClassOrder() {
    try {
        const response = await fetch(CLASS_ORDER_URL);
        if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data) && data.length > 0) {
                classOrderList = data;
                console.log("✅ Loaded custom class order from class_order.json");
            }
        }
    } catch (e) {
        console.log("⚠️ Could not load custom class_order.json. Using standard 38-class ordering fallback.");
        classOrderList = DEFAULT_CLASSES;
    }
}

/**
 * Deletes the cached model from browser IndexedDB
 */
export async function deleteCachedModel() {
    try {
        await tf.io.removeModel(MODEL_INDEXEDDB_URL);
        activeModel = null;
        console.log("🧹 Cached offline model removed from IndexedDB.");
        return true;
    } catch (e) {
        console.error("❌ Error deleting cached model:", e);
        return false;
    }
}

/**
 * Processes an HTMLImageElement and runs in-browser local inference
 * 
 * @param {HTMLImageElement} imageElement - The HTML Image Element containing the leaf photo
 * @returns {Promise<Object>} The prediction results similar to FastAPI server response
 */
export async function runLocalInference(imageElement) {
    if (!activeModel) {
        throw new Error("Model is not loaded. Call loadTFJSModel() first.");
    }

    console.log("🧪 Running local in-browser inference...");
    const start = performance.now();

    // Perform standard MobileNetV2 preprocessing (224x224, rescale 1/255) in tf.tidy to avoid leaks
    const results = tf.tidy(() => {
        // Convert image element to tensor
        const imgTensor = tf.browser.fromPixels(imageElement);
        
        // Resize image to 224x224 (Standard for MobileNetV2)
        const resizedTensor = tf.image.resizeBilinear(imgTensor, [224, 224]);
        
        // Convert dtype to float and normalize to standard MobileNetV2 range [-1, 1]
        // This is standard for pre-trained Keras models.
        const normalizedTensor = resizedTensor.toFloat().div(tf.scalar(127.5)).sub(tf.scalar(1.0));
        
        // Expand dimensions to create batch size of 1 -> (1, 224, 224, 3)
        const batchedTensor = normalizedTensor.expandDims(0);
        
        // Run prediction
        const predictionTensor = activeModel.predict(batchedTensor);
        
        // Get logits/probabilities array
        const probabilities = predictionTensor.dataSync();
        
        // Get argmax index (highest probability)
        const predIdx = predictionTensor.argMax(-1).dataSync()[0];
        
        return { probabilities, predIdx };
    });

    const end = performance.now();
    console.log(`⏱️ Local inference took ${(end - start).toFixed(1)}ms`);

    const { probabilities, predIdx } = results;

    // Dynamically adjust the class order list based on the model's output layer shape!
    let activeClassList = classOrderList;
    if (activeClassList === DEFAULT_CLASSES && probabilities.length === 6) {
        activeClassList = [
            "Potato___Early_blight",
            "Potato___Late_blight",
            "Potato___healthy",
            "Tomato___Early_blight",
            "Tomato___Late_blight",
            "Tomato___healthy"
        ];
        console.log("⚡ Auto-detected 6-class Potato/Tomato model. Using correct class mapping.");
    }

    const confidence = probabilities[predIdx];
    const className = activeClassList[predIdx] || "Unknown";
    const diseaseKey = DISEASE_KEY_MAP[className] || "tomato_early_blight";

    // Gather Top 3 predictions
    const indexedProbabilities = Array.from(probabilities).map((p, idx) => ({
        index: idx,
        confidence: p
    }));
    
    // Sort descending
    indexedProbabilities.sort((a, b) => b.confidence - a.confidence);
    
    const top3 = indexedProbabilities.slice(0, 3).map(item => {
        const name = activeClassList[item.index] || "Unknown";
        return {
            class: name,
            disease_key: DISEASE_KEY_MAP[name] || "tomato_early_blight",
            confidence: item.confidence,
            index: item.index
        };
    });

    console.log("🔬 TF.js Model Raw Predictions Index:", predIdx);
    console.log("🔬 Predicted Class:", className);
    console.log("🔬 Confidence Score:", (confidence * 100).toFixed(2) + "%");
    console.log("🔬 Top 3 predictions:");
    top3.forEach((t, i) => {
        console.log(`   [${i+1}] ${t.class}: ${(t.confidence*100).toFixed(2)}%`);
    });

    return {
        class_name: className,
        disease_key: diseaseKey,
        confidence: confidence,
        is_healthy: diseaseKey === "healthy",
        top3: top3,
        local_inference: true,
        inference_time_ms: Math.round(end - start)
    };
}
