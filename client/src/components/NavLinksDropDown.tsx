import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { links } from "@/utils";
import { NavLink } from "react-router-dom";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";

const NavLinksDropDown = () => {
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
                className={({ isActive }) =>
                  `capitalize w-full ${isActive ? "text-primary" : ""}`
                }
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
