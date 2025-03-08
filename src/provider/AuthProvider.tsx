import { useState, ReactNode, useEffect } from "react";
import { IUser, UserAuthContextType } from "@/types/user";
import { AuthService } from "@/services/AuthService";
import { AuthContext } from "@/contexts/AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreUser = async () => {
      const storeUserData = localStorage.getItem("data");
      console.log("Stored user data:", storeUserData);
      if (storeUserData) {
        const parsedData = JSON.parse(storeUserData);
        setUser(parsedData.data); // Set the user data
      }
      setLoading(false); // Only set loading false after user is set
    };

    restoreUser();
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<{ message: string; data: IUser }> => {
    const response = await AuthService.login(email, password);
    setUser(response.data);
    return response;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("data");
  };

  const value: UserAuthContextType = { user, login, logout, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
