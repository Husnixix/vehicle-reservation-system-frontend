import { API_URL, ResponseProps } from "@/types/constant";
import { IVehicle } from "@/types/vehicle";


// const API_URL = "http://localhost:8080/MegaCabService/vehicles";

export const VehicleService = {
    getVehicles: async (): Promise<IVehicle[]> => {
      try {
        const response = await fetch(`${API_URL}/vehicles`);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || "Failed to get vehicles");
        }
        const data = await response.json();
        return data.data as IVehicle[];
      } catch (error) {
        console.error("VehicleService getVehicles error:", error);
        throw error;
      }
    },

    addVehicle: async (vehicle: IVehicle): Promise<ResponseProps<IVehicle>> => {
        try {

            const formData = new URLSearchParams();
            formData.append("name", vehicle.name);
            formData.append("model", vehicle.model);
            formData.append("numberPlate", vehicle.numberPlate);
            formData.append("vehicleType", vehicle.vehicleType);
            formData.append("vehicleColor", vehicle.vehicleColor);
            formData.append("vehicleStatus", vehicle.vehicleStatus);

        const response = await fetch(`${API_URL}/vehicles/create`, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: formData.toString(),
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || "Failed to add vehicle");
        }
        const data = await response.json();
        return data;
        
        } catch (error) {
        console.error("VehicleService addVehicle error:", error);
        throw error;
        }
        
    },

    getAvailableVehicles: async (): Promise<IVehicle[]> => {
        try {
            const response = await fetch(`${API_URL}/driver/vehicles`);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Failed to get available vehicles");
            }
            const data = await response.json();
            return data.data as IVehicle[];
        } catch (error) {
            console.error("VehicleService getAvailableVehicles error:", error);
            throw error;
        }
    },

    
};