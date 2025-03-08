import ManagerNavbar from "@/components/shared/ManagerNavbar";
import { Outlet } from "react-router-dom";

const ManagerLayout = () => {
  return (
    <div>
      <ManagerNavbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default ManagerLayout
