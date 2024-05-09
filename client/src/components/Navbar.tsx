import {
  Logo,
  NavLinksDropDown,
  NavbarLinks,
  ThemeToggle,
  UserContainer,
} from ".";

const Navbar = () => {
  return (
    <nav className="bg-muted py-4">
      <div className="align-element flex items-center justify-between">
        <Logo />
        <NavLinksDropDown />
        <NavbarLinks />
        <div className="flex items-center gap-x-4">
          <ThemeToggle />
          <UserContainer />
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
