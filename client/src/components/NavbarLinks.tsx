import { links } from "@/utils";
import { NavLink, useLocation } from "react-router-dom";

const NavbarLinks = () => {
  const { pathname } = useLocation();
  return (
    <div className=" items-center justify-center gap-x-4 hidden lg:flex">
      {links.map((link) => {
        return (
          <NavLink
            to={link.path}
            key={link.id}
            className={({ isActive }) => {
              if (link.path === ".") {
                return `capitalize font-light tracking-wide ${
                  isActive && pathname === "/dashboard" ? "text-primary" : ""
                }`;
              }
              return `capitalize font-light tracking-wide ${
                isActive ? "text-primary" : ""
              }`;
            }}
          >
            {link.label}
          </NavLink>
        );
      })}
    </div>
  );
};
export default NavbarLinks;
