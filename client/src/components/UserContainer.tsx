import { User } from "@/utils";
import { NavbarProps } from "./Navbar";
import { FaUserCircle } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";

const UserContainer = ({ user }: NavbarProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="flex gap-x-4">
        <Button variant="outline">
          <FaUserCircle />
          <span className="capitalize text-primary tracking-wider">
            {user.name}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => console.log("light")}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserContainer;
