import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { links } from "@/utils";
import { NavLink, useLocation } from "react-router-dom";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";

const NavLinksDropDown = () => {
  const { pathname } = useLocation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="lg:hidden">
        <Button variant="outline" size="icon">
          <HiMiniBars3CenterLeft />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuSeparator />
        {links.map((link) => {
          const { id, label, path } = link;
          return (
            <DropdownMenuItem key={id}>
              <NavLink
                to={path}
                className={({ isActive }) => {
                  if (link.path === ".") {
                    return `capitalize font-light tracking-wide ${
                      isActive && pathname === "/dashboard"
                        ? "text-primary"
                        : ""
                    }`;
                  }
                  return `capitalize font-light tracking-wide ${
                    isActive ? "text-primary" : ""
                  }`;
                }}
              >
                {label}
              </NavLink>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default NavLinksDropDown;
