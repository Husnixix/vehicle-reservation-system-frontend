import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { User } from "lucide-react";

const Navbar = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext is not provided");
  }

  const { user } = authContext;
  const { logout } = authContext;

  // Capitalize first letter of user role
  const formattedRole = user?.userRole
    ? user.userRole.charAt(0).toUpperCase() +
      user.userRole.slice(1).toLowerCase()
    : "";

  return (
    <nav className="flex items-center justify-between p-4 shadow-lg bg-slate-800">
      <div>
        <Link to="/" className="font-semibold text-3xl text-white">
          Mega City Cab
        </Link>
      </div>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <div className="flex items-center bg-slate-700 rounded-full px-4 py-2 text-white">
              <User className="h-5 w-5 mr-2 text-blue-400" />
              <span className="font-medium">{user.name}</span>
            </div>

            <div className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium">
              {formattedRole}
            </div>

            <Button
              onClick={logout}
              size="sm"
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Sign Out
            </Button>
          </>
        ) : (
          <Link
            to="/"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
