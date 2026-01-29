// Base API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Custom API Error class for better error handling
 */
class ApiError extends Error {
    constructor(message, status, data) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.data = data;
    }
}

/**
 * API request wrapper with error handling
 * @param {string} endpoint - API endpoint (without base URL)
 * @param {object} options - Fetch options
 * @returns {Promise} - Response data
 */
async function apiRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;

    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    };

    try {
        const response = await fetch(url, config);

        // Parse response
        const data = await response.json().catch(() => null);

        // Handle error responses
        if (!response.ok) {
            throw new ApiError(
                data?.message || data?.error || 'An error occurred',
                response.status,
                data
            );
        }

        return data;
    } catch (error) {
        // Network errors or ApiError
        if (error instanceof ApiError) {
            throw error;
        }

        // Network/connection errors
        throw new ApiError(
            'Network error. Please check your connection.',
            0,
            null
        );
    }
}

/**
 * API methods
 */
const api = {
    /**
     * GET request
     */
    get: (endpoint, options = {}) => {
        return apiRequest(endpoint, {
            method: 'GET',
            ...options,
        });
    },

    /**
     * POST request
     */
    post: (endpoint, data, options = {}) => {
        return apiRequest(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
            ...options,
        });
    },

    /**
     * PUT request
     */
    put: (endpoint, data, options = {}) => {
        return apiRequest(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
            ...options,
        });
    },

    /**
     * DELETE request
     */
    delete: (endpoint, options = {}) => {
        return apiRequest(endpoint, {
            method: 'DELETE',
            ...options,
        });
    },
};

export { api, ApiError, API_BASE_URL };
