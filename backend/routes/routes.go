package routes

import (
	"backend/data"
	"backend/handlers"

	"github.com/gofiber/fiber/v2"
)

// ตั้งค่าเส้นทางทั้งหมดสำหรับแอปพลิเคชัน
func SetupRoutes(app *fiber.App) {
	// ดึงข้อมูลจำลอง
	data.InitMockData()

	// API group
	api := app.Group("/api")

	// History Scan routes
	history := api.Group("/history-scan")
	history.Get("/", handlers.GetHistoryScan)
	history.Get("/:id", handlers.GetHistoryScanByID)
	history.Delete("/:id", handlers.DeleteHistoryScan)

	// Scan routes
	api.Post("/scan", handlers.CreateScan)

	// Search routes
	search := api.Group("/search")
	search.Get("/", handlers.GetSearch)
	search.Get("/:id", handlers.GetSearchByID)

	// Folder routes
	folders := api.Group("/folders")
	folders.Get("/", handlers.GetFolders)
	folders.Get("/:id", handlers.GetFolderByID)

	// Dashboard routes
	dashboard := api.Group("/dashboard")
	dashboard.Get("/summary", handlers.GetDashboardSummary)
	dashboard.Get("/stats", handlers.GetDashboardStats)

	// Upload routes
	upload := api.Group("/upload")
	upload.Post("/", handlers.UploadFile)
	upload.Post("/multiple", handlers.UploadMultipleFiles)
	upload.Delete("/:filename", handlers.DeleteFile)

	// Static files (for uploaded files)
	app.Static("/uploads", "./uploads")
}
