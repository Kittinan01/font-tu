package config

import (
	"os"
	"strings"
)

type Config struct {
	ServerAddress string
	AllowOrigins  []string
	DatabaseURL   string
	UploadDir     string
	LogDir        string
}

func LoadConfig() *Config {
	return &Config{
		// ดึงค่าที่อยู่เซิร์ฟเวอร์จากตัวแปรสภาพแวดล้อม หรือใช้ค่าเริ่มต้น ":8080"
		ServerAddress: getEnv("SERVER_ADDRESS", ":8080"),
	   // แยกค่า ALLOW_ORIGINS เป็นสตริงหลายค่า
		AllowOrigins: func() []string {
			raw := getEnv("ALLOW_ORIGINS", "http://localhost:3000,http://172.31.61.103:3000,http://172.18.0.2:3000")
			parts := strings.Split(raw, ",")
			for i := range parts {
				parts[i] = strings.TrimSpace(parts[i])
			}
			return parts
		}(),
		//DatabaseURL: getEnv("DATABASE_URL", ""), // ตัวแปรสภาพแวดล้อมสำหรับ URL ฐานข้อมูล
		UploadDir:   getEnv("UPLOAD_DIR", "./uploads"),
		//LogDir:      getEnv("LOG_DIR", "./logs"),
	}
}

func getEnv(key, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}
	return value
}
