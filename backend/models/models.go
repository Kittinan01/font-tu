package models

// HistoryScan represents a document scan history record
type HistoryScan struct {
	ID      int    `json:"id"`
	Date    string `json:"date"`
	Machine string `json:"machine"`
	Status  string `json:"status"` // success, failed
	Error   string `json:"error"`
}

// SearchDocument represents a document in the system
type SearchDocument struct {
	ID          int    `json:"id"`
	DocNo       string `json:"docNo"`
	DocName     string `json:"docName"`
	FileType    string `json:"fileType"`
	Owner       string `json:"owner"`
	LastUpdate  string `json:"lastUpdate"`
	Tag         string `json:"tag"`
	Description string `json:"description"`
}

// FolderNode represents a folder in the tree structure
type FolderNode struct {
	ID       string        `json:"id"`
	Name     string        `json:"name"`
	Children []*FolderNode `json:"children,omitempty"`
}

// DashboardSummary represents dashboard statistics
type DashboardSummary struct {
	TotalDocuments int    `json:"totalDocuments"`
	UploadedToday  int    `json:"uploadedToday"`
	StorageUsed    string `json:"storageUsed"`
}

// UploadRequest represents file upload request
type UploadRequest struct {
	FolderID string `json:"folderId"`
	FileName string `json:"fileName"`
	FileSize int64  `json:"fileSize"`
}

// ScanRequest represents a new scan request
type ScanRequest struct {
	Machine string `json:"machine"`
	Barcode string `json:"barcode"`
}

// Response represents a standard API response
type Response struct {
	Success bool        `json:"success"`
	Message string      `json:"message,omitempty"`
	Data    interface{} `json:"data,omitempty"`
	Meta    interface{} `json:"meta,omitempty"`
	Error   string      `json:"error,omitempty"`
}
type DashboardStats struct {
	MonthlyUploads map[string]int `json:"monthlyUploads"`
	TopUsers       []string       `json:"topUsers"`
}
type UploadResponse struct {
	FileName   string `json:"fileName"`
	FileSize   int64  `json:"fileSize"`
	FolderID   string `json:"folderId"`
	UploadedAt string `json:"uploadedAt"`
	Path       string `json:"path"`
}
