import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import MainLayout from "./pages/layout";

const UsersPage = lazy(() => import("./pages/users"));
const UserDetailsPage = lazy(() => import("./pages/userDetails"));
const RentsPage = lazy(() => import("./pages/rents"));

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
