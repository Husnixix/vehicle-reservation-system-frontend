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
import { UserContext } from "@/contexts/UserContext";
import Toast from "@/lib/toast";
import { Loader2 } from "lucide-react";
import { useContext, useState } from "react";

const CreateUsers = () => {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  const { createUser } = userContext;
  const [loading, setLoading] = useState(false);

  const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    const form = e.currentTarget;
    const formElements = form.elements;

    const getFormValue = (name: string) =>(formElements.namedItem(name) as HTMLInputElement | HTMLSelectElement).value;

    const name = getFormValue("name");
    const email = getFormValue("email");
    const password = getFormValue("password");
    const userRole = getFormValue("userRole");

    const newUser = { name, email, password, userRole };

    const response = await createUser(newUser);

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
    <>
      <div className="flex justify-center items-center">
        <form onSubmit={handleCreateUser}>
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle className="text-slate-800 font-semibold text-xl">
                Create User
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name </Label>
                  <Input id="name" name="name" placeholder="Enter Username" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email </Label>
                  <Input id="email" name="email" placeholder="Enter Email" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password]">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    placeholder="Enter Password"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Select name="userRole">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      <SelectItem value="MANAGER">Manager</SelectItem>
                      <SelectItem value="DRIVER">Driver</SelectItem>
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
    </>
  );
};

export default CreateUsers;
