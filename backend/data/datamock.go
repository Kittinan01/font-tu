package data

import (
	"backend/models"
	"fmt"
	"math/rand"
	"time"
)

// Mock data storage (in-memory for development)
var (
	HistoryScanData   []models.HistoryScan
	SearchDocuments   []models.SearchDocument
	FolderTree        []*models.FolderNode
	nextHistoryID     = 11
	nextDocumentID    = 11
)

// รวมฟังก์ชันการเริ่มต้นข้อมูลจำลองทั้งหมด
func InitMockData() {
	initHistoryScanData()
	initSearchDocuments()
	initFolderTree()
}

func initHistoryScanData() {
	HistoryScanData = []models.HistoryScan{
		{ID: 1, Date: "25/11/2568 12.24", Machine: "Scan01", Status: "success", Error: ""},
		{ID: 2, Date: "25/11/2568 09.14", Machine: "Scan02", Status: "failed", Error: "(ไม่สามารถอ่านบาร์โค้ดได้)"},
		{ID: 3, Date: "24/11/2568 10.55", Machine: "Scan02", Status: "success", Error: ""},
		{ID: 4, Date: "24/11/2568 12.20", Machine: "Scan01", Status: "success", Error: ""},
		{ID: 5, Date: "23/11/2568 09.35", Machine: "Scan03", Status: "success", Error: ""},
		{ID: 6, Date: "22/10/2568 11.33", Machine: "Scan02", Status: "failed", Error: "(ไม่สามารถอ่านบาร์โค้ดได้)"},
		{ID: 7, Date: "22/10/2568 11.32", Machine: "Scan01", Status: "failed", Error: "(ไม่สามารถอ่านบาร์โค้ดได้)"},
		{ID: 8, Date: "22/10/2568 11.32", Machine: "Scan03", Status: "failed", Error: "(ไม่สามารถอ่านบาร์โค้ดได้)"},
		{ID: 9, Date: "22/10/2568 11.31", Machine: "Scan01", Status: "failed", Error: "(ไม่สามารถอ่านบาร์โค้ดได้)"},
		{ID: 10, Date: "22/10/2568 11.30", Machine: "Scan02", Status: "success", Error: ""},
	}

	// Generate more data
	machines := []string{"Scan01", "Scan02", "Scan03"}
	currentDate := time.Date(2025, 10, 22, 11, 29, 0, 0, time.UTC)

	for i := 11; i <= 110; i++ {
		status := "success"
		errorMsg := ""
		if rand.Float64() < 0.3 {
			status = "failed"
			errorMsg = "(ไม่สามารถอ่านบาร์โค้ดได้)"
		}

		currentDate = currentDate.Add(time.Duration(-rand.Intn(60)) * time.Minute)

		HistoryScanData = append(HistoryScanData, models.HistoryScan{
			ID:      i,
			Date:    fmt.Sprintf("%02d/%02d/%d %02d.%02d", currentDate.Day(), currentDate.Month(), currentDate.Year()+543, currentDate.Hour(), currentDate.Minute()),
			Machine: machines[i%len(machines)],
			Status:  status,
			Error:   errorMsg,
		})
	}

	nextHistoryID = 111
}

