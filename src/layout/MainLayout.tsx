import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar"
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom"


const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container py-8 flex-grow">
        <Toaster />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout
