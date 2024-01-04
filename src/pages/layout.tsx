import { Toaster } from "@/components/ui/toaster";
import { FC } from "react";
import { NavLink, Outlet } from "react-router-dom";

const MainLayout: FC = () => {
  return (
    <div className="w-screen min-h-screen">
      <div className="flex flex-col container">
        <div className="flex flex-row gap-x-2">
          <NavLink
            className="border-4 border-blue-400 rounded-md p-2"
            to={"/users"}
          >
            Users
          </NavLink>
          <NavLink
            className="border-4 border-blue-400 rounded-md p-2"
            to={"/rents"}
          >
            Rents
          </NavLink>
        </div>
        <Outlet />
        <Toaster />
      </div>
    </div>
  );
};

export default MainLayout;
