import { RouteObject } from "react-router-dom";
import MainLayout from "./pages/layout";
import RentsPage from "./pages/rents";
import UserDetailsPage from "./pages/userDetails";
import UsersPage from "./pages/users";

export const routes = [
  {
    path: "/",
    Component: MainLayout,
    children: [
      { path: "/", Component: UsersPage },
      { path: "/users", Component: UsersPage },
      { path: "/users/:id", Component: UserDetailsPage },
      { path: "/rents", Component: RentsPage },
    ],
  },
] satisfies RouteObject[];
