import { VehicleContextType } from "@/types/vehicle";
import { createContext } from "react";

export const VehicleContext = createContext<VehicleContextType | null>(null);