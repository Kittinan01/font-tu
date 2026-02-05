package handlers

import (
	"backend/data"
	"backend/models"
	"fmt"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
)

// GetHistoryScan godoc
// @Summary Get all history scan records
// @Description Returns all history scan records
// @Tags history
// @Produce application/json
// @Success 200 {object} models.Response
// @Router /api/history [get]
// GetHistoryScan returns all history scan records
func GetHistoryScan(c *fiber.Ctx) error {
	return c.JSON(models.Response{
		Success: true,
		Data:    data.HistoryScanData,
	})
}

// GetHistoryScanByID godoc
// @Summary Get a specific history scan record
// @Description Returns a specific history scan record by ID
// @Tags history
// @Produce application/json
// @Param id path integer true "Scan ID"
// @Success 200 {object} models.Response
// @Failure 400 {object} models.Response
// @Failure 404 {object} models.Response
// @Router /api/history/{id} [get]
// GetHistoryScanByID returns a specific history scan record
func GetHistoryScanByID(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(models.Response{
			Success: false,
			Error:   "Invalid ID format",
		})
	}

	for _, scan := range data.HistoryScanData {
		if scan.ID == id {
			return c.JSON(models.Response{
				Success: true,
				Data:    scan,
			})
		}
	}

	return c.Status(fiber.StatusNotFound).JSON(models.Response{
		Success: false,
		Error:   "History scan not found",
	})
}

// CreateScan godoc
// @Summary Create a new scan record
// @Description Creates a new scan record with machine name and barcode
// @Tags history
// @Accept application/json
// @Produce application/json
// @Param request body models.ScanRequest true "Scan request"
// @Success 201 {object} models.Response
// @Failure 400 {object} models.Response
// @Router /api/history [post]
// CreateScan creates a new scan record
func CreateScan(c *fiber.Ctx) error {
	var req models.ScanRequest

	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(models.Response{
			Success: false,
			Error:   "Invalid request body",
		})
	}

	// Validate request
	if req.Machine == "" {
		return c.Status(fiber.StatusBadRequest).JSON(models.Response{
			Success: false,
			Error:   "Machine name is required",
		})
	}

	// Simulate barcode validation
	status := "success"
	errorMsg := ""

	// 30% chance of failure (for demo purposes)
	if req.Barcode == "" || len(req.Barcode) < 5 {
		status = "failed"
		errorMsg = "(ไม่สามารถอ่านบาร์โค้ดได้)"
	}

	// Create new scan record
	now := time.Now()
	thaiYear := now.Year() + 543
	dateStr := fmt.Sprintf("%02d/%02d/%d %02d.%02d",
		now.Day(), now.Month(), thaiYear, now.Hour(), now.Minute())

	newScan := models.HistoryScan{
		Date:    dateStr,
		Machine: req.Machine,
		Status:  status,
		Error:   errorMsg,
	}

	// Add to data
	savedScan := data.AddHistoryScan(newScan)

	return c.Status(fiber.StatusCreated).JSON(models.Response{
		Success: true,
		Message: "Scan created successfully",
		Data:    savedScan,
	})
}

// DeleteHistoryScan godoc
// @Summary Delete a history scan record
// @Description Deletes a history scan record by ID
// @Tags history
// @Produce application/json
// @Param id path integer true "Scan ID"
// @Success 200 {object} models.Response
// @Failure 400 {object} models.Response
// @Failure 404 {object} models.Response
// @Router /api/history/{id} [delete]
// DeleteHistoryScan deletes a history scan record
func DeleteHistoryScan(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(models.Response{
			Success: false,
			Error:   "Invalid ID format",
		})
	}

	if data.DeleteHistoryScan(id) {
		return c.JSON(models.Response{
			Success: true,
			Message: "History scan deleted successfully",
		})
	}

	return c.Status(fiber.StatusNotFound).JSON(models.Response{
		Success: false,
		Error:   "History scan not found",
	})
}
