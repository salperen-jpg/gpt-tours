import Logo from "./Logo";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const LandingHeader = () => {
  return (
    <header className="align-element pt-16 flex justify-between items-center">
      <Logo />
      <Button asChild variant="outline">
        <Link to="/register">Login/Register</Link>
      </Button>
    </header>
  );
};
export default LandingHeader;
