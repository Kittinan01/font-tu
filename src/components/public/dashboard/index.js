// components/public/dashboard/index.js
"use client";

import React, { useState } from 'react'; // นำเข้า React และ useState
import { useRouter } from 'next/navigation'; // 1. นำเข้า useRouter
import Image from 'next/image';
import { DASHBOARD_MENU, USAGE_SUMMARY, HEADER_ASSETS } from '@/components/Constant';
import '@/app/style/public.css'; 

export default function   DashboardComponent() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter(); // 2. สร้าง instance ของ router

  // 3. สร้างฟังก์ชันสำหรับจัดการการคลิกการ์ด
  const handleCardClick = (path) => {
    if (path) router.push(path);
  };
  return (
    <div className="dashboard-page">
      
      {/* 1. Header Section */}
      <header className= "dashboard-header">
        <div className ="header-left-section">
            
        <div className="header-logo">
          <Image 
            src={HEADER_ASSETS.LOGO} 
            alt="THAMC Logo"
            width={160} 
            height={45} 
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
        <div className='line'> </div>
        {/* Title */}
        <div className="header-title">
          <p>ระบบจัดการเอกสาร</p>
          <p>Document Management System</p>
        </div>
        </div>

        {/* User Profile Section with Dropdown */}
        <div className="header-user-section">
          <button 
            className="header-user-profile"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-haspopup="true"
            aria-expanded={isDropdownOpen}
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
              alt="User Profile"
              width={30}
              height={30}
              className="dropdown-user-image"
              style={{ objectFit: 'cover' }}
            />
                admin
              </div>
              <div className="dropdown-divider"> </div>
              <button className="dropdown-item dropdown-logout-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                  <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                </svg>
                <span>ออกจากระบบ</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* 2. Main Menu Grid */}
      <main className="dashboard-content">
        <div className="menu-grid">
          
      
    {DASHBOARD_MENU.map((item) => ( //
    // สำหรับแต่ละ "item" ในอาร์เรย์ ให้สร้าง <div /> ต่อไปนี้
    <div 
      // 2. กำหนด key ที่ไม่ซ้ำกันสำหรับแต่ละการ์ด (สำคัญสำหรับ React)
      key={item.id}
      // 3. กำหนด CSS class แบบไดนามิก เช่น "menu-card variant-primary"
      className={`menu-card variant-${item.variant}`}
      // 4. เพิ่ม onClick event handler
      onClick={() => handleCardClick(item.path)}
    >
      {/* ส่วนของไอคอน */}
      <div className="card-icon-wrapper">
        {/* 4. แสดงรูปภาพไอคอน โดยดึง URL มาจาก item.icon */}
        <Image 
          src={item.icon} 
          alt={item.title} 
          width={80} 
          height={80}
          style={{ objectFit: 'contain' }}
        />
      </div>

      {/* ส่วนของข้อความ */}
      <div className="card-text-content">
        {/* 5. แสดงหัวข้อหลักของการ์ด จาก item.title */}
        <h2 className="card-title">{item.title}</h2>
        {/* 6. แสดงคำอธิบายย่อย จาก item.subtitle */}
        <p className="card-subtitle">{item.subtitle}</p>
        
        {/* 7. ตรวจสอบว่า item.badge มีข้อมูลหรือไม่ ถ้ามี ให้แสดงผล */}
        {item.badge && (
          <span className="card-badge">
            {item.badge}
          </span>
        )}
      </div>
    </div>
))}


        </div>
      </main>

      {/* 3. Summary Footer Section */}
      <div className="footer-wrapper">
        <footer className="dashboard-footer">
          <div className="summary-title">
              สรุปการใช้งาน
          </div>
          
          <div className="summary-curve-bg">
            <div className="summary-cards-wrapper">
              {USAGE_SUMMARY.map((stat) => (
                <div key={stat.id} className="unified-wrapper">
                  <div className="card-body">
                    {/* ส่วนวงกลมไอคอน */}
                    <div className="icon-container">
                      <Image
                        src={stat.icon}
                        alt={stat.label}
                        width={40}
                        height={40}
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                    <div className="divider"></div>
                    {/* เนื้อหาภายในการ์ด */}
                    <div className="stat-group">
                      <div className={`stat-value ${stat.colorClass}`}>{stat.value}</div>
                      <div className= {`stat-label ${stat.colorClass}`}>
                        {stat.label}
                      </div>
                    </div>
                    
                  </div>
                </div>
              ))}
            </div>
          </div>
        </footer>
      </div>

    </div>
  );}