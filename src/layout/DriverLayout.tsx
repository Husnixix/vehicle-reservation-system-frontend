import DriverNavabr from "@/components/shared/DriverNavbar";
import { Outlet } from "react-router-dom";


const DriverLayout = () => {
  return (
    <div>
      <DriverNavabr />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default DriverLayout
