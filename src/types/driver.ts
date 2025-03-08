import { IBookingInfo } from "./booking";
import { ResponseProps } from "./constant";

export interface  IDriver {
    id?: string;
    name: string;
    email: string;
    driverId: number;
    driverStatus: string;
}

export interface DriverContextType {
    drivers: IDriver[] | null;
    getAvailableDrivers: () => Promise<IDriver[]>;
    acceptBooking: (bookingId: number) => Promise<Response>;
    completeBooking: (bookingId: number, driverId: number, vehicleId: number) => Promise<Response>;
    cancelBooking: (bookingId: number, driverId: number, vehicleId: number) => Promise<Response>;
    getAssignedBookings: (driverId: number) => Promise<ResponseProps<IBookingInfo[]>>;
}