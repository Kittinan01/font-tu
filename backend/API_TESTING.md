# API Testing Collection

คำสั่ง curl สำหรับทดสอบ API ทั้งหมด

## Base URL
```
http://localhost:8080
```

---

## Health Check

### ตรวจสอบสถานะเซิร์ฟเวอร์
```bash
curl http://localhost:8080/health
```

---

## History Scan

### 1. ดึงประวัติการสแกนทั้งหมด
```bash
curl http://localhost:8080/api/history-scan
```

### 2. ดึงประวัติการสแกนตาม ID
```bash
curl http://localhost:8080/api/history-scan/1
```

### 3. ลบประวัติการสแกน
```bash
curl -X DELETE http://localhost:8080/api/history-scan/1
```

### 4. สร้างการสแกนใหม่
```bash
curl -X POST http://localhost:8080/api/scan \
  -H "Content-Type: application/json" \
  -d '{
    "machine": "Scan01",
    "barcode": "ABC12345678"
  }'
```

### 5. สร้างการสแกนที่ล้มเหลว (barcode สั้นเกินไป)
```bash
curl -X POST http://localhost:8080/api/scan \
  -H "Content-Type: application/json" \
  -d '{
    "machine": "Scan02",
    "barcode": "AB"
  }'
```

---

## Search

### 1. ค้นหาเอกสารทั้งหมด
```bash
curl http://localhost:8080/api/search
```

### 2. ค้นหาด้วย keyword
```bash
curl "http://localhost:8080/api/search?q=ใบสั่งซื้อ"
```

### 3. ค้นหาในเอกสาร
```bash
curl "http://localhost:8080/api/search?q=POO&document=true"
```

### 4. ค้นหาในแท็ก
```bash
curl "http://localhost:8080/api/search?q=สถานะ&tag=true"
```

### 5. ค้นหาในเนื้อหา
```bash
curl "http://localhost:8080/api/search?q=จัดซื้อ&content=true"
```

### 6. ค้นหาหลายฟิลด์
```bash
curl "http://localhost:8080/api/search?q=สั่งซื้อ&document=true&tag=true"
```

### 7. ดึงเอกสารตาม Doc No
```bash
curl http://localhost:8080/api/search/POO25100234
```

---

## Folders

### 1. ดึง Folder Tree ทั้งหมด
```bash
curl http://localhost:8080/api/folders
```

### 2. ดึง Folder ตาม ID
```bash
curl http://localhost:8080/api/folders/1
```

### 3. ดึง Subfolder
```bash
curl http://localhost:8080/api/folders/1-1
```

---

## Dashboard

### 1. ดึงสรุปสถิติหลัก
```bash
curl http://localhost:8080/api/dashboard/summary
```

### 2. ดึงสถิติแบบละเอียด
```bash
curl http://localhost:8080/api/dashboard/stats
```

---

## Upload

### 1. อัปโหลดไฟล์เดี่ยว
```bash
curl -X POST http://localhost:8080/api/upload \
  -F "file=@/path/to/document.pdf"
```

### 2. อัปโหลดไฟล์พร้อม Folder ID
```bash
curl -X POST http://localhost:8080/api/upload \
  -F "file=@/path/to/document.pdf" \
  -F "folderId=1-1"
```

### 3. อัปโหลดหลายไฟล์
```bash
curl -X POST http://localhost:8080/api/upload/multiple \
  -F "files=@/path/to/file1.pdf" \
  -F "files=@/path/to/file2.pdf" \
  -F "folderId=1-2"
```

### 4. ลบไฟล์
```bash
curl -X DELETE http://localhost:8080/api/upload/1234567890_document.pdf
```

### 5. ดาวน์โหลดไฟล์
```bash
curl http://localhost:8080/uploads/1234567890_document.pdf -o downloaded.pdf
```

---

## Advanced Examples

### 1. ค้นหาและนับจำนวนผลลัพธ์
```bash
curl -s http://localhost:8080/api/search?q=ใบสั่งซื้อ | jq '.data | length'
```

### 2. แสดงเฉพาะชื่อเอกสาร
```bash
curl -s http://localhost:8080/api/search | jq '.data[].docName'
```

### 3. ดึงสถิติจำนวนการสแกน
```bash
curl -s http://localhost:8080/api/history-scan | jq '.data | length'
```

### 4. นับจำนวนการสแกนที่สำเร็จ
```bash
curl -s http://localhost:8080/api/history-scan | jq '[.data[] | select(.status == "success")] | length'
```

### 5. นับจำนวนการสแกนที่ล้มเหลว
```bash
curl -s http://localhost:8080/api/history-scan | jq '[.data[] | select(.status == "failed")] | length'
```

---

## Testing with Different Tools

### HTTPie
```bash
# Install: brew install httpie (Mac) or apt install httpie (Ubuntu)

# GET request
http GET localhost:8080/api/search

# POST request
http POST localhost:8080/api/scan machine=Scan01 barcode=ABC123
```

### Postman
1. Import collection
2. Set base URL: `http://localhost:8080`
3. Test endpoints

### VS Code REST Client
```http
### Health Check
GET http://localhost:8080/health

### Get History Scan
GET http://localhost:8080/api/history-scan

### Create Scan
POST http://localhost:8080/api/scan
Content-Type: application/json

{
  "machine": "Scan01",
  "barcode": "ABC12345678"
}

### Search
GET http://localhost:8080/api/search?q=ใบสั่งซื้อ
```

---

## Notes

- Replace `/path/to/file.pdf` with actual file path
- For Windows, use `curl.exe` or PowerShell
- Add `-v` flag for verbose output
- Add `-s` flag for silent mode
- Use `jq` for JSON formatting (install: `brew install jq`)