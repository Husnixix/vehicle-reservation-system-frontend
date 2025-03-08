import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserContext } from "@/contexts/UserContext";
import { IUser } from "@/types/user";

import { useContext, useEffect, useState } from "react";

const ManageUsers = () => {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  const { getUsers } = userContext;

  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        if (response != null) {  
          setUsers(response);
        } else {
          setError("Unexpected data format received from the server.");
        }
      } catch (err) {
        setError("Failed to fetch users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Table>
      <TableCaption className="font-semibold">List of Users</TableCaption>
      <TableHeader className="bg-slate-100">
        <TableRow>
          <TableHead>Id</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.id}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.userRole}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ManageUsers;
