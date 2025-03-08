import { ResponseProps } from "./constant";

export interface IVehicle {
    id?: string;
    name: string;
    model: string;
    numberPlate: string;
    vehicleType: string;
    vehicleColor: string;
    vehicleStatus: string;
}

export interface VehicleContextType {
    createVehicle: (vehicle: IVehicle) =>  Promise<ResponseProps<IVehicle>>;
    getVehicles: () => Promise<IVehicle[]>;
    getAvailableVehicles: () => Promise<IVehicle[]>;
}

