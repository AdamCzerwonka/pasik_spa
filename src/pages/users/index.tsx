import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User, useUsers } from "@/data/user/useUsers";
import { FC, useState } from "react";
import EditUserDialog from "./EditUserDialog";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useDebouncedCallback } from "use-debounce";
import CreateUserDialog from "./CreateUserDialog";
import { Badge } from "@/components/ui/badge";
import { useUpdateUser } from "@/data/user/useUpdateUser";
import { useDialog } from "@/store/dialogStore";
import { useChangeUserStatus } from "@/data/user/useChangesUserStatus";

const UsersPage: FC = () => {
  const { users } = useUsers();
  const navigate = useNavigate();
  const [editUser, setEditUser] = useState<User>();
  const { updateUser } = useUpdateUser();
  const { changeUserStatus } = useChangeUserStatus();
  const { openDialog } = useDialog();

  const handleChangeUserStatus = (user: User) => {
    changeUserStatus(user);
  };

  const handleSearch = useDebouncedCallback((value) => {
    console.log(value);
  }, 400);

  const handleEdit = (user: User) => {
    updateUser(user);
  };

  return (
    <>
      {editUser && <EditUserDialog user={editUser} onUpdate={handleEdit} />}
      <h1>Users</h1>
      <div className="flex flex-row gap-2">
        <Input
          placeholder="Search"
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue=""
        />
        <CreateUserDialog />
      </div>
      {users && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Login</TableHead>
              <TableHead>First name</TableHead>
              <TableHead>Last name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.login}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Badge variant={user.active ? "default" : "secondary"}>
                    {user.active ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell className="flex flex-row gap-x-2">
                  <Button onClick={() => navigate(`/users/${user.id}`)}>
                    Details
                  </Button>
                  <Button
                    onClick={() => {
                      setEditUser(user);
                      openDialog("editUser");
                    }}
                    variant="secondary"
                  >
                    Edit
                  </Button>
                  <Button onClick={() => handleChangeUserStatus(user)}>
                    {user.active ? "Disable" : "Activate"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default UsersPage;