func initSearchDocuments() {
	SearchDocuments = []models.SearchDocument{
		{
			ID:          1,
			DocNo:       "POO25100234",
			DocName:     "ใบสั่งซื้อ - จ้างเหมา เช่าบริการ",
			FileType:    "PDF",
			Owner:       "Apichaya Thongma",
			LastUpdate:  "2025-11-03 15:37:10",
			Tag:         "วันหมดอายุเอกสาร, สถานะ",
			Description: "งานที่นำเสนอของฝ่ายจัดซื้อการแพทย์ ธรรมศาสตร์และขออนุมัติ",
		},
		{
			ID:          2,
			DocNo:       "POH25110001",
			DocName:     "ใบสั่งซื้อ - ยา",
			FileType:    "PDF",
			Owner:       "Pasri teeya",
			LastUpdate:  "2025-11-03 15:38:00",
			Tag:         "วันหมดอายุเอกสาร, สถานะ",
			Description: "เอกสารสั่งซื้อยาทั้งในระบบและนอกระบบ รวมราคา และรายละเอียด",
		},
		{
			ID:          3,
			DocNo:       "POS25100012",
			DocName:     "ใบสั่งซื้อ - วัสดุสำนักงานและวัสดุอื่นๆ",
			FileType:    "PDF",
			Owner:       "Apichaya Thongma",
			LastUpdate:  "2025-11-03 14:18:11",
			Tag:         "วันหมดอายุเอกสาร, สถานะ",
			Description: "เอกสารสั่งซื้อวัสดุสำนักงานและวัสดุที่ต้องใช้ในงาน โดยระบุรายการ ราคา",
		},
		{
			ID:          4,
			DocNo:       "INV25100456",
			DocName:     "ใบแจ้งหนี้",
			FileType:    "PDF",
			Owner:       "Somchai Jaidee",
			LastUpdate:  "2025-11-02 11:20:00",
			Tag:         "การเงิน, รอชำระ",
			Description: "ใบแจ้งหนี้สำหรับบริการที่ปรึกษาเดือนตุลาคม",
		},
		{
			ID:          5,
			DocNo:       "QUO25100789",
			DocName:     "ใบเสนอราคา",
			FileType:    "PDF",
			Owner:       "Suda Dee",
			LastUpdate:  "2025-11-01 16:45:30",
			Tag:         "การขาย, ลูกค้าใหม่",
			Description: "ใบเสนอราคาสำหรับโครงการพัฒนาระบบใหม่",
		},
		{
			ID:          6,
			DocNo:       "REC25100112",
			DocName:     "ใบเสร็จรับเงิน",
			FileType:    "PDF",
			Owner:       "Pasri teeya",
			LastUpdate:  "2025-10-31 10:05:15",
			Tag:         "การเงิน, ชำระแล้ว",
			Description: "ใบเสร็จรับเงินค่าบริการรายปี",
		},
		{
			ID:          7,
			DocNo:       "MEMO25100055",
			DocName:     "บันทึกข้อความภายใน",
			FileType:    "DOCX",
			Owner:       "Apichaya Thongma",
			LastUpdate:  "2025-10-30 09:00:00",
			Tag:         "ภายใน, ประกาศ",
			Description: "ประกาศเรื่องวันหยุดประจำปี 2569",
		},
		{
			ID:          8,
			DocNo:       "CON25090001",
			DocName:     "สัญญาจ้างงาน",
			FileType:    "PDF",
			Owner:       "ฝ่ายบุคคล",
			LastUpdate:  "2025-10-29 17:30:45",
			Tag:         "HR, สัญญา",
			Description: "สัญญาจ้างงานสำหรับพนักงานใหม่",
		},
		{
			ID:          9,
			DocNo:       "REP25090023",
			DocName:     "รายงานการประชุม",
			FileType:    "PDF",
			Owner:       "Suda Dee",
			LastUpdate:  "2025-10-28 14:00:00",
			Tag:         "ประชุม, รายงาน",
			Description: "สรุปการประชุมทีมประจำสัปดาห์",
		},
		{
			ID:          10,
			DocNo:       "POO25090199",
			DocName:     "ใบสั่งซื้อ - อุปกรณ์คอมพิวเตอร์",
			FileType:    "PDF",
			Owner:       "Somchai Jaidee",
			LastUpdate:  "2025-10-27 11:11:11",
			Tag:         "จัดซื้อ, IT",
			Description: "สั่งซื้อคอมพิวเตอร์และอุปกรณ์เสริมสำหรับแผนกใหม่",
		},
	}

	// Generate more documents
	owners := []string{"Apichaya Thongma", "Pasri teeya", "Somchai Jaidee", "Suda Dee", "ฝ่ายบุคคล", "การเงิน", "จัดซื้อ"}
	fileTypes := []string{"PDF", "DOCX", "XLSX", "PNG", "JPG"}
	docTypes := []string{"ใบสั่งซื้อ", "ใบแจ้งหนี้", "ใบเสนอราคา", "บันทึกข้อความ", "สัญญา", "รายงาน"}
	subjects := []string{"วัสดุสำนักงาน", "อุปกรณ์ IT", "การจ้างงาน", "การประชุม", "โครงการพิเศษ", "การอบรม"}

	for i := 11; i <= 100; i++ {
		docType := docTypes[i%len(docTypes)]
		subject := subjects[i%len(subjects)]
		owner := owners[i%len(owners)]
		fileType := fileTypes[i%len(fileTypes)]
		randomNum := 1000 + rand.Intn(9000)

		date := time.Now().Add(-time.Duration(rand.Intn(30*24)) * time.Hour)

		SearchDocuments = append(SearchDocuments, models.SearchDocument{
			ID:          i,
			DocNo:       fmt.Sprintf("DOC%d", 25110000+i),
			DocName:     fmt.Sprintf("%s - %s #%d", docType, subject, randomNum),
			FileType:    fileType,
			Owner:       owner,
			LastUpdate:  date.Format("2006-01-02 15:04:05"),
			Tag:         fmt.Sprintf("%s, %s", docType, owner),
			Description: fmt.Sprintf("เอกสารสำหรับ %s เรื่อง %s สร้างโดย %s", docType, subject, owner),
		})
	}

	nextDocumentID = 101
}

