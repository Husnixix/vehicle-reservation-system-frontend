import Navbar from "@/components/shared/Navbar"
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom"


const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="container space-y-8 ">
        <Toaster />
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout
