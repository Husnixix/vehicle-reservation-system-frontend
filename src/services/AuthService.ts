import { API_URL } from "@/types/constant";
import { IUser } from "@/types/user";

// const API_URL = "http://localhost:8080/MegaCabService/users";

export const AuthService = {
  login: async (email: string, password: string): Promise<{message: string, data: IUser}> => {
    try {
      const formData = new URLSearchParams();
      formData.append("email", email);
      formData.append("password", password);

      const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Login failed");
      }

      const data = await response.json();
      localStorage.setItem("data", JSON.stringify(data));
      return data;
    } catch (error) {
      console.error("AuthService login error:", error);
      throw error;
    }
  },
};
