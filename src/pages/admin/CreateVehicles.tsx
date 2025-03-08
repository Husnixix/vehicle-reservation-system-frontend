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
import Toast from "@/lib/toast";
import { Loader2 } from "lucide-react";
import { useContext, useState } from "react";

const CreateVehicles = () => {

  const vehicleContext = useContext(VehicleContext);
  if (!vehicleContext) {
    throw new Error("useVehicleContext must be used within a VehicleProvider");
  }

  const { createVehicle } = vehicleContext;
  const [loading, setLoading] = useState(false);

  const handleCreateVehicle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget; 
    const formElements = form.elements;

    const getFormValue = (name: string) =>(formElements.namedItem(name) as HTMLInputElement | HTMLSelectElement).value;

    const name = getFormValue("name");
    const model = getFormValue("model");
    const numberPlate = getFormValue("numberPlate");
    const vehicleType = getFormValue("vehicleType");
    const vehicleColor = getFormValue("vehicleColor");
    const vehicleStatus = getFormValue("vehicleStatus");

    const newVehicle = { name, model, numberPlate, vehicleType, vehicleColor, vehicleStatus };

    const response = await createVehicle(newVehicle);
    if(response.data != null) {
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
      <form onSubmit={handleCreateVehicle}>
        <Card className="w-fit shadow-md rounded-lg">
          <CardHeader>
            <CardTitle className="text-slate-800 font-semibold text-xl">
              Create Vehicle
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Enter Vehicle Name" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="">
                  <Label htmlFor="model">Model</Label>
                  <Input
                    id="model"
                    name="model"
                    placeholder="Enter Vehicle Model"
                  />
                </div>
                <div className="">
                  <Label htmlFor="numberPlate">Number Plate</Label>
                  <Input
                    id="numberPlate"
                    name="numberPlate"
                    placeholder="Enter Number Plate"
                  />
                </div>
              </div>

              <div className="">
                <Select name="vehicleType">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Vehicle Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BIKE">Bike</SelectItem>
                    <SelectItem value="CAR">Car</SelectItem>
                    <SelectItem value="VAN">Van</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="">
                <Select name="vehicleColor">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BLACK">Black</SelectItem>
                    <SelectItem value="RED">Red</SelectItem>
                    <SelectItem value="WHITE">White</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="">
                <Select name="vehicleStatus">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Vehicle Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AVAILABLE">Available</SelectItem>
                    <SelectItem value="ASSIGNED">Assigned</SelectItem>
                    <SelectItem value="MAINTAINENCE">Maintainence</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow">
              <Button variant="outline" className="hover:bg-gray-50">
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
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default CreateVehicles;
