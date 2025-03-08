import { BookingContext } from "@/contexts/BookingContext";
import { BookingService } from "@/services/BookingService";
import { IBooking, IBookingInfo } from "@/types/booking";
import { ResponseProps } from "@/types/constant";
import { ReactNode } from "react";

interface BookingProviderProps {
    children: ReactNode;
}

const BookingProvider: React.FC<BookingProviderProps> = ({ children }) => {
    
    const createBooking = async (booking: IBooking):  Promise<ResponseProps<IBooking>> => { 
        const response = await BookingService.addBooking(booking);
        return response;
    }

    const getBookings = async (): Promise<ResponseProps<IBookingInfo[]>> => {
      const response = await BookingService.getBookings();
      return response;
    };

    const getBookingInfo = async (bookingId: number): Promise<ResponseProps<IBookingInfo>> => {
       const response = await BookingService.getBookingInfo(bookingId);
       return response;
    };

    const value = { createBooking, getBookings, getBookingInfo };

    return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};

export { BookingProvider };