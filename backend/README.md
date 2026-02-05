# Document Management System - Backend API

ระบบจัดการเอกสาร Backend API สร้างด้วย Go + Fiber Framework

## 🚀 Features

- ✅ RESTful API
- ✅ CORS Support
- ✅ File Upload/Download
- ✅ Search & Filter
- ✅ Folder Tree Structure
- ✅ Dashboard Statistics
- ✅ History Scan Management
- ✅ Error Handling & Logging
- ✅ Mock Data 

## 📋 Prerequisites

- Go 1.21 หรือสูงกว่า
- Git

## 🛠️ Installation

### 1. Clone หรือสร้างโปรเจค

```bash
cd backend
```

### 2. ติดตั้ง Dependencies

```bash
go mod download
```

### 3. สร้าง Environment File (Optional)

```bash
cp .env.example .env
```

แก้ไข `.env` ตามต้องการ:
```env
SERVER_ADDRESS=:8080
ALLOW_ORIGINS=*
UPLOAD_DIR=./uploads
```

### 4. รันโปรเจค

```bash
go run main.go
```

หรือ build แล้วรัน:
```bash
go build -o server
./server
```

Server จะรันที่: `http://localhost:8080`

## 📡 API Endpoints

### Health Check
```
GET /health
```

### History Scan
```
GET    /api/history-scan           - ดึงประวัติการสแกนทั้งหมด
GET    /api/history-scan/:id       - ดึงประวัติการสแกนตาม ID
DELETE /api/history-scan/:id       - ลบประวัติการสแกน
POST   /api/scan                   - สร้างการสแกนใหม่
```

### Search
```
GET /api/search                    - ค้นหาเอกสาร
GET /api/search/:id                - ดึงเอกสารตาม ID

Query Parameters:
- q: คำค้นหา
- document: true/false (ค้นหาในฟิลด์เอกสาร)
- tag: true/false (ค้นหาในแท็ก)
- content: true/false (ค้นหาในเนื้อหา)
```

### Folders
```
GET /api/folders                   - ดึง Folder Tree ทั้งหมด
GET /api/folders/:id               - ดึง Folder ตาม ID
```

### Dashboard
```
GET /api/dashboard/summary         - สรุปสถิติหลัก
GET /api/dashboard/stats           - สถิติแบบละเอียด
```

### Upload
```
POST   /api/upload                 - อัปโหลดไฟล์เดี่ยว
POST   /api/upload/multiple        - อัปโหลดหลายไฟล์
DELETE /api/upload/:filename       - ลบไฟล์
```

### Static Files
```
GET /uploads/:filename             - ดาวน์โหลดไฟล์ที่อัปโหลด
```

## 📝 ตัวอย่างการใช้งาน

### 1. ดึงประวัติการสแกน

```bash
curl http://localhost:8080/api/history-scan
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "date": "25/11/2568 12.24",
      "machine": "Scan01",
      "status": "success",
      "error": ""
    }
  ]
}
```

### 2. ค้นหาเอกสาร

```bash
curl "http://localhost:8080/api/search?q=ใบสั่งซื้อ"
```

### 3. สร้างการสแกนใหม่

```bash
curl -X POST http://localhost:8080/api/scan \
  -H "Content-Type: application/json" \
  -d '{
    "machine": "Scan01",
    "barcode": "ABC12345"
  }'
```

### 4. อัปโหลดไฟล์

```bash
curl -X POST http://localhost:8080/api/upload \
  -F "file=@document.pdf" \
  -F "folderId=1-1"
```

### 5. ดึงสถิติ Dashboard

```bash
curl http://localhost:8080/api/dashboard/summary
```

## 🏗️ โครงสร้างโปรเจค

```
backend/
├── main.go                 # Entry point
├── config/
│   └── config.go          # Configuration
├── models/
│   └── models.go          # Data models
├── data/
│   └── mockdata.go        # Mock data
├── handlers/
│   ├── history.go         # History handlers
│   ├── search.go          # Search handlers
│   ├── folders.go         # Folder handlers
│   ├── dashboard.go       # Dashboard handlers
│   └── upload.go          # Upload handlers
├── routes/
│   └── routes.go          # Route configuration
├── uploads/               # Uploaded files
├── .env.example           # Environment template
├── .gitignore
├── go.mod
└── README.md
```

## 🔧 Development

### รันแบบ Hot Reload (Optional)

ติดตั้ง Air:
```bash
go install github.com/cosmtrek/air@latest
```

รัน:
```bash
air
```

### Testing

```bash
# Test all packages
go test ./...

# Test with coverage
go test -cover ./...

# Test specific package
go test ./handlers
```

## 📦 Build for Production

### Build Binary

```bash
# Build for current OS
go build -o server main.go

# Build for Linux
GOOS=linux GOARCH=amd64 go build -o server-linux main.go

# Build for Windows
GOOS=windows GOARCH=amd64 go build -o server.exe main.go
```

### Run Production Server

```bash
./server
```

## 🔐 Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `SERVER_ADDRESS` | `:8080` | Server port |
| `ALLOW_ORIGINS` | `*` | CORS allowed origins |
| `UPLOAD_DIR` | `./uploads` | Upload directory |
| `DATABASE_URL` | `""` | Database connection (future) |


## 🐛 Troubleshooting 

### Port already in use
```bash
# หา process ที่ใช้ port 8080
lsof -i :8080

# Kill process
kill -9 <PID>
```

### CORS Error
ตรวจสอบ `ALLOW_ORIGINS` ใน config

### Upload Error
ตรวจสอบสิทธิ์ folder `./uploads`
```bash
chmod 755 uploads
```

## 📚 Dependencies

- [Fiber](https://gofiber.io/) - Web Framework
- [CORS Middleware](https://docs.gofiber.io/api/middleware/cors)
- [Logger Middleware](https://docs.gofiber.io/api/middleware/logger)

## 🤝 Contributing

1. Fork the project
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request


## 🙏 Acknowledgments
- Fiber Framework Team
- Go Community