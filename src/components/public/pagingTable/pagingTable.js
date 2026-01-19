import React from 'react';
import '@/app/style/public.css';
import {  HEADER_ASSETS } from '@/components/Constant';


export default function PagingTable({ 
    totalItems = 0, 
    currentPage = 1, 
    itemsPerPage = 50,
    onPageChange,
    onItemsPerPageChange
}) {
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handleFirst = () => onPageChange && onPageChange(1);
    const handlePrevious = () => onPageChange && onPageChange(Math.max(1, currentPage - 1));
    const handleNext = () => onPageChange && onPageChange(Math.min(totalPages, currentPage + 1));
    const handleLast = () => onPageChange && onPageChange(totalPages);

    const handleItemsPerPageChange = (e) => {
        const newSize = parseInt(e.target.value, 10);
        onItemsPerPageChange && onItemsPerPageChange(newSize);
        onPageChange && onPageChange(1);
    };

    return (
        <div className="pagination-wrapper">
            {/* ฝั่งซ้าย: Info และ Dropdown */}
            <div className="pagination-info">
                แสดง {totalItems > 0 ? startItem : 0} ถึง {endItem} จาก {totalItems} รายการ
                <select 
                    className="pagination-select" 
                    value={itemsPerPage} 
                    onChange={handleItemsPerPageChange}
                >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                </select>
            </div>

            {/* ฝั่งขวา: Controls */}
            <div className="pagination-controls">
                <button className="page-btn" onClick={handleFirst} disabled={currentPage === 1}>&lt; |</button>
                <button className="pbtn" onClick={handlePrevious} disabled={currentPage === 1}>&lt; </button>
                <button className="page-btn-text" onClick={handlePrevious} disabled={currentPage === 1}> ก่อนหน้า</button>
                <span className="current-page-number">{currentPage}</span>
                <button className="page-btn-text" onClick={handleNext} disabled={currentPage >= totalPages}>ถัดไป </button>
                <button className="pbtn" onClick={handleLast} disabled={currentPage >= totalPages}>&gt;</button>
                <button className="page-btn" onClick={handleLast} disabled={currentPage >= totalPages}>| &gt;</button>
            </div>
        </div>
    );
}