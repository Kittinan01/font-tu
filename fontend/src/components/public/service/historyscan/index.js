// // จำลองการเรียก API
// export const getHistoryScanData = async () => {
    
//      return new Promise((resolve) => {
//         setTimeout(() => {
//             const initialData = [
//                 { id: 1, date: '25/11/2568 12.24', machine: 'Scan01', status: 'success', error: '' },
//                 { id: 2, date: '25/11/2568 09.14', machine: 'Scan02', status: 'failed', error: '(ไม่สามารถอ่านบาร์โค้ดได้)' },
//                 { id: 3, date: '24/11/2568 10.55', machine: 'Scan02', status: 'success', error: '' },
//                 { id: 4, date: '24/11/2568 12.20', machine: 'Scan01', status: 'success', error: '' },
//                 { id: 5, date: '23/11/2568 09.35', machine: 'Scan03', status: 'success', error: '' },
//                 { id: 6, date: '22/10/2568 11.33', machine: 'Scan02', status: 'failed', error: '(ไม่สามารถอ่านบาร์โค้ดได้)' },
//                 { id: 7, date: '22/10/2568 11.32', machine: 'Scan01', status: 'failed', error: '(ไม่สามารถอ่านบาร์โค้ดได้)' },
//                 { id: 8, date: '22/10/2568 11.32', machine: 'Scan03', status: 'failed', error: '(ไม่สามารถอ่านบาร์โค้ดได้)' },
//                 { id: 9, date: '22/10/2568 11.31', machine: 'Scan01', status: 'failed', error: '(ไม่สามารถอ่านบาร์โค้ดได้)' },
//                 { id: 10, date: '22/10/2568 11.30', machine: 'Scan02', status: 'success', error: '' },
//             ];

//             const generatedData = [];
//             const machines = ['Scan01', 'Scan02', 'Scan03'];
//             let currentDate = new Date('2025-10-22T11:29:00');

//             for (let i = 11; i <= 110; i++) {
//                 const status = Math.random() > 0.3 ? 'success' : 'failed';
//                 currentDate.setMinutes(currentDate.getMinutes() - Math.floor(Math.random() * 60));

//                 generatedData.push({
//                     id: i,
//                     date: `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear() + 543} ${String(currentDate.getHours()).padStart(2, '0')}.${String(currentDate.getMinutes()).padStart(2, '0')}`,
//                     machine: machines[i % machines.length],
//                     status: status,
//                     error: status === 'failed' ? '(ไม่สามารถอ่านบาร์โค้ดได้)' : ''
//                 });
//             }

//             resolve([...initialData, ...generatedData]);
//         }, 100);
//     });
// };

// // จำลองการเรียก API สำหรับ folder tree
// export const getFolderTreeData = async () => {
//     return new Promise((resolve) => {
//         const treeData = [
//     {
//         id: '1',
//         name: 'จัดซื้อ',
//         children: [
//             { id: '1-1', name: 'เอกสารจัดซื้อจัดจ้าง ', children: [{ id: '1-1-1', name: 'Sub-subfolder 1.1.1' }]},
//             { id: '1-2', name: 'เอกสารบันทึก', children: [{ id: '1-2-1', name: 'Sub-subfolder 1.2.1' }]},
//             { id: '1-3', name: 'เอกสารสัญญา', children: [{ id: '1-3-1', name: 'Sub-subfolder 1.3.1' }]},
            
//         ],
//     },
// ];
//         setTimeout(() => {
//             resolve(treeData);
//         }, 100); // Simulate a short delay
//     });
// };
 

// components/public/service/historyscan/index.js
import { fetchHistoryScanData, fetchFolderTree } from '../api';

/**
 * ดึงข้อมูลประวัติการสแกนเอกสาร
 * @returns {Promise<Array>} Array of history scan data
 */
export const getHistoryScanData = async () => {
    try {
        console.log('🔄 Fetching history scan data from API...');
        const response = await fetchHistoryScanData();

        // ตรวจสอบ response structure
        if (response && response.success && response.data) {
            console.log('✅ History scan data loaded:', response.data.length, 'items');
            return response.data;
        }

        const error = new Error('Invalid API response structure for history scan data');
        console.error('❌', error.message, response);
        throw error;
    } catch (error) {
        console.error('❌ Error fetching history scan data:', error);
        throw error; // โยน error ให้ component จัดการ
    }
};

/**
 * ดึงข้อมูล Folder Tree
 * @returns {Promise<Array>} Array of folder tree data
 */
export const getFolderTreeData = async () => {
    try {
        console.log('🔄 Fetching folder tree from API...');
        const response = await fetchFolderTree();

        // ตรวจสอบ response structure
        if (response && response.success && response.data) {
            console.log('✅ Folder tree loaded:', response.data.length, 'root folders');
            return response.data;
        }

        const error = new Error('Invalid API response structure for folder tree data');
        console.error('❌', error.message, response);
        throw error;
    } catch (error) {
        console.error('❌ Error fetching folder tree:', error);
        throw error; // โยน error ให้ component จัดการ
    }
};