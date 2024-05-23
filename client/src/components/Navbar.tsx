import { UserResponse } from "@/utils";
import {
  Logo,
  NavLinksDropDown,
  NavbarLinks,
  ThemeToggle,
  UserContainer,
} from ".";

export type NavbarProps = {
  user: UserResponse;
  logout: () => void;
};

const Navbar = ({ user, logout }: NavbarProps) => {
  return (
    <nav className="bg-muted py-4 h-20 grid align-center">
      <div className="align-element flex items-center justify-between w-full">
        <Logo />
        <NavLinksDropDown />
        <NavbarLinks />
        <div className="flex items-center gap-x-4">
          <ThemeToggle />
          <UserContainer user={user} logout={logout} />
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
