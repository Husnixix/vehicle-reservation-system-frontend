import { ResponseProps } from "./constant";
import { ICustomer } from "./customer";
import { IDriver } from "./driver";
import { IVehicle } from "./vehicle";

export interface IBooking {
    id?: number; 
    customer: ICustomer; 
    managerId: number;
    vehicleId: number;
    driverId: number;
    pickUpLocation: string;
    dropOfLocation: string;
    rideFare: number;
    bookingStatus?: string;
    paymentStatus?: string;
   
}

export interface IBookingInfo {
  id: number;
  customerId: number;
  managerId: number;
  vehicleId: number;
  driverId: number;
  pickUpLocation: string;
  dropOfLocation: string;
  rideFare: number;
  bookingStatus: string;
  paymentStatus: string;
  customer: {
    id: number;
    name: string;
    phoneNumber: number;
    nic: number;
  };
  driver: {
    id: number;
    name: string;
    email: string;
    password: null | string;
    userRole: null | string;
    bookingId: number;
    driverId: number;
    driverStatus: null | string;
  };
  vehicle: {
    id: number;
    name: string;
    model: string;
    numberPlate: string;
    vehicleType: null | string;
    vehicleColor: null | string;
    vehicleStatus: string;
  };
 
}

export interface BookingContextType {
    createBooking: (booking: IBooking) => Promise<ResponseProps<IBooking>>;
    getBookings: () => Promise<ResponseProps<IBookingInfo[]>>;
    getBookingInfo: (bookingId: number) => Promise<ResponseProps<IBookingInfo>>;
}