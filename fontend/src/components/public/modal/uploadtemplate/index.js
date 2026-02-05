import React, { useState, useEffect } from "react";
import Image from "next/image";
import { HEADER_ASSETS } from "@/components/Constant";
import { getFolderTreeData } from "../../service/historyscan";

export default function UploadTemplate({ isOpen, onClose, itemData }) {
    const [activeTab, setActiveTab] = useState('shared'); // 'shared' or 'myfiles'
    const [expandedFolders, setExpandedFolders] = useState({ '1': true }); // Example: Folder 1 is expanded by default
    const [treeData, setTreeData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch data only when the modal is opened
        if (isOpen) {
            const fetchTreeData = async () => {
                try {
                    setLoading(true);
                    const data = await getFolderTreeData();
                    setTreeData(data);
                    // Expand the root folder by default if it exists
                    if (data.length > 0 && data[0].id) {
                        setExpandedFolders(prev => ({ ...prev, [data[0].id]: true }));
                    }
                } catch (error) {
                    console.error("Failed to fetch folder tree data:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchTreeData();
        }
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    // ฟังก์ชันนี้จะป้องกันไม่ให้การคลิกที่ตัว Modal ปิด Modal ไปด้วย
    const handleModalContentClick = (e) => {
        e.stopPropagation();
    };

    const toggleFolder = (folderId) => {
        setExpandedFolders(prev => ({
            ...prev,
            [folderId]: !prev[folderId]
        }));
    };

    const renderTree = (nodes, level = 0) => (
        <ul className="tree-view-container" style={{ paddingLeft: level > 0 ? '20px' : '0' }}>
            {nodes.map(node => (
                <li key={node.id} className="tree-view-node">
                    <div className="tree-view-item">
                        {node.children && node.children.length > 0 ? (
                            <button
                                className={`tree-toggle-btn ${expandedFolders[node.id] ? 'expanded' : ''}`}
                                onClick={() => toggleFolder(node.id)}
                            />
                        ) : (
                            <span className="tree-toggle-placeholder"></span>
                        )}
                        <Image
                          src={HEADER_ASSETS.FOLDERUPLODE_ICON}
                          alt="Folder"
                          width={20}
                          height={20}
                          className="tree-folder-icon"
                        />
                        <span className="tree-item-name">{node.name}</span>
                    </div>
                    {node.children && node.children.length > 0 && expandedFolders[node.id] && (
                        <div className="tree-children">
                            {renderTree(node.children, level + 1)}
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="uploadtemplate-model" onClick={handleModalContentClick}>
                <div className="header-uploadtemplate">
                    <div className="modal-tabs">
                        <button
                            className={`modal-tab-btn ${activeTab === 'shared' ? 'active' : ''}`}
                            onClick={() => setActiveTab('shared')}
                        >
                            ไฟล์ที่ใช้ร่วมกัน
                        </button>
                        <button
                            className={`modal-tab-btn ${activeTab === 'myfiles' ? 'active' : ''}`}
                            onClick={() => setActiveTab('myfiles')}
                        >
                            ไฟล์ของฉัน
                        </button>
                    </div>
                    
                </div>
                <div className="body-uploadtemplate">
                    {activeTab === 'shared' && (
                         <div className="content-box">
                            {loading ? (
                                <p>Loading folders...</p>
                            ) : (
                                renderTree(treeData)
                            )}
                        </div>
                    )}
                    {activeTab === 'myfiles' && (
                        <div className="content-box">
                            <p>เนื้อหาสำหรับ "ไฟล์ของฉัน"</p>
                        </div>
                    )}
                </div>
                <div className="footer-uploadtemplate">
                      <button className="btn-upload-save">บันทึก</button>
                    <button className="btn-upload-cancel" onClick={onClose}>ยกเลิก</button>
                  
                </div>
            </div>
        </div>
    );
}