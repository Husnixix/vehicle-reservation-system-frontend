import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { VehicleContext } from "@/contexts/VehicleContext";
import { IVehicle } from "@/types/vehicle";
import { useContext, useEffect, useState } from "react";


const ManageVehicles = () => {

  const vehicleContext = useContext(VehicleContext);

  if (!vehicleContext) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  const { getVehicles } = vehicleContext;
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const[loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);


 useEffect(() => {
   const fetchVehicles = async () => {
     try {
       const fetchedVehicles = await getVehicles();
       if (fetchedVehicles) {
         setVehicles(fetchedVehicles);
       }
     } catch (err) {
       setError("Failed to fetch vehicles. Please try again later.");
     } finally {
       setLoading(false);
     }
   };

   fetchVehicles();
 }, []);

   if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <Table>
      <TableCaption className="font-semibold">List of Vehicles</TableCaption>
      <TableHeader className="bg-slate-100">
        <TableRow>
          <TableHead>Id</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Model</TableHead>
          <TableHead>Number Plate</TableHead>
          <TableHead>Vehicle Type</TableHead>
          <TableHead>Color</TableHead>
          <TableHead>Status Plate</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vehicles.map((vehicle) => (
          <TableRow key={vehicle.id}>
            <TableCell className="font-medium">{vehicle.id}</TableCell>
            <TableCell>{vehicle.name}</TableCell>
            <TableCell>{vehicle.model}</TableCell>
            <TableCell>{vehicle.numberPlate}</TableCell>
            <TableCell>{vehicle.vehicleType}</TableCell>
            <TableCell>{vehicle.vehicleColor}</TableCell>
            <TableCell>{vehicle.vehicleStatus}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ManageVehicles;
