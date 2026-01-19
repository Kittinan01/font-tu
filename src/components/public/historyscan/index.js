'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import '@/app/style/public.css';
import Link from 'next/link';

import FileViewscan from './fileviewscan/FileViewscan';
import PagingTable from '../pagingTable/pagingTable';

import { getHistoryScanData } from '../service/historyscan';
import { HEADER_ASSETS, APP_PATHS } from '@/components/Constant';

export default function HistoryScanIndex() {

  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFolderActive, setIsFolderActive] = useState(false);

  /* ===== Fetch Data ===== */
  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getHistoryScanData();
      setAllData(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('เกิดข้อผิดพลาดในการโหลดข้อมูล');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ===== Pagination ===== */
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (limit) => {
    setItemsPerPage(limit);
    setCurrentPage(1);
  };

  return (
    <div className="historypage-bg">
      <div className="historypage">

        {/* ===== Sidebar ===== */}
        <div className="tap-history">
          <div className="tap-history-top">
            <Image src={HEADER_ASSETS.LOGO3} alt="Logo" width={33} height={35} />

            <button
              className={`folder-button ${isFolderActive ? 'active' : ''}`}
              onMouseEnter={() => setIsFolderActive(true)}
              onMouseLeave={() => setIsFolderActive(false)}
            >
              <Image
                src={isFolderActive ? HEADER_ASSETS.FOLDER_ACTIVE_ICON : HEADER_ASSETS.FOLDER_ICON}
                alt="Folder"
                width={25}
                height={25}
              />
            </button>
          </div>

          <button className="refreshwh-button" onClick={fetchData}>
            <Image src={HEADER_ASSETS.REFRESHWH_ICON} alt="Refresh" width={25} height={25} />
          </button>
        </div>

        {/* ===== Content ===== */}
        <div className="history-content">

          {/* ===== Header ===== */}
             <div className="history-actions">
                                             <h1 className="title-search">ประวัติการสแกนเอกสาร</h1>
                                       <div className='right-section'>
                                        <Link href={APP_PATHS.DASHBOARD} className="back-button" title="กลับ">
                                            <Image src={HEADER_ASSETS.UNDO_BUTTUN} alt="undo" width={30} height={30} />
                                        </Link>
                                        <div className="header-user-section">
                                          <button
                                            className="header-user-profile"
                                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                          >
                                            <Image
                                              src={HEADER_ASSETS.USER_PROFILE_ICON}
                                              alt="User Profile"
                                              width={40}
                                              height={40}
                                            />
                                          </button>
                          
                                          {isDropdownOpen && (
                                            <div className="user-dropdown">
                                              <div className="dropdown-item dropdown-user-info">
                                                <Image
                                                  src={HEADER_ASSETS.USER_PROFILE_ICON}
                                                  alt="User"
                                                  width={30}
                                                  height={30}
                                                />
                                                admin
                                              </div>
                                              <div className="dropdown-divider" />
                                              <button className="dropdown-item dropdown-logout-button">
                                                ออกจากระบบ
                                              </button>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                       </div>
                                       
          {/* ===== Table ===== */}
          <FileViewscan
            loading={loading}
            error={error}
            data={currentItems}
          />

          {!loading && !error && allData.length > 0 && (
            <PagingTable
              totalItems={allData.length}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          )}

        </div>
      </div>
    </div>
  );
}
