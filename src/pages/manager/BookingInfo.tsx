import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IBookingInfo } from "@/types/booking";
import {
  View,
  MapPin,
  User,
  Phone,
  Car,
  DollarSign,
  Clock,
  Share2,
} from "lucide-react";
import { useState } from "react";

export function BookingDetailsDialog({
  booking,
  fetchBookingInfo,
}: {
  booking: IBookingInfo;
  fetchBookingInfo: (id: number) => Promise<void>;
}) {
  const [isOpen, setIsOpen] = useState(false);

  if (!booking) return null;

  const handleOpenDialog = async () => {
    await fetchBookingInfo(booking.id);
    setIsOpen(true);
  };

  // Function to get status badge color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-300";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-300";
      case "in progress":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "scheduled":
        return "bg-amber-100 text-amber-800 border-amber-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size={"icon"}
          className="bg-amber-500 hover:bg-amber-600 text-white"
          onClick={(e) => {
            e.preventDefault();
            handleOpenDialog();
          }}
        >
          <View />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="pb-4 border-b border-slate-200">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold">Mega City Cab</h1>
              <p className="text-slate-500 text-sm">Receipt #{booking.id}</p>
            </div>
            <div
              className={`px-3 py-1 rounded-full border ${getStatusColor(
                booking.bookingStatus
              )}`}
            >
              {booking.bookingStatus}
            </div>
          </div>
        </DialogHeader>

        <div className="py-4">
          {/* Route info */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-slate-500 mb-2">ROUTE</h3>
            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mb-1"></div>
                <div className="w-0.5 h-12 bg-slate-200"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <p className="font-medium">Pick-up</p>
                  <p className="text-slate-600">{booking.pickUpLocation}</p>
                </div>
                <div>
                  <p className="font-medium">Drop-off</p>
                  <p className="text-slate-600">{booking.dropOfLocation}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Customer & Driver info */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <User className="h-4 w-4 text-slate-400" />
                <p className="font-medium">Customer</p>
              </div>
              <p className="text-slate-700">{booking.customer.name}</p>
              <div className="flex items-center gap-1 mt-1 text-slate-500">
                <Phone className="h-3 w-3" />
                <p className="text-sm">{booking.customer.phoneNumber}</p>
              </div>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Car className="h-4 w-4 text-slate-400" />
                <p className="font-medium">Driver</p>
              </div>
              <p className="text-slate-700">{booking.driver.name}</p>
            </div>
          </div>

          {/* Fare info */}
          <div className="border-t border-slate-200 pt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-600">Fare</span>
              <span className="font-medium">
                ${booking.rideFare.toFixed(2)}
              </span>
            </div>
            {/* You can add more fare details here if needed */}
            <div className="bg-blue-50 p-3 rounded-lg mt-4 flex justify-between items-center">
              <span className="font-medium">Total</span>
              <span className="text-xl font-bold">
                ${booking.rideFare.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-between">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
          <Button className="bg-blue-500 hover:bg-blue-600">
            <Share2 className="h-4 w-4 mr-2" />
            Share Receipt
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
