package handlers

import (
	"backend/models"
	"fmt"
	"os"
	"path/filepath"
	"time"

	"github.com/gofiber/fiber/v2"
)

// UploadFile godoc
// @Summary Upload a single file
// @Description Uploads a file and returns its metadata
// @Tags upload
// @Accept multipart/form-data
// @Produce application/json
// @Param file formData file true "File to upload"
// @Param folderId formData string false "Optional folder ID"
// @Success 200 {object} models.Response
// @Failure 400 {object} models.Response
// @Failure 500 {object} models.Response
// @Router /api/upload [post]
// UploadFile handles file upload
func UploadFile(c *fiber.Ctx) error {
	// Get the file from form
	file, err := c.FormFile("file")
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(models.Response{
			Success: false,
			Error:   "ไม่พบไฟล์ที่อัปโหลด",
		})
	}

	// Get folder ID (optional)
	folderID := c.FormValue("folderId", "")

	// Create uploads directory if it doesn't exist
	uploadDir := "./uploads"
	if err := os.MkdirAll(uploadDir, 0755); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(models.Response{
			Success: false,
			Error:   "ไม่สามารถสร้างโฟลเดอร์สำหรับอัปโหลดได้",
		})
	}

	// Generate unique filename - แก้ไข: ใช้ time.Now().Unix() แทน fiber.Now().Unix()
	filename := fmt.Sprintf("%d_%s", time.Now().Unix(), file.Filename)
	filePath := filepath.Join(uploadDir, filename)

	// Save file
	if err := c.SaveFile(file, filePath); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(models.Response{
			Success: false,
			Error:   "ไม่สามารถบันทึกไฟล์ได้",
		})
	}

	return c.JSON(models.Response{
		Success: true,
		Message: "อัปโหลดไฟล์สำเร็จ",
		Data: fiber.Map{
			"filename":   file.Filename,
			"size":       file.Size,
			"folderId":   folderID,
			"uploadedAt": time.Now().Format("2006-01-02 15:04:05"), // แก้ไข
			"path":       filePath,
		},
	})
}

// UploadMultipleFiles godoc
// @Summary Upload multiple files
// @Description Uploads multiple files in one request
// @Tags upload
// @Accept multipart/form-data
// @Produce application/json
// @Param files formData file true "Multiple files"
// @Param folderId formData string false "Optional folder ID"
// @Success 200 {object} models.Response
// @Failure 400 {object} models.Response
// @Failure 500 {object} models.Response
// @Router /api/upload/multiple [post]
// UploadMultipleFiles handles multiple file uploads
func UploadMultipleFiles(c *fiber.Ctx) error {
	// Parse multipart form
	form, err := c.MultipartForm()
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(models.Response{
			Success: false,
			Error:   "ไม่สามารถอ่านข้อมูล multipart form ได้",
		})
	}

	// Get files
	files := form.File["files"]
	if len(files) == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(models.Response{
			Success: false,
			Error:   "ไม่พบไฟล์ที่อัปโหลด",
		})
	}

	folderID := c.FormValue("folderId", "")

	// Create uploads directory
	uploadDir := "./uploads"
	if err := os.MkdirAll(uploadDir, 0755); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(models.Response{
			Success: false,
			Error:   "ไม่สามารถสร้างโฟลเดอร์สำหรับอัปโหลดได้",
		})
	}

	uploadedFiles := make([]fiber.Map, 0)
	failedFiles := make([]fiber.Map, 0)

	// Save each file
	for _, file := range files {
		//แสดงเวลาในชื่อไฟล์เพ
		filename := fmt.Sprintf("%d_%s", time.Now().Unix(), file.Filename)
		filePath := filepath.Join(uploadDir, filename)

		if err := c.SaveFile(file, filePath); err != nil {
			failedFiles = append(failedFiles, fiber.Map{
				"filename": file.Filename,
				"error":    "ไม่สามารถบันทึกไฟล์ได้",
			})
			continue
		}

		uploadedFiles = append(uploadedFiles, fiber.Map{
			"filename":   file.Filename,
			"size":       file.Size,
			"folderId":   folderID,
			"uploadedAt": time.Now().Format("2006-01-02 15:04:05"), // แก้ไข
			"path":       filePath,
		})
	}

	return c.JSON(models.Response{
		Success: len(failedFiles) == 0,
		Message: fmt.Sprintf("อัปโหลดสำเร็จ %d ไฟล์", len(uploadedFiles)),
		Data: fiber.Map{
			"uploaded": uploadedFiles,
			"failed":   failedFiles,
			"total":    len(files),
		},
	})
}

// DeleteFile godoc
// @Summary Delete an uploaded file
// @Description Deletes a file by filename
// @Tags upload
// @Produce application/json
// @Param filename path string true "Filename"
// @Success 200 {object} models.Response
// @Failure 400 {object} models.Response
// @Failure 404 {object} models.Response
// @Failure 500 {object} models.Response
// @Router /api/upload/{filename} [delete]
// DeleteFile deletes a file
func DeleteFile(c *fiber.Ctx) error {
	filename := c.Params("filename")
	if filename == "" {
		return c.Status(fiber.StatusBadRequest).JSON(models.Response{
			Success: false,
			Error:   "ไม่ได้ระบุชื่อไฟล์",
		})
	}

	filePath := filepath.Join("./uploads", filename)

	// Check if file exists
	if _, err := os.Stat(filePath); os.IsNotExist(err) {
		return c.Status(fiber.StatusNotFound).JSON(models.Response{
			Success: false,
			Error:   "ไม่พบไฟล์",
		})
	}

	// Delete file
	if err := os.Remove(filePath); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(models.Response{
			Success: false,
			Error:   "ไม่สามารถลบไฟล์ได้",
		})
	}

	return c.JSON(models.Response{
		Success: true,
		Message: "ลบไฟล์สำเร็จ",
	})
}
