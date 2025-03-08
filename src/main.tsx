import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./provider/AuthProvider";
import { UserProvider } from "./provider/UserProvider";
import { VehicleProvider } from "./provider/VehicleProvider";
import { BookingProvider } from "./provider/BookingProvider";
import { DriverProvider } from "./provider/DriverProvider";
import routes from "./routes/routes";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <UserProvider>
        <VehicleProvider>
          <BookingProvider>
            <DriverProvider>           
              <RouterProvider router={routes} />
            </DriverProvider>
          </BookingProvider>
        </VehicleProvider>
      </UserProvider>
    </AuthProvider>
  </StrictMode>
);
