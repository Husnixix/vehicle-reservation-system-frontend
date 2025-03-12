import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BookingContext } from "@/contexts/BookingContext";
import { DriverContext } from "@/contexts/DriverContext";
import { IBookingInfo } from "@/types/booking";
import { View, X } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { BookingDetailsDialog } from "./BookingInfo";
import Toast from "@/lib/toast";

const ManageBookingsForManager = () => {
  const bookingContext = useContext(BookingContext);
  const [selectedBooking, setSelectedBooking] = useState<IBookingInfo>();

  if (!bookingContext) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  const driverContext = useContext(DriverContext);

  if (!driverContext) {
    throw new Error("AuthContext is not provided");
  }

  const { cancelBooking } = driverContext;

  const { getBookings, getBookingInfo } = bookingContext;

  const [bookings, setBookings] = useState<IBookingInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getBookings();
        if (response != null) {
          setBookings(response.data);
        } else {
          Toast.error("Unexpected data format received from the server.");
        }
      } catch (err) {
        Toast.error("Failed to fetch users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const handleCancelBooking = async (
    bookingId: number,
    driverId: number,
    vehicleId: number
  ): Promise<void> => {
    try {
      console.log(bookingId, driverId, vehicleId);
      const response = await cancelBooking(bookingId, driverId, vehicleId);
      if (response.status == 200) {
        Toast.success("Booking cancelled");
      } else {
        Toast.error("Failed to cancel the booking");
      }
    } catch (error) {
      Toast.error("An error occurred while accepting the booking");
      
    }
  };

  const fetchBookingInfoForCustomer = async (
    bookingId: number
  ): Promise<void> => {
    try {
      const response = await getBookingInfo(bookingId);
      if (response.data != null) {
        console.log(response.data);
        setSelectedBooking(response.data);
      } else {
        Toast.error("Failed to fetch customer info");
      }
    } catch (error) {
      Toast.error("An error occurred while accepting the booking");
      console.error(error);
    }
  };

    if (loading) {
      return <div>Loading...</div>;
    }

  return (
    <>
      <Table>
        <TableCaption className="font-semibold">List of Bookings</TableCaption>
        <TableHeader className="bg-slate-100">
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>NIC</TableHead>
            <TableHead>Driver</TableHead>
            <TableHead>Pick Up Location</TableHead>
            <TableHead>Drop Of Location</TableHead>
            <TableHead>Fair</TableHead>
            <TableHead>Ride Status</TableHead>
            <TableHead>Payment Status</TableHead>
            <TableHead>Actions</TableHead>
            <TableHead>Receipt</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings && bookings.length > 0 ? (
            bookings.map((booking) => {
              const isDisabled =
                booking.bookingStatus === "COMPLETED" ||
                booking.bookingStatus === "CANCELLED";
              const disabledClass =
                "bg-gray-200 text-gray-600 cursor-not-allowed";
              return (
                <TableRow key={booking.id}>
                  <TableCell>{booking.id}</TableCell>
                  <TableCell>{booking.customer.name}</TableCell>
                  <TableCell>{booking.customer.phoneNumber}</TableCell>
                  <TableCell>{booking.customer.nic}</TableCell>
                  <TableCell>{booking.driver.name}</TableCell>
                  <TableCell>{booking.pickUpLocation}</TableCell>
                  <TableCell>{booking.dropOfLocation}</TableCell>
                  <TableCell>{booking.rideFare}</TableCell>
                  <TableCell>{booking.paymentStatus}</TableCell>
                  <TableCell>{booking.bookingStatus}</TableCell>
                  <TableCell>
                    <Button
                      size={"icon"}
                      variant={"default"}
                      onClick={() =>
                        handleCancelBooking(
                          booking.id,
                          booking.driverId,
                          booking.vehicle.id
                        )
                      }
                      className={`${
                        isDisabled
                          ? disabledClass
                          : "bg-red-500 hover:bg-red-600"
                      }`}
                      disabled={isDisabled}
                    >
                      <X />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <BookingDetailsDialog
                      booking={booking}
                      fetchBookingInfo={fetchBookingInfoForCustomer}
                    />
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={14}>No bookings available</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default ManageBookingsForManager;
