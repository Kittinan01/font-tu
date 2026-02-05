// components/public/service/search/index.js
import { fetchSearchData } from '../api';

/**
 * ดึงข้อมูลเอกสารสำหรับการค้นหา
 * @param {string} query - คำค้นหา (optional)
 * @param {object} filters - ตัวกรอง {document, tag, content} (optional)
 * @returns {Promise<Array>} Array of search document data
 */
export const getsearchData = async (query = '', filters = {}) => {
    try {
        console.log('🔄 Fetching search data from API...', { query, filters });
        const response = await fetchSearchData(query, filters);
        
        // ตรวจสอบ response structure
        if (response && response.success && response.data) {
            console.log('✅ Search data loaded:', response.data.length, 'items');
            return response.data;
        }
        
        // ถ้า response ไม่ถูกต้อง ให้ return array ว่าง
        console.warn('⚠️ Invalid response structure, returning empty array');
        return [];
    } catch (error) {
        console.error('❌ Error fetching search data:', error);
        // Return empty array แทน mock data
        return [];
    }
};