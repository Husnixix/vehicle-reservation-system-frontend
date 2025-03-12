import { IBookingInfo } from "@/types/booking";
import { API_URL, ResponseProps } from "@/types/constant";
import { IDriver } from "@/types/driver";


export const DriverService = {
    getAvailableDrivers: async (): Promise<IDriver[]> => {
        try {
            const response = await fetch(`${API_URL}/driver/available`);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Failed to get drivers");
            }
            const data = await response.json();
            return data.data as IDriver[];
        } catch (error) {
            console.error("DriverService getDrivers error:", error);
            throw error;
        }
    },

    acceptBooking: async (bookingId: number): Promise<Response> => {
        try {
            const response = await fetch(`${API_URL}/bookings/accept?bookingid=${bookingId}`,
                {
                    method: "PUT",
                }
            );
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Failed to accept bookings");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("DriverService booking accept error:", error);
            throw error;
        }
    },

    completeBooking: async (bookingId: number, driverId: number, vehicleId: number): Promise<Response> => {
        try {
            const response = await fetch(`${API_URL}/driver/completebooking?bookingid=${bookingId}&&driverid=${driverId}&&vehicleid=${vehicleId}`,
                {
                    method: "PUT",
                }
            );
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Failed to compelete booking");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("DriverService booking complete error:", error);
            throw error;
        }
    },

    cancelBooking: async (bookingId: number, driverId: number, vehicleId: number): Promise<Response> => {
        try {
            const response = await fetch(`${API_URL}/driver/cancelbooking?bookingid=${bookingId}&&driverid=${driverId}&&vehicleid=${vehicleId}`,
                {
                    method: "PUT",
                }
            );
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Failed to cancel boooking");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("DriverService cancel booking error:", error);
            throw error;
        }
    },

    getAssignedBookings: async (driverId: number): Promise<ResponseProps<IBookingInfo[]>> => {
        try {
            const response = await fetch(`${API_URL}/driver/assignedbookings?driverid=${driverId}`);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Failed to fetch assigned bookings");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("DriverService getAssignedBookings error:", error);
            throw error;
        }
    },



}