import { VehicleContext } from "@/contexts/VehicleContext";
import { VehicleService } from "@/services/VehicleService";
import { ResponseProps } from "@/types/constant";
import { IVehicle, VehicleContextType } from "@/types/vehicle";
import { ReactNode } from "react";

interface VehicleProviderProps {
    children: ReactNode;
}

const VehicleProvider: React.FC<VehicleProviderProps> = ({ children }) => {

    const createVehicle = async (vehicle: IVehicle): Promise<ResponseProps<IVehicle>>=> {
        const response = await VehicleService.addVehicle(vehicle);      
        return response;
    };

    const getVehicles = async (): Promise<IVehicle[]> => {
        const response = await VehicleService.getVehicles();      
        return response;
    };

    const getAvailableVehicles = async (): Promise<IVehicle[]> => {
        const response = await VehicleService.getAvailableVehicles();
        return response;
    }

    const value: VehicleContextType = {createVehicle, getVehicles, getAvailableVehicles };   
    return <VehicleContext.Provider value={value}>{children}</VehicleContext.Provider>;

};

export { VehicleProvider };