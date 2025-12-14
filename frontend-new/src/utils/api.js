// API Configuration and Utilities
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Generic API request handler with error handling
 */
async function apiRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;

    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const config = { ...defaultOptions, ...options };

    try {
        const response = await fetch(url, config);

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error('API Request Failed:', error);
        return { success: false, error: error.message };
    }
}

// ============================================
// CHAT API
// ============================================
export const chatAPI = {
    /**
     * Send a message to the AI chatbot
     * @param {string} message - User's message
     * @returns {Promise<{success: boolean, data?: any, error?: string}>}
     */
    async sendMessage(message) {
        return apiRequest('/api/chat', {
            method: 'POST',
            body: JSON.stringify({ message }),
        });
    },
};

// ============================================
// COMMUNITY API
// ============================================
export const communityAPI = {
    /**
     * Get all community posts
     * @returns {Promise<{success: boolean, data?: any, error?: string}>}
     */
    async getPosts() {
        return apiRequest('/api/community/posts');
    },

    /**
     * Create a new community post
     * @param {Object} post - Post data {user, role, content}
     * @returns {Promise<{success: boolean, data?: any, error?: string}>}
     */
    async createPost(post) {
        return apiRequest('/api/community/posts', {
            method: 'POST',
            body: JSON.stringify(post),
        });
    },

    /**
     * Like a post
     * @param {string} postId - Post ID
     * @returns {Promise<{success: boolean, data?: any, error?: string}>}
     */
    async likePost(postId) {
        return apiRequest(`/api/community/posts/${postId}/like`, {
            method: 'POST',
        });
    },
};

// ============================================
// MARKET API
// ============================================
export const marketAPI = {
    /**
     * Get all market products
     * @returns {Promise<{success: boolean, data?: any, error?: string}>}
     */
    async getProducts() {
        return apiRequest('/api/market/products');
    },

    /**
     * Create a new product listing
     * @param {Object} product - Product data {name, category, price, seller, type}
     * @returns {Promise<{success: boolean, data?: any, error?: string}>}
     */
    async createProduct(product) {
        return apiRequest('/api/market/products', {
            method: 'POST',
            body: JSON.stringify(product),
        });
    },

    /**
     * Get products by category
     * @param {string} category - Category name
     * @returns {Promise<{success: boolean, data?: any, error?: string}>}
     */
    async getProductsByCategory(category) {
        return apiRequest(`/api/market/products?category=${encodeURIComponent(category)}`);
    },
};

// ============================================
// CONSULT API
// ============================================
export const consultAPI = {
    /**
     * Get all available experts
     * @returns {Promise<{success: boolean, data?: any, error?: string}>}
     */
    async getExperts() {
        return apiRequest('/api/consult/experts');
    },

    /**
     * Get expert by ID
     * @param {string} expertId - Expert ID
     * @returns {Promise<{success: boolean, data?: any, error?: string}>}
     */
    async getExpertById(expertId) {
        return apiRequest(`/api/consult/experts/${expertId}`);
    },

    /**
     * Schedule a consultation
     * @param {Object} consultation - {expertId, type, scheduledTime}
     * @returns {Promise<{success: boolean, data?: any, error?: string}>}
     */
    async scheduleConsultation(consultation) {
        return apiRequest('/api/consult/schedule', {
            method: 'POST',
            body: JSON.stringify(consultation),
        });
    },
};

// ============================================
// DISEASE SCAN API (if needed for backend processing)
// ============================================
export const scanAPI = {
    /**
     * Upload image for disease detection
     * @param {File} imageFile - Image file to analyze
     * @returns {Promise<{success: boolean, data?: any, error?: string}>}
     */
    async analyzePlantDisease(imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);

        return apiRequest('/api/scan/analyze', {
            method: 'POST',
            body: formData,
            headers: {}, // Let browser set Content-Type for FormData
        });
    },
};

export default {
    chatAPI,
    communityAPI,
    marketAPI,
    consultAPI,
    scanAPI,
};
