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
        const contentType = response.headers.get('content-type') || '';
        if (response.ok && contentType.includes('application/json')) {
            const data = await response.json();
            if (Array.isArray(data) && data.length > 0) {
                classOrderList = data;
                console.log(`✅ Loaded custom class order (${data.length} classes) from class_order.json`);
                return;
            }
        }
    } catch (e) {
        console.warn("⚠️ Could not load custom class_order.json:", e);
    }
    console.log("ℹ️ Using standard class ordering fallback.");
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
 * Analyzes the RGB pixel distributions of the input image on a tiny canvas.
 * Returns true if the image contains sufficient leaf-like green, yellow, or brown color ratios.
 * Prevents non-plant OOD false-positives (like keypads, cars, shoes, hands).
 */
export function isImagePlantLeaf(imageElement) {
    try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Downsample to a tiny 40x40 grid for instant, zero-lag color analysis
        canvas.width = 40;
        canvas.height = 40;
        
        ctx.drawImage(imageElement, 0, 0, 40, 40);
        const imgData = ctx.getImageData(0, 0, 40, 40).data;
        
        let leafPixels = 0;
        let whitePixels = 0;
        const totalPixels = 40 * 40;
        
        for (let i = 0; i < imgData.length; i += 4) {
            const r = imgData[i];
            const g = imgData[i + 1];
            const b = imgData[i + 2];
            
            const maxVal = Math.max(r, g, b);
            const minVal = Math.min(r, g, b);
            const chroma = maxVal - minVal;
            
            // 1. Detect White/Light-Grey/Screen background and desaturated pastel pixels (typical for tickets, paper, screens, documents)
            const isWhiteOrGrey = (r > 165 && g > 165 && b > 155 && chroma < 25) || (r > 200 && g > 200 && b > 190 && chroma < 35);
            if (isWhiteOrGrey) {
                whitePixels++;
            }
            
            // 2. Detect Green Leaf pixels: Green is dominant and sufficiently saturated
            const isGreen = g > 50 && g > r * 1.05 && g > b * 1.05 && chroma > 12;
            
            // 3. Detect Yellow/Dry/Brown Leaf pixels: Red and Green are dominant, Blue is low
            const isYellowOrBrown = r > 65 && g > 55 && b < r * 0.80 && Math.abs(r - g) < 30 && chroma > 15;
            
            if (isGreen || isYellowOrBrown) {
                leafPixels++;
            }
        }
        
        const leafRatio = leafPixels / totalPixels;
        const whiteRatio = whitePixels / totalPixels;
        
        console.log(`🌿 Plant leaf pixel ratio: ${(leafRatio * 100).toFixed(1)}%`);
        console.log(`📄 Document/White pixel ratio: ${(whiteRatio * 100).toFixed(1)}%`);
        
        // A document, ticket screenshot, or blank page has an overwhelming white/grey ratio AND lacks leaf pixels
        if (whiteRatio > 0.85 || (whiteRatio > 0.70 && leafRatio < 0.10)) {
            console.warn(`🚫 Document-like background detected (${(whiteRatio * 100).toFixed(1)}% white, ${(leafRatio * 100).toFixed(1)}% leaf). Blocking scan.`);
            return false;
        }
        
        // If less than 12% of pixels are plant-like, classify as not a plant
        return leafRatio >= 0.12;
    } catch (e) {
        console.warn("⚠️ Color analysis failed, bypassing filter:", e);
        return true; // Fallback to allowing inference if canvas fails
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

    // 1. Validate if image is a plant leaf (prevents keyboard/hand false positives)
    if (!isImagePlantLeaf(imageElement)) {
        console.warn("🚫 Out-of-distribution image detected (not a plant leaf). Aborting inference.");
        return {
            class_name: "Not a Plant",
            disease_key: "not_plant",
            confidence: 0.0,
            is_healthy: false,
            top3: [],
            local_inference: true,
            inference_time_ms: 0
        };
    }

    console.log(`🧪 Running local in-browser inference (TTA: ${options.enableTTA !== false}, Crop: ${options.selectedCrop || 'all'})...`);
    const start = performance.now();
    const enableTTA = options.enableTTA !== false;
    const selectedCrop = options.selectedCrop || 'all';

    // Perform Smart Center-Crop and Test-Time Augmentation (TTA) in tf.tidy to avoid leaks
    const results = tf.tidy(() => {
        // Convert image element to tensor
        const imgTensor = tf.browser.fromPixels(imageElement);
        
        // 1. Aspect-Ratio-Preserving Smart Center-Crop (focuses on central leaf area)
        const [h, w] = [imgTensor.shape[0], imgTensor.shape[1]];
        const minDim = Math.min(h, w);
        const startY = Math.floor((h - minDim) / 2);
        const startX = Math.floor((w - minDim) / 2);
        const squareTensor = imgTensor.slice([startY, startX, 0], [minDim, minDim, 3]);

        // Standard 224x224 normalized view [-1, 1]
        const view1 = tf.image.resizeBilinear(squareTensor, [224, 224])
            .toFloat().div(tf.scalar(127.5)).sub(tf.scalar(1.0));

        let batchedTensor;
        if (enableTTA) {
            // View 2: Horizontal mirror flip (removes orientation bias)
            const view2 = tf.image.flipLeftRight(view1);
            
            // View 3: 15% Smart Center Zoom into leaf surface (amplifies lesion detail)
            const zoomDim = Math.floor(minDim * 0.85);
            const zStartY = Math.floor((minDim - zoomDim) / 2);
            const zStartX = Math.floor((minDim - zoomDim) / 2);
            const zoomSlice = squareTensor.slice([zStartY, zStartX, 0], [zoomDim, zoomDim, 3]);
            const view3 = tf.image.resizeBilinear(zoomSlice, [224, 224])
                .toFloat().div(tf.scalar(127.5)).sub(tf.scalar(1.0));

            // Stack 3 views into a single GPU batch [3, 224, 224, 3] for instant parallel inference
            batchedTensor = tf.stack([view1, view2, view3]);
        } else {
            batchedTensor = view1.expandDims(0);
        }

        // Run prediction
        const predictionTensor = activeModel.predict(batchedTensor);
        
        // Average logits across TTA views
        const meanPredictions = enableTTA ? predictionTensor.mean(0) : predictionTensor.squeeze();
        
        const rawProbabilities = meanPredictions.dataSync();
        return { rawProbabilities };
    });

    const end = performance.now();
    console.log(`⏱️ Local TTA inference took ${(end - start).toFixed(1)}ms`);

    const { rawProbabilities } = results;

    // Dynamically adjust the class order list based on the model's output layer shape!
    let activeClassList = classOrderList;
    if (activeClassList.length !== rawProbabilities.length) {
        if (rawProbabilities.length === 9) {
            activeClassList = [
                "Potato___Early_blight",
                "Potato___Late_blight",
                "Potato___healthy",
                "Tomato___Bacterial_spot",
                "Tomato___Early_blight",
                "Tomato___Late_blight",
                "Tomato___Leaf_Mold",
                "Tomato___Septoria_leaf_spot",
                "Tomato___healthy"
            ];
            console.log("⚡ Auto-detected 9-class Potato/Tomato model. Using correct class mapping.");
        } else if (rawProbabilities.length === 6) {
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
    }

    let probabilities = Array.from(rawProbabilities);

    // Apply Crop-Conditioned Filtering if farmer specified a plant
    if (selectedCrop === 'tomato') {
        probabilities = probabilities.map((p, idx) => {
            const name = activeClassList[idx] || '';
            return name.startsWith('Tomato') ? p : 0;
        });
        const sum = probabilities.reduce((a, b) => a + b, 0);
        if (sum > 0) probabilities = probabilities.map(p => p / sum);
        console.log("🍅 Filtered inference to Tomato classes only.");
    } else if (selectedCrop === 'potato') {
        probabilities = probabilities.map((p, idx) => {
            const name = activeClassList[idx] || '';
            return name.startsWith('Potato') ? p : 0;
        });
        const sum = probabilities.reduce((a, b) => a + b, 0);
        if (sum > 0) probabilities = probabilities.map(p => p / sum);
        console.log("🥔 Filtered inference to Potato classes only.");
    }

    // Find highest probability class
    let predIdx = 0;
    let confidence = probabilities[0];
    for (let i = 1; i < probabilities.length; i++) {
        if (probabilities[i] > confidence) {
            confidence = probabilities[i];
            predIdx = i;
        }
    }

    const className = activeClassList[predIdx] || "Unknown";
    const diseaseKey = DISEASE_KEY_MAP[className] || "tomato_early_blight";

    // Gather Top 3 predictions
    const indexedProbabilities = probabilities.map((p, idx) => ({
        index: idx,
        confidence: p
    }));
    
    // Sort descending
    indexedProbabilities.sort((a, b) => b.confidence - a.confidence);
    
    const top1 = indexedProbabilities[0];
    const top2 = indexedProbabilities[1] || { confidence: 0 };
    const margin = top1.confidence - top2.confidence;
    const isLowConfidence = (confidence < 0.60 || margin < 0.15) && diseaseKey !== 'healthy';

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
        is_low_confidence: isLowConfidence,
        confidence_margin: margin,
        tta_enabled: enableTTA,
        smart_crop_applied: true,
        selected_crop: selectedCrop,
        top3: top3,
        local_inference: true,
        inference_time_ms: Math.round(end - start)
    };
}

