import AdminNavbar from "@/components/shared/AdminNavbar"
import { Outlet } from "react-router-dom";


const AdminLayout = () => {
  return (
    <div>
      <AdminNavbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout
