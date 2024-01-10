import { Button } from "@/components/ui/button";
import { User, useUsers, useUsersFilter } from "@/data/user/useUsers";
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
  const { setFilter, filter } = useUsersFilter();

  const handleChangeUserStatus = (user: User) => {
    changeUserStatus(user);
  };

  const handleSearch = useDebouncedCallback((value) => {
    if (filter !== value) {
      setFilter(value);
    }
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
      <div className="flex flex-col gap-2">
        {users &&
          users.map((user) => (
            <div
              key={user.id}
              className="flex flex-col gap-2 border rounded-md p-2"
            >
              <div>Login: {user.login}</div>
              <div>Firstname: {user.firstName}</div>
              <div>Lastname: {user.lastName}</div>
              <div>Role: {user.role}</div>
              <div>
                Status:{" "}
                <Badge variant={user.active ? "default" : "secondary"}>
                  {user.active ? "Active" : "Inactive"}
                </Badge>
              </div>
              <div className="flex flex-row gap-x-2 justify-center">
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
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default UsersPage;
