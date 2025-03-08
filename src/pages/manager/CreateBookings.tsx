import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { VehicleContext } from "@/contexts/VehicleContext";
import { BookingContext } from "@/contexts/BookingContext";
import { IVehicle } from "@/types/vehicle";
import { useContext, useState, useEffect } from "react";
import { DriverContext } from "@/contexts/DriverContext";
import { IDriver } from "@/types/driver";
import Toast from "@/lib/toast";
import { AuthContext } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

const CreateBooking = () => {

  const authContext = useContext(AuthContext);
  
     if (!authContext) {
       throw new Error("AuthContext is not provided");
     }
  const { user } = authContext;
  const managerId = user?.id? user.id.toString() : "";
  const vehicleContext = useContext(VehicleContext);
  const driverContext = useContext(DriverContext);
  const bookingContext = useContext(BookingContext);

  if (!driverContext || !vehicleContext || !bookingContext) {
    throw new Error("Context must be used within a Provider");
  }

  const { getAvailableVehicles } = vehicleContext;
  const { getAvailableDrivers } = driverContext;
  const { createBooking } = bookingContext;

  const [availableVehicles, setAvailableVehicles] = useState<IVehicle[]>([]);
  const [driverInfo, setDriverInfo] = useState<IDriver[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVehicles = async () => {
      const fetchedVehicles = await getAvailableVehicles();
      if (fetchedVehicles) {
        setAvailableVehicles(fetchedVehicles);
      }
    };
    fetchVehicles();
  }, []);

  useEffect(() => {
    const fetchDriverInfo = async () => {
      const fetchedDrivers = await getAvailableDrivers();
      if (fetchedDrivers) {
        setDriverInfo(fetchedDrivers);
      }
    };
    fetchDriverInfo();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

        const form = e.currentTarget;
        const formElements = form.elements;

        const getFormValue = (name: string) =>
          (formElements.namedItem(name) as HTMLInputElement | HTMLSelectElement)
            .value;

        const customerName = getFormValue("customerName");
        const customerPhone = getFormValue("customerPhone");
        const customerNIC = getFormValue("customerNIC");
        const vehicleId = getFormValue("vehicleId");
        const driverId = getFormValue("driverId");
        const pickUpLocation = getFormValue("pickUpLocation");
        const dropOfLocation = getFormValue("dropOfLocation");
        const rideFare = getFormValue("rideFare");

        const newBooking = {
          customer: {
            name: customerName,
            phoneNumber: parseInt(customerPhone),
            NIC: parseInt(customerNIC),
          },
          managerId: parseInt(managerId),
          vehicleId: parseInt(vehicleId),
          driverId: parseInt(driverId),
          pickUpLocation: pickUpLocation,
          dropOfLocation: dropOfLocation,
          rideFare: parseFloat(rideFare),
        };

        const response = await createBooking(newBooking);
        if (response.data != null) {
          Toast.success(response.message);
          form.reset();
           setLoading(false);
        }else {
          Toast.error(response.message);
           setLoading(false);
        }

    
  };

  return (
    <div className="flex justify-center items-center">
      <Card className="w-fit shadow-md rounded-lg">
        <CardHeader>
          <CardTitle className="text-slate-800 font-semibold text-xl">
            Create Booking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="">
                  <Label htmlFor="customerName">Customer Name</Label>
                  <Input
                    id="customerName"
                    name="customerName"
                    placeholder="Enter Customer Name"
                  />
                </div>
                <div className="">
                  <Label htmlFor="customerPhone">Phone Number</Label>
                  <Input
                    id="customerPhone"
                    name="customerPhone"
                    placeholder="Enter Phone Number"
                  />
                </div>
                <div className="">
                  <Label htmlFor="customerNIC">NIC</Label>
                  <Input
                    id="customerNIC"
                    name="customerNIC"
                    placeholder="Enter NIC"
                  />
                </div>
              </div>

              <div className="">
                <Label>Vehicle</Label>
                <Select name="vehicleId">
                  <SelectTrigger>
                    <SelectValue placeholder="Select Vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableVehicles.map((vehicle) => (
                      <SelectItem
                        value={vehicle.id?.toString() || ""}
                        key={vehicle.id}
                      >
                        {vehicle.name + " " + vehicle.model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="">
                <Label>Driver</Label>
                <Select name="driverId">
                  <SelectTrigger>
                    <SelectValue placeholder="Select Driver" />
                  </SelectTrigger>
                  <SelectContent>
                    {driverInfo.map((driver) => (
                      <SelectItem
                        value={driver.driverId?.toString() || ""}
                        key={driver.driverId}
                      >
                        {driver.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="">
                  <Label htmlFor="pickUpLocation">Pick Up Location</Label>
                  <Input
                    id="pickUpLocation"
                    name="pickUpLocation"
                    placeholder="Enter Pick Up Location"
                  />
                </div>
                <div className="">
                  <Label htmlFor="dropOfLocation">Drop Off Location</Label>
                  <Input
                    id="dropOfLocation"
                    name="dropOfLocation"
                    placeholder="Enter Drop Off Location"
                  />
                </div>
              </div>

              <div className="">
                <Label htmlFor="rideFare">Ride Fare</Label>
                <Input
                  id="rideFare"
                  name="rideFare"
                  placeholder="Enter Ride Fare"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <Button
                variant="outline"
                type="button"
                className="hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-6 h-6" />
                  </>
                ) : (
                  "Create"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateBooking;
