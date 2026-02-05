// @title Document Management System API
// @version 1.0
// @description Simple Document Management System API
// @host localhost:8080
// @BasePath /
package main

import (
	"backend/config"
	"backend/logger"
	"backend/routes"
	"log"
	"strings"

	"github.com/gofiber/adaptor/v2"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	fiberlogger "github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
	httpSwagger "github.com/swaggo/http-swagger"

	_ "backend/docs"
)

func main() {
	// Load configuration
	cfg := config.LoadConfig()

	// Initialize logger with file output
	if err := logger.InitLogger(cfg.LogDir); err != nil {
		log.Fatalf("Failed to initialize logger: %v", err)
	}
	defer logger.CloseLogger()

	// Create Fiber app
	app := fiber.New(fiber.Config{
		AppName:      "Document Management System API v1.0",
		ErrorHandler: customErrorHandler,
	})

	// Middleware
	app.Use(recover.New()) // Recover from panics
	app.Use(fiberlogger.New(fiberlogger.Config{
		Format: "[${time}] ${status} - ${method} ${path} ${latency}\n",
		Output: logger.GetWriter(),
	}))
	app.Use(cors.New(cors.Config{
		AllowOrigins:     strings.Join(cfg.AllowOrigins, ","),           // Support multiple origins
		AllowHeaders:     "Origin, Content-Type, Accept, Authorization", // Added Authorization header
		AllowMethods:     "GET, POST, PUT, DELETE, OPTIONS, PATCH",      // Added PATCH method
		AllowCredentials: true,                                          // Enable cookies
		MaxAge:           3600,                                          // 1 hour
	}))

	// Health check
	app.Get("/health", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"status":  "ok",
			"message": "Server is running",
			"version": "1.0.0",
		})
	})

	// Setup all routes
	routes.SetupRoutes(app)

	// Swagger UI
	app.Get("/swagger/*", adaptor.HTTPHandler(httpSwagger.Handler()))

	// Start server
	logger.InfoLogger.Printf("🚀 Server started on %s\n", cfg.ServerAddress)
	logger.InfoLogger.Println("📡 Available endpoints:")
	logger.InfoLogger.Println("   GET    /health")
	logger.InfoLogger.Println("   GET    /api/history-scan")
	logger.InfoLogger.Println("   GET    /api/search?q=keyword")
	logger.InfoLogger.Println("   GET    /api/folders")
	logger.InfoLogger.Println("   GET    /api/dashboard/summary")
	logger.InfoLogger.Println("   POST   /api/upload")
	logger.InfoLogger.Println("   POST   /api/scan")
	logger.InfoLogger.Println("   DELETE /api/history-scan/:id")

	if err := app.Listen(cfg.ServerAddress); err != nil {
		logger.ErrorLogger.Fatal(err)
	}
}

// Custom error handler
func customErrorHandler(c *fiber.Ctx, err error) error {
	code := fiber.StatusInternalServerError
	message := "Internal Server Error"

	if e, ok := err.(*fiber.Error); ok {
		code = e.Code
		message = e.Message
	}

	return c.Status(code).JSON(fiber.Map{
		"success": false,
		"error":   message,
	})
}
