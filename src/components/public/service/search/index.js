export const  getsearchData = async () => {
    return new Promise((resolve) => {   
         const initialData =[
      {
        id: 1,
        docNo: "POO25100234",
        docName: "ใบสั่งซื้อ - จ้างเหมา เช่าบริการ",
        fileType: "PDF",
        owner: "Apichaya Thongma",
        lastUpdate: "2025-11-03 15:37:10",
        tag: "วันหมดอายุเอกสาร, สถานะ",
        description:
          "งานที่นำเสนอของฝ่ายจัดซื้อการแพทย์ ธรรมศาสตร์และขออนุมัติ",
      },
      {
        id: 2,
        docNo: "POH25110001",
        docName: "ใบสั่งซื้อ - ยา",
        fileType: "PDF",
        owner: "Pasri teeya",
        lastUpdate: "2025-11-03 15:38:00",
        tag: "วันหมดอายุเอกสาร, สถานะ",
        description:
          "เอกสารสั่งซื้อยาทั้งในระบบและนอกระบบ รวมราคา และรายละเอียด",
      },
      {
        id: 3,
        docNo: "POS25100012",
        docName: "ใบสั่งซื้อ - วัสดุสำนักงานและวัสดุอื่นๆ",
        fileType: "PDF",
        owner: "Apichaya Thongma",
        lastUpdate: "2025-11-03 14:18:11",
        tag: "วันหมดอายุเอกสาร, สถานะ",
        description:
          "เอกสารสั่งซื้อวัสดุสำนักงานและวัสดุที่ต้องใช้ในงาน โดยระบุรายการ ราคา",
      },
      {
        id: 4,
        docNo: "INV25100456",
        docName: "ใบแจ้งหนี้",
        fileType: "PDF",
        owner: "Somchai Jaidee",
        lastUpdate: "2025-11-02 11:20:00",
        tag: "การเงิน, รอชำระ",
        description: "ใบแจ้งหนี้สำหรับบริการที่ปรึกษาเดือนตุลาคม",
      },
      {
        id: 5,
        docNo: "QUO25100789",
        docName: "ใบเสนอราคา",
        fileType: "PDF",
        owner: "Suda Dee",
        lastUpdate: "2025-11-01 16:45:30",
        tag: "การขาย, ลูกค้าใหม่",
        description: "ใบเสนอราคาสำหรับโครงการพัฒนาระบบใหม่",
      },
      {
        id: 6,
        docNo: "REC25100112",
        docName: "ใบเสร็จรับเงิน",
        fileType: "PDF",
        owner: "Pasri teeya",
        lastUpdate: "2025-10-31 10:05:15",
        tag: "การเงิน, ชำระแล้ว",
        description: "ใบเสร็จรับเงินค่าบริการรายปี",
      },
      {
        id: 7,
        docNo: "MEMO25100055",
        docName: "บันทึกข้อความภายใน",
        fileType: "DOCX",
        owner: "Apichaya Thongma",
        lastUpdate: "2025-10-30 09:00:00",
        tag: "ภายใน, ประกาศ",
        description: "ประกาศเรื่องวันหยุดประจำปี 2569",
      },
      {
        id: 8,
        docNo: "CON25090001",
        docName: "สัญญาจ้างงาน",
        fileType: "PDF",
        owner: "ฝ่ายบุคคล",
        lastUpdate: "2025-10-29 17:30:45",
        tag: "HR, สัญญา",
        description: "สัญญาจ้างงานสำหรับพนักงานใหม่",
      },
      {
        id: 9,
        docNo: "REP25090023",
        docName: "รายงานการประชุม",
        fileType: "PDF",
        owner: "Suda Dee",
        lastUpdate: "2025-10-28 14:00:00",
        tag: "ประชุม, รายงาน",
        description: "สรุปการประชุมทีมประจำสัปดาห์",
      },
      {
        id: 10,
        docNo: "POO25090199",
        docName: "ใบสั่งซื้อ - อุปกรณ์คอมพิวเตอร์",
        fileType: "PDF",
        owner: "Somchai Jaidee",
        lastUpdate: "2025-10-27 11:11:11",
        tag: "จัดซื้อ, IT",
        description: "สั่งซื้อคอมพิวเตอร์และอุปกรณ์เสริมสำหรับแผนกใหม่",
      },
         ];

        // --- Generate more data to reach 100 items ---
        const generatedData = [];
        const owners = ["Apichaya Thongma", "Pasri teeya", "Somchai Jaidee", "Suda Dee", "ฝ่ายบุคคล", "การเงิน", "จัดซื้อ"];
        const fileTypes = ["PDF", "DOCX", "XLSX", "PNG", "JPG"];
        const docTypes = ["ใบสั่งซื้อ", "ใบแจ้งหนี้", "ใบเสนอราคา", "บันทึกข้อความ", "สัญญา", "รายงาน"];
        const subjects = ["วัสดุสำนักงาน", "อุปกรณ์ IT", "การจ้างงาน", "การประชุม", "โครงการพิเศษ", "การอบรม"];

        for (let i = initialData.length + 1; i <= 100; i++) {
            const docType = docTypes[i % docTypes.length];
            const subject = subjects[i % subjects.length];
            const owner = owners[i % owners.length];
            const fileType = fileTypes[i % fileTypes.length];
            const randomNum = Math.floor(1000 + Math.random() * 9000);
            const date = new Date(Date.now() - Math.floor(Math.random() * 1000 * 3600 * 24 * 30));

            generatedData.push({
                id: i,
                docNo: `DOC${25110000 + i}`,
                docName: `${docType} - ${subject} #${randomNum}`,
                fileType: fileType,
                owner: owner,
                lastUpdate: date.toISOString().slice(0, 19).replace('T', ' '),
                tag: `${docType}, ${owner}`,
                description: `เอกสารสำหรับ ${docType} เรื่อง ${subject} สร้างโดย ${owner}`,
            });
        }

        const searchdata = [...initialData, ...generatedData];
        // --- End of data generation ---

          setTimeout(() => {
            resolve(searchdata);
        }, 100); //
    });

}