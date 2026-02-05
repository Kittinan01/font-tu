package handlers

import (
	"backend/data"
	"backend/models"

	"github.com/gofiber/fiber/v2"
)

// GetFolders godoc
// @Summary Get folder tree structure
// @Description Returns the complete folder tree structure
// @Tags folders
// @Produce application/json
// @Success 200 {object} models.Response
// @Router /api/folders [get]
// GetFolders returns the folder tree structure

//ฟังก์ชันเพื่อดึงโฟลเดอร์ทั้งหมด
func GetFolders(c *fiber.Ctx) error {
	return c.JSON(models.Response{
		Success: true,
		Data:    data.FolderTree,
	})
}

// GetFolderByID godoc
// @Summary Get a specific folder
// @Description Returns a specific folder and its children by ID
// @Tags folders
// @Produce application/json
// @Param id path string true "Folder ID"
// @Success 200 {object} models.Response
// @Failure 404 {object} models.Response
// @Router /api/folders/{id} [get]
// GetFolderByID returns a specific folder and its children

//ฟังก์ชันเพื่อดึงโฟลเดอร์ตาม ID
func GetFolderByID(c *fiber.Ctx) error {
	id := c.Params("id")

	// ค้นหาโฟลเดอร์ตามลำดับชั้น
	folder := findFolderByID(data.FolderTree, id)
	if folder != nil {
		return c.JSON(models.Response{
			Success: true,
			Data:    folder,
		})
	}	
		// หากไม่พบโฟลเดอร์ ให้ส่งกลับข้อผิดพลาด 404
	return c.Status(fiber.StatusNotFound).JSON(models.Response{
		Success: false,
		Error:   "Folder not found",
	})
}

//  ฟังก์ชันช่วยเหลือเพื่อค้นหาโฟลเดอร์ตาม ID อย่างวนซ้ำ	
func findFolderByID(nodes []*models.FolderNode, id string) *models.FolderNode {
	// วนซ้ำผ่านโฟลเดอร์และตรวจสอบ ID
	for _, node := range nodes {
		if node.ID == id {
			return node
		}
		// ค้นหาในโฟลเดอร์ย่อยอย่างวนซ้ำ
		if node.Children != nil {
			if found := findFolderByID(node.Children, id); found != nil {
				return found
			}
		}
	}
	return nil
}
