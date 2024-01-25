import { RouteObject } from "react-router-dom";
import MainLayout from "./pages/layout";
import LoginPage from "./pages/login";
import RentsPage from "./pages/rents";
import UserDetailsPage from "./pages/userDetails";
import UsersPage from "./pages/users";
import LogoutPage from "./pages/logout";
import AccountPage from "./pages/account";

export const routes = [
  {
    path: "/",
    Component: MainLayout,
    children: [
      { path: "/", Component: UsersPage },
      { path: "/users", Component: UsersPage },
      { path: "/users/:id", Component: UserDetailsPage },
      { path: "/rents", Component: RentsPage },
      { path: "/account", Component: AccountPage },
    ],
  },
  { path: "/login", Component: LoginPage },
  { path: "/logout", Component: LogoutPage },
] satisfies RouteObject[];