func initFolderTree() {
	FolderTree = []*models.FolderNode{
		{
			ID:   "1",
			Name: "จัดซื้อ",
			Children: []*models.FolderNode{
				{
					ID:   "1-1",
					Name: "เอกสารจัดซื้อจัดจ้าง",
					Children: []*models.FolderNode{
						{ID: "1-1-1", Name: "ใบสั่งซื้อ"},
						{ID: "1-1-2", Name: "ใบเสนอราคา"},
					},
				},
				{
					ID:   "1-2",
					Name: "เอกสารบันทึก",
					Children: []*models.FolderNode{
						{ID: "1-2-1", Name: "บันทึกภายใน"},
						{ID: "1-2-2", Name: "บันทึกภายนอก"},
					},
				},
				{
					ID:   "1-3",
					Name: "เอกสารสัญญา",
					Children: []*models.FolderNode{
						{ID: "1-3-1", Name: "สัญญาจ้างเหมา"},
						{ID: "1-3-2", Name: "สัญญาเช่า"},
					},
				},
			},
		},
		{
			ID:   "2",
			Name: "บุคคล",
			Children: []*models.FolderNode{
				{ID: "2-1", Name: "สัญญาจ้างงาน"},
				{ID: "2-2", Name: "ประวัติพนักงาน"},
			},
		},
		{
			ID:   "3",
			Name: "การเงิน",
			Children: []*models.FolderNode{
				{ID: "3-1", Name: "ใบแจ้งหนี้"},
				{ID: "3-2", Name: "ใบเสร็จรับเงิน"},
				{ID: "3-3", Name: "รายงานการเงิน"},
			},
		},
	}
}

// AddHistoryScan adds a new history scan record
func AddHistoryScan(scan models.HistoryScan) models.HistoryScan {
	scan.ID = nextHistoryID
	nextHistoryID++
	HistoryScanData = append([]models.HistoryScan{scan}, HistoryScanData...)
	return scan
}

// DeleteHistoryScan deletes a history scan record by ID
func DeleteHistoryScan(id int) bool {
	for i, scan := range HistoryScanData {
		if scan.ID == id {
			HistoryScanData = append(HistoryScanData[:i], HistoryScanData[i+1:]...)
			return true
		}
	}
	return false
}