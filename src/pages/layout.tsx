import { FC } from "react";
import { Outlet } from "react-router-dom";

const MainLayout: FC = () => {
  return (
    <div className="w-screen min-h-screen">
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
