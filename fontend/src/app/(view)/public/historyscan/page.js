
import HistoryScanIndex from "@/components/public/historyscan/index";

// บอก Next.js ว่าหน้านี้ต้อง render แบบ dynamic
export const dynamic = 'force-dynamic';
export default function historyscanpage(){
    return(
        <>
        <HistoryScanIndex/>
        </>
    );
}      