'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import '@/app/style/public.css';
import Link from 'next/link';
import SearchView from '@/components/public/search/searchtabal/searchViwe';
import PagingTable from '../pagingTable/pagingTable';
import { getsearchData } from '../service/search';
import { HEADER_ASSETS, APP_PATHS } from '@/components/Constant';

export default function SearchIndex() {
    const [allData, setAllData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const [isFolderActive, setIsFolderActive] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const [searchQuery, setSearchQuery] = useState(''); // State สำหรับคำค้นหาที่ใช้กรองข้อมูลจริง
    const [filteredData, setFilteredData] = useState([]);
    const [searchFilters, setSearchFilters] = useState({
        document: false, // ค้นหาไฟล์เอกสารเป็นค่าเริ่มต้น
        tag: false,
        content: false,
    });

    
    /* ===== Fetch Data ===== */
    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await getsearchData();
            setAllData(data);
            setFilteredData(data); // ตั้งค่าข้อมูลที่กรองแล้วเริ่มต้น
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

    /* ===== Search ===== */
    useEffect(() => {
        // Debounce: รอ 300ms 
        const handler = setTimeout(() => {
            setSearchQuery(searchTerm);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    useEffect(() => {
        const term = searchQuery.toLowerCase();
        //เช็คว่าไม่ได้เลือก filter 
        const noFiltersSelected = !searchFilters.document && !searchFilters.tag && !searchFilters.content;
        //ค้นหาในเอกสาร
        const results = allData.filter(item => {
            // 1. ช่องนั้นถูกติ๊กไว้ (เช่น searchFilters.document)
            // 2. หรือ ไม่มีช่องไหนถูกติ๊กเลย (noFiltersSelected)
            const inDocument = (searchFilters.document || noFiltersSelected) && (!term || (
                item.docNo.toLowerCase().includes(term) ||
                item.docName.toLowerCase().includes(term) ||
                item.owner.toLowerCase().includes(term) ||
                item.fileType.toLowerCase().includes(term))
            );
            const inTag = (searchFilters.tag || noFiltersSelected) && (!term || item.tag.toLowerCase().includes(term));
            const inContent = (searchFilters.content || noFiltersSelected) && (!term || item.description.toLowerCase().includes(term));

            // ถ้าไม่มีการเลือก filter เลย ให้ค้นหาจากทุก field
            if (noFiltersSelected) {
                return inDocument || inTag || inContent;
            }
            // ถ้ามีการเลือก filter ให้ค้นหาเฉพาะ field ที่เลือก
            return inDocument || inTag || inContent;
        });

        setFilteredData(results);
        setCurrentPage(1);
    }, [searchQuery, allData, searchFilters]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchClick = () => {
        // เมื่อกดปุ่มค้นหา ให้ใช้ค่าจาก searchTerm ทันที
        setSearchQuery(searchTerm);
    };

    const handleClearSearch = () => {
        // 1. ล้างคำค้นหาใน state
        setSearchTerm('');
        setSearchQuery(''); // เพิ่มการล้าง searchQuery เพื่อให้แสดงผลข้อมูลทั้งหมด
        // 2. ล้างค่า checkbox ทั้งหมดใน state
        setSearchFilters({
            // กลับไปใช้ค่าเริ่มต้น
            document: false,
            tag: false,
            content: false,
        });
    };
    
    const handleFilterChange = (event) => {
        const { name, checked } = event.target;
        setSearchFilters(prevFilters => ({
            ...prevFilters,
            [name]: checked
        }));
    };


    /* ===== Pagination ===== */
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

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
                          <div className="search-section-hader ">
                            <div className='secrh-hader'>
                             
                                <div className="history-actions search-action">
                                   <h1 className="title-search">ค้นหาเอกสาร</h1>
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
                             
                            <div className="search-controls-container">
                                <div className="search-bar-container">
                                    <input
                                        type="text"
                                        placeholder="กรุณากรอกคำค้นหาเอกสาร"
                                        className="search-input"
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                    /> 
                                    <button className="search-action-btn btn-search-go" onClick={handleSearchClick}>ค้นหา</button>
                                    <button className="search-action-btn btn-search-clear" onClick={handleClearSearch}>ล้างค่า</button>
                                </div>
        
                                <div className="tag-search">
                                    <label className="custom-checkbox">
                                        <input 
                                            type="checkbox" 
                                            name="document"
                                            checked={searchFilters.document}
                                            onChange={handleFilterChange}
                                        />
                                        <span>ไฟล์เอกสาร</span>
                                    </label>
                                    <label className="custom-checkbox">
                                        <input 
                                            type="checkbox" 
                                            name="tag"
                                            checked={searchFilters.tag}
                                            onChange={handleFilterChange}
                                        />
                                        <span>แท็ก</span>
                                    </label>
                                    <label className="custom-checkbox">
                                        <input 
                                            type="checkbox" 
                                            name="content"
                                            checked={searchFilters.content}
                                            onChange={handleFilterChange}
                                        />
                                        <span>เนื้อหาไฟล์เอกสาร</span>
                                    </label>
                                </div>
                            </div>
                            </div>
                          
                          </div>
                <SearchView loading={loading} error={error} data={currentItems} />
                {!loading && !error && filteredData.length > 0 && (
                    <PagingTable totalItems={filteredData.length} currentPage={currentPage} itemsPerPage={itemsPerPage} onPageChange={handlePageChange} onItemsPerPageChange={handleItemsPerPageChange} />
                )}
            </div>
            </div>
        </div>
    );
}