import { UserContext } from "@/contexts/UserContext";
import { UserService } from "@/services/UserSerice";
import { IUser, UserContextType } from "@/types/user";
import { ResponseProps } from "@/types/constant";
import { ReactNode } from "react";

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {

  const createUser = async (user: IUser): Promise<ResponseProps<IUser>> => {
    const response = await UserService.addUser(user);
    return response;
  };

  const getUsers = async (): Promise<IUser[]> => {
    const response = await UserService.getUsers();
    return response;
  };

  const value: UserContextType = { createUser, getUsers };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserProvider };
