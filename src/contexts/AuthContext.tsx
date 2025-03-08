import { createContext } from "react";
import { UserAuthContextType } from "@/types/user";

export const AuthContext = createContext<UserAuthContextType | null>(null);
