import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { User, Menu, Home, LogOut, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext is not provided");
  }

  const { user, logout } = authContext;

  // Capitalize first letter of user role
  const formattedRole = user?.userRole
    ? user.userRole.charAt(0).toUpperCase() +
      user.userRole.slice(1).toLowerCase()
    : "";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="relative shadow-lg bg-slate-800">
      <div className="flex items-center justify-between p-4">
        <div>
          <Link to="/" className="font-semibold text-3xl text-white">
            Mega City Cab
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-4">
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
      </div>

      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-700 py-4 px-6 absolute w-full z-10">
          <div className="flex flex-col space-y-4">

            {user ? (
              <>
                <div className="flex items-center text-white py-2">
                  <User className="h-5 w-5 mr-2 text-blue-400" />
                  <span className="font-medium">{user.name}</span>
                  <span className="ml-2 bg-blue-600 px-2 py-0.5 rounded-md text-sm font-medium">
                    {formattedRole}
                  </span>
                </div>

                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-red-400 hover:text-red-300"
                >
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <Link
                to="/"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium inline-block w-fit"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
