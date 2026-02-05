// components/Constant.js

export const APP_PATHS = {
  DASHBOARD: "/public/dashboard",
  HISTORY_SCAN: "/public/historyscan",
  SEARCH: "/public/search",
  // เพิ่ม path อื่นๆ ที่นี่ในอนาคต
};

export const DASHBOARD_MENU = [
  {
    id: 1,
    title: "ประวัติการสแกนเอกสาร",
    subtitle: "ดูประวัติการสแกนเอกสารทั้งหมด",
    badge: "2123 รายการ",
    icon: "/assets/iconpublicdashboard/history.png",
    variant: "primary", // สีแดงเลือดหมู (#832627)
    type: "history",
    path: APP_PATHS.HISTORY_SCAN
  },
  {
    id: 2,
    title: "อัปโหลดเอกสารอัตโนมัติ",
    subtitle: "การอัปโหลดเอกสารอัตโนมัติ",
    badge: "อัปโหลด",
    icon: "/assets/iconpublicdashboard/upload1.png",
    variant: "success", // สีเขียวเข้ม (#2A5952)
    type: "upload",
    path: "" // Placeholder
  },
  {
    id: 3,
    title: "คลังเอกสาร",
    subtitle: "จัดการเอกสารทั้งหมดในระบบ",
    badge: "2410 ไฟล์",
    icon: "/assets/iconpublicdashboard/Document archive.png",
    variant: "warning", // สีเหลืองทอง (#f8c835)
    type: "archive",
    path: "#" // Placeholder
  },
  {
    id: 4,
    title: "ค้นหาเอกสาร",
    subtitle: "ค้นหาเอกสารด้วยคำค้นหา",
    badge: null,
    icon: "/assets/iconpublicdashboard/search.png",
    variant: "search", // สีแดงส้ม (#EA5254),
    type: "search",
    path: APP_PATHS.SEARCH
  }
];

export const HEADER_ASSETS = {
  LOGO: "/assets/logopublicdashboard/THAMC 2.png",
  LOGO3: "/assets/logopublicdashboard/THAMC 3.png",
  USER_PROFILE_ICON: "/assets/iconpublicdashboard/users.png",
  UNDO_BUTTUN:"/assets/iconpublicdashboard/icons8-undo-78.png",
  FOLDER_ICON:"/assets/iconpublicdashboard/icons8-folder-96.png",
  FOLDERUPLODE_ICON:"/assets/iconpublicdashboard/icons8-folder-24.png",
  FOLDER_ACTIVE_ICON: "/assets/iconpublicdashboard/floder.png", // ไอคอนเมื่อ active
  DOCS_ICON:"/assets/iconpublicdashboard/docs.png",
  DROPDOWE_ICON:"/assets/iconpublicdashboard/drop-down.png",
  REFRESHWH_ICON:"/assets/iconpublicdashboard/refreshwh.png",
  



};

export const USAGE_SUMMARY = [
  {
    id: 1,
    label: "เอกสารทั้งหมด",
    value: "1,245",
    unit: "",
    icon: "/assets/iconpublicdashboard/document all.png",
    highlight: false,
    colorClass: "text-brand-green" // สีเขียวสำหรับค่าปกติ
  },
  {
    id: 2,
    label: "อัปโหลดวันนี้",
    value: "28",
    unit: "",
    icon: "/assets/iconpublicdashboard/upload.png",
    highlight: true, // สีแดง
    colorClass: "text-accent-red"
  },
  {
    id: 3,
    label: "พื้นที่ใช้งาน",
    value: "15.2 G",
    unit: "",
    icon: "/assets/iconpublicdashboard/Storage area.png",
    highlight: true, // สีเหลือง (ในรูปเป็นสีเหลือง)
    colorClass: "text-accent-yellow"
  }
];