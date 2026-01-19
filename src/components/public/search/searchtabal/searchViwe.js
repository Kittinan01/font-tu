'use client'
import '@/app/style/public.css';
import React, { useState } from 'react';
import Image from 'next/image';

import {  HEADER_ASSETS } from '@/components/Constant';
import UploadTemplate from '../../modal/uploadtemplate';

export default function SearchView ({ loading, error, data }) {
    
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
                                <th className="th-id with-separator">ลำดับ</th>  
                                <th className="th-docno with-separator">เลขที่เอกสาร</th>
                                <th className="th-docname with-separator">ชื่อเอกสาร</th>
                                <th className="th-filetype with-separator">ประเภทไฟล์</th>
                                <th className="th-owner with-separator">เจ้าของไฟล์</th>
                                <th className="th-tag with-separator">แท็ก</th>
                                <th className="th-lastupdate with-separator">อัปเดตล่าสุด</th>
                                <th className="th-action">Action</th>
                            </tr>
                        </thead>
                        <tbody className='table-body search-table-body'>
                            {data.map((item, index) => (
                                <tr key={item.id} className={index % 2 === 0 ? 'row-white' : 'row-gray'}>
                                    <td className="with-separator">{item.id}</td>
                                    <td className="with-separator">{item.docNo}</td>
                                    <td className="with-separator">{item.docName}</td>
                                    <td className="with-separator">{item.fileType}</td>
                                    <td className="with-separator">{item.owner}</td>
                                    <td className="with-separator">{item.tag}</td>
                                    <td className="td-last with-separator">{item.lastUpdate}</td>
                                    <td>
                                        <div className="action-icons">
                                           
                                            <a 
                                                href={'https://yalapao.go.th/th/wp-content/uploads/%E0%B9%83%E0%B8%9A%E0%B8%AA%E0%B8%B1%E0%B9%88%E0%B8%87%E0%B8%88%E0%B9%89%E0%B8%B2%E0%B8%87%E0%B9%80%E0%B8%AB%E0%B8%A1%E0%B8%B2%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%9A%E0%B8%B8%E0%B8%84%E0%B8%84%E0%B8%A5%E0%B8%A0%E0%B8%B2%E0%B8%A2%E0%B8%99%E0%B8%AD%E0%B8%81-%E0%B8%81%E0%B8%AD%E0%B8%87%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%A8%E0%B8%B6%E0%B8%81%E0%B8%A9%E0%B8%B2%E0%B8%AF.pdf'} // TODO: เปลี่ยนเป็น URL ของไฟล์จริง เช่น `/files/${item.fileName}`
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="icon-btn" 
                                                title="View File">
                                                <Image src={HEADER_ASSETS.DOCS_ICON} alt="File" width={15} height={15} />
                                            </a>
                                            <button className="icon-btn" title="Folder" onClick={() => handleOpenModal(item)}>
                                                <Image src={HEADER_ASSETS.FOLDER_ACTIVE_ICON} alt="Folder" width={13} height={12} />
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
   