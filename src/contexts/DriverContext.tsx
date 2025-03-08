import { DriverContextType } from "@/types/driver";
import { createContext } from "react";

export const DriverContext = createContext<DriverContextType | null>(null);