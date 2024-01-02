import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import UsersPage from "./pages/users";
import MainLayout from "./pages/layout.tsx";
import UserDetailsPage from "./pages/userDetails/index.tsx";
import { QueryClient, QueryClientProvider } from "react-query";

const routes = [
  {
    path: "/",
    Component: MainLayout,
    children: [
      { path: "/", Component: App },
      { path: "/users", Component: UsersPage },
      { path: "/users/:id", Component: UserDetailsPage },
    ],
  },
] satisfies RouteObject[];

const router = createBrowserRouter(routes);
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
