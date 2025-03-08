import { BookingContextType } from "@/types/booking";
import { createContext } from "react";


export const BookingContext = createContext<BookingContextType | null>(null);