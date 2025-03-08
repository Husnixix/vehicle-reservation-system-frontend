import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ManageBookingsForDriver from "@/pages/driver/ManageBookings";

const DriverNavabr = () => {
  return (
    <div className="flex">
      <Tabs defaultValue="manage-bookings" className="w-full">
        <TabsList className="flex gap-8 bg-slate-100 p-1 rounded-t-lg">
          <TabsTrigger
            value="manage-bookings"
            className="px-4 py-2 rounded-md data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-slate-200 data-[state=inactive]:bg-transparent transition-all"
          >
            Manage Bookings
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="manage-bookings">
            <ManageBookingsForDriver />,
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default DriverNavabr;
