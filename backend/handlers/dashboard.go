package handlers

import (
	"backend/models"

	"github.com/gofiber/fiber/v2"
)

// GetDashboardSummary godoc
// @Summary Get dashboard summary
// @Description Returns dashboard summary with total users, sessions, files and storage
// @Tags dashboard
// @Produce application/json
// @Success 200 {object} models.Response
// @Router /api/dashboard/summary [get]
// GetDashboardSummary returns dashboard summary
func GetDashboardSummary(c *fiber.Ctx) error {
	// Placeholder implementation
	summary := map[string]interface{}{
		"totalUsers":     150,
		"activeSessions": 45,
		"totalFiles":     1200,
		"storageUsed":    "15GB",
	}
	return c.JSON(models.Response{
		Success: true,
		Data:    summary,
	})
}

// GetDashboardStats godoc
// @Summary Get dashboard statistics
// @Description Returns dashboard statistics including daily uploads and monthly active users
// @Tags dashboard
// @Produce application/json
// @Success 200 {object} models.Response
// @Router /api/dashboard/stats [get]
// GetDashboardStats returns dashboard statistics
func GetDashboardStats(c *fiber.Ctx) error {
	// Placeholder implementation
	stats := map[string]interface{}{
		"dailyUploads":       []int{10, 20, 15, 30, 25, 40, 50},
		"monthlyActiveUsers": []int{100, 120, 130, 140, 150, 160, 170},
	}
	return c.JSON(models.Response{
		Success: true,
		Data:    stats,
	})
}
