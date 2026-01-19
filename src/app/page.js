import DashboardComponent from "@/components/public/dashboard";
import Historyscanpage from "@/app/(view)/public/historyscan/page";
export default function Home() {
  return (
    <div>
        {/* เรียกใช้ DashboardComponent โดยตรง */}
         <DashboardComponent/>  
           {/* <Historyscanpage/>  */}
    </div>
  );
}