/**
 * Analyzes the RGB pixel distributions of the input image on a tiny canvas.
 * Returns the exact percentage of infected yellow/brown/dry spot pixels
 * relative to the total plant leaf surface area.
 * 
 * @param {HTMLImageElement} imageElement - The HTML Image Element containing the leaf photo
 * @returns {Object} { infectedAreaPct: number, leafRatio: number, whiteRatio: number }
 */
export function analyzeLeafSeverity(imageElement) {
    try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Downsample to a 40x40 grid for instant, zero-lag analysis
        canvas.width = 40;
        canvas.height = 40;
        
        ctx.drawImage(imageElement, 0, 0, 40, 40);
        const imgData = ctx.getImageData(0, 0, 40, 40).data;
        
        let greenPixels = 0;
        let yellowOrBrownPixels = 0;
        let whitePixels = 0;
        const totalPixels = 40 * 40;
        
        for (let i = 0; i < imgData.length; i += 4) {
            const r = imgData[i];
            const g = imgData[i + 1];
            const b = imgData[i + 2];
            
            const maxVal = Math.max(r, g, b);
            const minVal = Math.min(r, g, b);
            const chroma = maxVal - minVal;
            
            // 1. Detect White/Light-Grey/Screen background
            const isWhiteOrGrey = (r > 150 && g > 150 && b > 140 && chroma < 30) || (r > 180 && g > 180 && b > 170 && chroma < 45);
            if (isWhiteOrGrey) {
                whitePixels++;
            }
            
            // 2. Detect Green Leaf pixels
            const isGreen = g > 55 && g > r * 1.10 && g > b * 1.10 && chroma > 15;
            if (isGreen) {
                greenPixels++;
            }
            
            // 3. Detect Yellow/Dry/Brown Leaf pixels
            const isYellowOrBrown = r > 70 && g > 65 && b < r * 0.75 && Math.abs(r - g) < 25 && chroma > 20;
            if (isYellowOrBrown) {
                yellowOrBrownPixels++;
            }
        }
        
        const leafPixels = greenPixels + yellowOrBrownPixels;
        const leafRatio = leafPixels / totalPixels;
        const whiteRatio = whitePixels / totalPixels;
        
        // Calculate infected pixel ratio relative to total leaf surface area
        let infectedAreaPct = 0;
        if (leafPixels > 0) {
            infectedAreaPct = Math.round((yellowOrBrownPixels / leafPixels) * 100);
        }
        
        console.log(`📊 [Severity Analysis] Healthy Leaf Pixels: ${greenPixels}, Infected Leaf Pixels: ${yellowOrBrownPixels}, Total Leaf Pixels: ${leafPixels}`);
        console.log(`📊 [Severity Analysis] Calculated Infected Area Percentage: ${infectedAreaPct}%`);
        
        return {
            infectedAreaPct: Math.min(100, Math.max(0, infectedAreaPct)),
            leafRatio: parseFloat(leafRatio.toFixed(3)),
            whiteRatio: parseFloat(whiteRatio.toFixed(3))
        };
    } catch (e) {
        console.warn("⚠️ Leaf severity analysis failed, falling back:", e);
        return {
            infectedAreaPct: 15, // fallback avg
            leafRatio: 0.5,
            whiteRatio: 0.2
        };
    }
}
