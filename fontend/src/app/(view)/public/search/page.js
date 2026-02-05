
import '@/app/style/public.css';
import SearchIndex from '@/components/public/search';
// บอก Next.js ว่าหน้านี้ต้อง render แบบ dynamic
export const dynamic = 'force-dynamic';
export default function serchPage() {
  return (
    <>
      <SearchIndex/>
  
    </>
  );
}