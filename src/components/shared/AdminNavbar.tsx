import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import CreateUsers from "../../pages/admin/CreateUsers";
import ManageUsers from "../../pages/admin/ManageUsers";
import CreateVehicles from "../../pages/admin/CreateVehicles";
import ManageVehicles from "../../pages/admin/ManageVehicles";

const AdminNavbar = () => {
  return (
    <div className="flex">
      <Tabs defaultValue="create-user" className="w-full">
        <TabsList className="flex gap-8 bg-slate-100 p-1 rounded-t-lg">
          <TabsTrigger
            value="create-user"
            className="px-4 py-2 rounded-md data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-slate-200 data-[state=inactive]:bg-transparent transition-all"
          >
            Create User
          </TabsTrigger>
          <TabsTrigger
            value="manage-users"
            className="px-4 py-2 rounded-md data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-slate-200 data-[state=inactive]:bg-transparent transition-all"
          >
            Manage Users
          </TabsTrigger>
          <TabsTrigger
            value="create-vehicle"
            className="px-4 py-2 rounded-md data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-slate-200 data-[state=inactive]:bg-transparent transition-all"
          >
            Create Vehicles
          </TabsTrigger>
          <TabsTrigger
            value="manage-vehicles"
            className="px-4 py-2 rounded-md data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-slate-200 data-[state=inactive]:bg-transparent transition-all"
          >
            Manage Vehicles
          </TabsTrigger>
        </TabsList>
        <div className="mt-6">
          <TabsContent value="create-user">
            <CreateUsers />
          </TabsContent>
          <TabsContent value="manage-users">
            <ManageUsers />,
          </TabsContent>
          <TabsContent value="create-vehicle">
            <CreateVehicles />,
          </TabsContent>
          <TabsContent value="manage-vehicles">
            <ManageVehicles />,
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default AdminNavbar;
