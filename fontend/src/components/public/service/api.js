// components/public/service/api.js

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'|| 'http://172.31.61.103:8080';

// Helper function สำหรับ handle errors
const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'API request failed');
    }
    return response.json();
};

// ===== History Scan APIs =====
export const fetchHistoryScanData = async () => {
    try {
        // ✅ แก้ไข: เพิ่มวงเล็บปีกกา () รอบ template literal
        const response = await fetch(`${API_BASE_URL}/api/history-scan`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Error fetching history scan:', error);
        throw error;
    }
};

// ===== Search APIs =====
export const fetchSearchData = async (query = '', filters = {}) => {
    try {
        const params = new URLSearchParams();
        if (query) params.append('q', query);
        if (filters.document) params.append('document', 'true');
        if (filters.tag) params.append('tag', 'true');
        if (filters.content) params.append('content', 'true');

        const url = `${API_BASE_URL}/api/search?${params.toString()}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Error fetching search data:', error);
        throw error;
    }
};

// ===== Folder Tree APIs =====
export const fetchFolderTree = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/folders`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Error fetching folder tree:', error);
        throw error;
    }
};

// ===== Dashboard Summary APIs =====
export const fetchDashboardSummary = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/dashboard/summary`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Error fetching dashboard summary:', error);
        throw error;
    }
};

// ===== File Upload API =====
export const uploadFile = async (file, folderId) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folderId', folderId);

        const response = await fetch(`${API_BASE_URL}/api/upload`, {
            method: 'POST',
            body: formData,
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};