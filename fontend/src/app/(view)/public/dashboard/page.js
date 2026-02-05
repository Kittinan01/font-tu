// app/(view)/public/dashboard/page.js
import DashboardComponent from '@/components/public/dashboard';
// บอก Next.js ว่าหน้านี้ต้อง render แบบ dynamic
export const dynamic = 'force-dynamic';

export default function DashboardPage() {
  return (
    <>
      <DashboardComponent />
    </>
  );
}