import { Toaster } from "@/components/ui/toaster";
import { useAuthStore } from "@/store/authStore";
import { FC } from "react";
import { NavLink, Navigate, Outlet, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

type Role = "Client" | "Manager" | "Administrator";

const MainLayout: FC = () => {
  const { token } = useAuthStore();
  const decoded = jwtDecode(token ?? "");
  const path = useLocation();

  const role: Role =
    "user_role" in decoded ? (decoded.user_role as Role) : "Client";

  const links: { to: string; label: string; roles: Role[] }[] = [
    { to: "/users", label: "Users", roles: ["Administrator"] },
    { to: "/rents", label: "Rents", roles: ["Administrator", "Manager"] },
    {
      to: "/account",
      label: "Account",
      roles: ["Administrator", "Client", "Manager"],
    },
  ];

  const canEnter = links
    .find((x) => path.pathname.includes(x.to))
    ?.roles.includes(role);

  return (
    <>
      {token ? (
        <>
          {canEnter ? (
            <div className="w-screen min-h-screen">
              <div className="flex flex-col container">
                <div className="flex flex-row gap-x-2 items-center">
                  {links
                    .filter((link) => link.roles.includes(role))
                    .map((link) => (
                      <NavLink
                        className="border-4 border-blue-400 rounded-md p-2"
                        to={link.to}
                      >
                        {link.label}
                      </NavLink>
                    ))}

                  <div className="ml-auto flex flex-row gap-x-2 items-center">
                    <div>
                      <b>Login</b>: {decoded.sub}
                    </div>
                    <div>
                      <b>Role</b>:{" "}
                      {"user_role" in decoded && (decoded.user_role as string)}
                    </div>
                    <NavLink
                      className="border-4 border-blue-400 rounded-md p-2"
                      to={"/logout"}
                    >
                      Logout
                    </NavLink>
                  </div>
                </div>
                <Outlet />
                <Toaster />
              </div>
            </div>
          ) : (
            <Navigate to="/account" />
          )}
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default MainLayout;
