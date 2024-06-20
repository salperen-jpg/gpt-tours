import Logo from "./Logo";

const LandingFooter = () => {
  return (
    <footer className="py-4 flex flex-col justify-center items-center gap-y-2">
      <Logo />
      <div className="text-center">
        <p>&copy; {new Date().getFullYear()}</p>
        <p> All rights reserved </p>
      </div>
    </footer>
  );
};
export default LandingFooter;
