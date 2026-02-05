import React, { useState } from 'react';
import Image from 'next/image';
import '@/app/style/public.css'; 
// Import Icons
import iconFolderAdd from '../../../../../public/assets/iconpublicdashboard/floder add.png';
import {  HEADER_ASSETS } from '@/components/Constant';
import UploadTemplate from '../../modal/uploadtemplate';

export default function FileViewscan({ loading, error, data, onRowAction }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleOpenModal = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    return (
        <div className="table-card">
            {loading ? (
                <div className="table-status-message">กำลังโหลด...</div>
            ) : error ? (
                <div className="table-status-message" style={{ color: 'red' }}>{error}</div>
            ) : !data || data.length === 0 ? (
                <div className="table-status-message">ไม่พบข้อมูล</div>
            ) : (
                <table className="custom-table">
                    <thead className='table-head'>
                        <tr className='title-table'>
                            <th className="th-date">วันที่ / เวลา</th>
                            <th className="th-machine">เครื่องที่สแกน</th>
                            <th className="th-status">สถานะนำเข้า</th>
                            <th className="th-action">Action</th>
                        </tr>
                    </thead>
                    <tbody className="table-row-dashed ">
                        {data.map((item, index) => (
                            <tr key={index} className={item.status === 'failed' ? 'status-failed-row' : ''}>
                                <td>{item.date}</td>
                                <td>{item.machine}</td>
                                <td style={{ textAlign: 'center' }}>
                                    {item.status === 'success' ? (
                                        <span>สำเร็จ</span>
                                    ) : (
                                        <div className="status-failed">
                                            <div>ไม่สำเร็จ</div>
                                            <div className="error-text">{item.error}</div>
                                        </div>
                                    )}
                                </td>
                                <td>
                                    <div className="action-icons">
                                        <button className="icon-btn" title="View File">
                                            <Image src={HEADER_ASSETS.DOCS_ICON} alt="File" width={15} height={15} />
                                        </button>
                                        <button className="icon-btn" title="Add to Folder" onClick={() => handleOpenModal(item)}>
                                            <Image src={iconFolderAdd} alt="Folder Add" width={20} height={20} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {isModalOpen && (
                <UploadTemplate 
                    isOpen={isModalOpen} 
                    onClose={handleCloseModal} 
                    itemData={selectedItem} 
                />
            )}
        </div>
    );
}