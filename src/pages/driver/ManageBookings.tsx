import { useContext, useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IBookingInfo } from "@/types/booking";
import { DriverService } from "@/services/DriverService";
import { AuthContext } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Check, Play, X } from "lucide-react";
import { DriverContext } from "@/contexts/DriverContext";

const ManageBookingsForDriver = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext is not provided");
  }
  const driverContext = useContext(DriverContext);

  if (!driverContext) {
    throw new Error("AuthContext is not provided");
  }

  const { acceptBooking, cancelBooking, completeBooking } = driverContext;

  const { user } = authContext;
  const [bookings, setBookings] = useState<IBookingInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user || !user.id) return;

      try {
        const response = await DriverService.getAssignedBookings(user.id);
        setBookings(response.data); // Assuming the API response structure has `data`
      } catch (error) {
        console.error("Error fetching assigned bookings", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]); // Fetch when user changes

  if (loading) {
    return <p>Loading bookings...</p>;
  }

  const handleAcceptBooking = async (bookingId: number): Promise<void> => {
    try {
      const response = await acceptBooking(bookingId);
      if (response.ok) {
        alert(`Booking accepted for Driver ID: ${bookingId}`);
      } else {
        alert("Failed to accept the booking");
      }
    } catch (error) {
      alert("An error occurred while accepting the booking");
      console.error(error);
    }
  };

  const handleCancelBooking = async (
    bookingId: number,
    driverId: number,
    vehicleId: number
  ): Promise<void> => {
    try {
      console.log(bookingId, driverId, vehicleId);
      const response = await cancelBooking(bookingId, driverId, vehicleId);
      if (response.ok) {
        alert(`Booking accepted for Driver ID: ${bookingId}`);
      } else {
        alert("Failed to accept the booking");
      }
    } catch (error) {
      alert("An error occurred while accepting the booking");
      console.error(error);
    }
  };

  const handleCompleteBooking = async (
    bookingId: number,
    driverId: number,
    vehicleId: number
  ): Promise<void> => {
    try {
      const response = await completeBooking(bookingId, driverId, vehicleId);
      if (response.ok) {
        alert(`Booking accepted for Driver ID: ${bookingId}`);
      } else {
        alert("Failed to accept the booking");
      }
    } catch (error) {
      alert("An error occurred while accepting the booking");
      console.error(error);
    }
  };

  return (
    <Table>
      <TableCaption className="font-semibold">Assigned Bookings</TableCaption>
      <TableHeader className="bg-slate-100">
        <TableRow>
          <TableHead>Booking ID</TableHead>
          <TableHead>Pickup</TableHead>
          <TableHead>Dropoff</TableHead>
          <TableHead>Fare</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Vehicle</TableHead>
          <TableHead>Cancel</TableHead>
          <TableHead>Start</TableHead>
          <TableHead>Complete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.map((booking) => {
          const isDisabled =
            booking.bookingStatus === "COMPLETED" ||
            booking.bookingStatus === "CANCELLED";
          const disabledClass = "bg-gray-400 cursor-not-allowed";
          return (
            <TableRow key={booking.id}>
              <TableCell className="font-medium">{booking.id}</TableCell>
              <TableCell>{booking.pickUpLocation}</TableCell>
              <TableCell>{booking.dropOfLocation}</TableCell>
              <TableCell>{booking.rideFare}</TableCell>
              <TableCell>
                {booking.customer.name} ({booking.customer.phoneNumber})
              </TableCell>
              <TableCell>
                {booking.vehicle.name} ({booking.vehicle.numberPlate})
              </TableCell>
              <TableCell>
                <Button
                  size={"icon"}
                  variant={"default"}
                  onClick={() =>
                    user?.id &&
                    handleCancelBooking(booking.id, user.id, booking.vehicle.id)
                  }
                  className={`${
                    isDisabled ? disabledClass : "bg-red-500 hover:bg-red-600"
                  }`}
                  disabled={isDisabled}
                >
                  <X />
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  size={"icon"}
                  variant={"default"}
                  onClick={() => handleAcceptBooking(booking.id)}
                  className={`${
                    isDisabled ? disabledClass : "bg-blue-500 hover:bg-blue-600"
                  }`}
                  disabled={isDisabled}
                >
                  <Play />
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  size={"icon"}
                  variant={"default"}
                  onClick={() =>
                    user?.id &&
                    handleCompleteBooking(
                      booking.id,
                      user.id,
                      booking.vehicle.id
                    )
                  }
                  className={`${
                    isDisabled
                      ? disabledClass
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                  disabled={isDisabled}
                >
                  <Check />
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default ManageBookingsForDriver;
