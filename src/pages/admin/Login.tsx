import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

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

import { Loader2 } from "lucide-react";
import Toast from "@/lib/toast";
import { AuthContext } from "@/contexts/AuthContext";

const Login = () => {

  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();
  const authContext = useContext(AuthContext); 


  if (!authContext) {
    throw new Error("AuthContext is null");
  }

  const { login } = authContext; 

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
const form = e.currentTarget;
const formElements = form.elements;

const getFormValue = (name: string) =>
  (formElements.namedItem(name) as HTMLInputElement | HTMLSelectElement).value;
      const username = getFormValue("email") as string;
      const password = getFormValue("password") as string;

      const response = await login(username, password);

      if(response.data != null) {
        Toast.success(response.message);
        form.reset();
        const roleRoutes: Record<string, string> = {
          ADMIN: "/admin",
          MANAGER: "/manager",
          DRIVER: "/driver",
        }
        navigate(roleRoutes[response.data.userRole]);
      }
      else {
        Toast.error(response.message);
        setLoading(false);
        
      }
      
   
  }
  




  return (
    <div className="flex justify-center items-center">
      <Card className="w-[350px] shadow-md rounded-lg">
        <CardHeader>
          <CardTitle className="text-slate-800 font-semibold text-xl">
            LOGIN
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Email</Label>
                <Input id="email" name="email" placeholder="Enter Email" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                />
              </div>
            </div>
            <CardFooter className="flex justify-between p-0 pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => navigate("/")}
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
                    "Login"
                  )}
                </Button>
              </div>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
