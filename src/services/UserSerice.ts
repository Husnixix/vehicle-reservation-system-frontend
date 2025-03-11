import { IUser } from "@/types/user";
import { API_URL, ResponseProps } from "@/types/constant";


export const UserService = {
    getUsers: async (): Promise<IUser[]> => {
        try {
            const response = await fetch(`${API_URL}/users`);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Failed to get users");
            }
            const data = await response.json();
            return data.data as IUser[];
        } catch (error) {
            console.error("UserService getUsers error:", error);
            throw error;
        }
    },

    addUser: async (user: IUser): Promise<ResponseProps<IUser>> => {
        try {
            const formData = new URLSearchParams();
            formData.append("name", user.name);
            formData.append("email", user.email);
            formData.append("password", user.password);
            formData.append("userRole", user.userRole);

            const response = await fetch(`${API_URL}/users/register`, {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: formData.toString(),
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Failed to add user");
            }
            const data = await response.json();
            return data
        } catch (error) {
            console.error("UserService addUser error:", error);
            throw error;
        }
    },
};