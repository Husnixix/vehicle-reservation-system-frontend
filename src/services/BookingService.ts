import { IBooking, IBookingInfo } from "@/types/booking";
import { API_URL, ResponseProps } from "@/types/constant";

// const API_URL = "http://localhost:8080/MegaCabService/bookings";


export const BookingService = {
    getBookings: async (): Promise<ResponseProps<IBookingInfo[]>> => {
        try {
            const response = await fetch(`${API_URL}/bookings`);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Failed to get bookings");
            }
            const data = await response.json();
            return data
        } catch (error) {
            console.error("BookingService getBookings error:", error);
            throw error;
        }
    },

    getBookingInfo: async (bookingId: number): Promise<ResponseProps<IBookingInfo>> => {
        try {
            const response = await fetch(`${API_URL}/bookings/bookinginfo?bookingid=${bookingId}`);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Failed to get booking info");
            }
            const data = await response.json();
            return data
        } catch (error) {
            console.error("BookingService getBookinginfo error:", error);
            throw error;
        }
    },

    addBooking: async (booking: IBooking): Promise<ResponseProps<IBooking>> => {
        try {

            const formData = new URLSearchParams();
            formData.append("customerName", booking.customer.name);
            formData.append("customerPhone", booking.customer.phoneNumber.toString());
            formData.append("customerNIC", booking.customer.NIC.toString());
            formData.append("managerId", booking.managerId.toString());
            formData.append("vehicleId", booking.vehicleId.toString());
            formData.append("driverId", booking.driverId.toString());
            formData.append("pickUpLocation", booking.pickUpLocation);
            formData.append("dropOfLocation", booking.dropOfLocation);
            formData.append("rideFare", booking.rideFare.toString());

            const response = await fetch(`${API_URL}/bookings/create`, {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: formData.toString(),
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Failed to add booking");
            }
            const data = await response.json();
            return data
            
        } catch (error) {
            console.error("BookingService addBooking error:", error);
            throw error;
        }
        
    },

}