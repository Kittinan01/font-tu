package handlers

import (
	"backend/data"
	"backend/models"
	"strings"

	"github.com/gofiber/fiber/v2"
)

// GetSearch godoc
// @Summary Search documents
// @Description Search through documents with optional filters
// @Tags search
// @Produce application/json
// @Param q query string false "Search query"
// @Param document query boolean false "Filter by document name"
// @Param tag query boolean false "Filter by tag"
// @Param content query boolean false "Filter by content"
// @Success 200 {object} models.Response
// @Router /api/search [get]
// GetSearch returns filtered search results
func GetSearch(c *fiber.Ctx) error {
	query := strings.ToLower(c.Query("q", ""))
	documentFilter := c.Query("document", "") == "true"
	tagFilter := c.Query("tag", "") == "true"
	contentFilter := c.Query("content", "") == "true"

	// If no query, return all documents
	if query == "" {
		return c.JSON(models.Response{
			Success: true,
			Data:    data.SearchDocuments,
		})
	}

	// Filter documents
	var results []models.SearchDocument
	noFiltersSelected := !documentFilter && !tagFilter && !contentFilter

	for _, doc := range data.SearchDocuments {
		match := false

		// Check document fields
		if documentFilter || noFiltersSelected {
			if containsIgnoreCase(doc.DocNo, query) ||
				containsIgnoreCase(doc.DocName, query) ||
				containsIgnoreCase(doc.Owner, query) ||
				containsIgnoreCase(doc.FileType, query) {
				match = true
			}
		}

		// Check tag
		if tagFilter || noFiltersSelected {
			if containsIgnoreCase(doc.Tag, query) {
				match = true
			}
		}

		// Check content/description
		if contentFilter || noFiltersSelected {
			if containsIgnoreCase(doc.Description, query) {
				match = true
			}
		}

		if match {
			results = append(results, doc)
		}
	}

	return c.JSON(models.Response{
		Success: true,
		Data:    results,
		Meta: fiber.Map{
			"total": len(results),
			"query": query,
			"filters": fiber.Map{
				"document": documentFilter,
				"tag":      tagFilter,
				"content":  contentFilter,
			},
		},
	})
}

// GetSearchByID godoc
// @Summary Get a specific document
// @Description Returns a specific document by document number
// @Tags search
// @Produce application/json
// @Param id path string true "Document number"
// @Success 200 {object} models.Response
// @Failure 404 {object} models.Response
// @Router /api/search/{id} [get]
// GetSearchByID returns a specific document
func GetSearchByID(c *fiber.Ctx) error {
	id := c.Params("id")

	for _, doc := range data.SearchDocuments {
		if doc.DocNo == id {
			return c.JSON(models.Response{
				Success: true,
				Data:    doc,
			})
		}
	}

	return c.Status(fiber.StatusNotFound).JSON(models.Response{
		Success: false,
		Error:   "Document not found",
	})
}

// Helper function for case-insensitive string matching
func containsIgnoreCase(str, substr string) bool {
	return strings.Contains(strings.ToLower(str), strings.ToLower(substr))
}
