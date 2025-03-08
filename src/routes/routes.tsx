import AdminLayout from "@/layout/AdminLayout";
import DriverLayout from "@/layout/DriverLayout";
import MainLayout from "@/layout/MainLayout";
import ManagerLayout from "@/layout/ManagerLayout";
import RootLayout from "@/layout/RootLayout";
import Login from "@/pages/admin/Login";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes";


const routes = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: "/",
            element: <Login />,
          },
          {
            element: <ProtectedRoute allowedRoles={["ADMIN"]} />,
            children: [
              {
                path: "/admin",
                element: <AdminLayout />,
              },
            ],
          },
          {
            element: <ProtectedRoute allowedRoles={["MANAGER"]} />,
            children: [
              {
                path: "/manager",
                element: <ManagerLayout />,
              },
            ],
          },
          {
            element: <ProtectedRoute allowedRoles={["DRIVER"]} />,
            children: [
              {
                path: "/driver",
                element: <DriverLayout />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default routes;
