package logger

import (
	"io"
	"log"
	"os"
	"path/filepath"
	"time"
)

var (
	InfoLogger   *log.Logger
	ErrorLogger  *log.Logger
	DebugLogger  *log.Logger
	logFile      *os.File
	MultiWriter  io.Writer
)

// InitLogger initializes the logger with file output
func InitLogger(logDir string) error {
	// Create log directory if it doesn't exist
	if err := os.MkdirAll(logDir, 0755); err != nil {
		return err
	}

	// สร้างชื่อไฟล์ล็อกตามวันที่
	timestamp := time.Now().Format("2006-01-02")
	logFileName := filepath.Join(logDir, "app-"+timestamp+".log")

	// Open or create log file
	var err error
	logFile, err = os.OpenFile(logFileName, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		return err
	}

	// Create multi-writer to write to both file and console
	MultiWriter = io.MultiWriter(os.Stdout, logFile)

	// Initialize loggers
	InfoLogger = log.New(MultiWriter, "[INFO] ", log.LstdFlags)
	ErrorLogger = log.New(MultiWriter, "[ERROR] ", log.LstdFlags)
	DebugLogger = log.New(MultiWriter, "[DEBUG] ", log.LstdFlags)

	InfoLogger.Println("Logger initialized successfully")
	return nil
}

// GetWriter returns the multi-writer for use in middleware
func GetWriter() io.Writer {
	return MultiWriter
}

// CloseLogger closes the log file
func CloseLogger() {
	if logFile != nil {
		logFile.Close()
	}
}
		

