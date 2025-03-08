import { DriverContext } from "@/contexts/DriverContext";
import { DriverService } from "@/services/DriverService";
import { IBookingInfo } from "@/types/booking";
import { ResponseProps } from "@/types/constant";
import { IDriver, DriverContextType } from "@/types/driver";
import { ReactNode, useState } from "react";

interface DriverProviderProps {
    children: ReactNode;
}

const DriverProvider: React.FC<DriverProviderProps> = ({ children }) => {
    
    const [drivers, setDrivers] = useState<IDriver[] | null>(null);

    const getAvailableDrivers = async (): Promise<IDriver[]> => {
        const driverData = await DriverService.getAvailableDrivers();
        setDrivers(driverData);
        return driverData;
    };

    const acceptBooking = async (driverId: number): Promise<Response> => {
    const response = await DriverService.acceptBooking(driverId);
        return response;
    };

    const completeBooking = async (bookingId: number, driverId: number, vehicleId: number): Promise<Response> => {
    const response = await DriverService.completeBooking(bookingId, driverId, vehicleId);  
        return response;
    };

    const cancelBooking = async (bookingId: number, driverId: number, vehicleId: number): Promise<Response> => {
        const response = await DriverService.cancelBooking(bookingId, driverId, vehicleId);      
        return response;
    };

    const getAssignedBookings = async (driverId: number): Promise<ResponseProps<IBookingInfo[]>> => {
      const response = await DriverService.getAssignedBookings(driverId);
      return response;
    };

    const value: DriverContextType = {
      drivers,
      getAvailableDrivers,
      acceptBooking,
      completeBooking,
      cancelBooking,
      getAssignedBookings,
    };
        
    return <DriverContext.Provider value={value}>{children}</DriverContext.Provider>;
}

export { DriverProvider };