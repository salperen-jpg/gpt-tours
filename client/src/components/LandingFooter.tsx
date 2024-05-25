const LandingFooter = () => {
  return (
    <footer className="py-4 flex flex-col justify-center items-center">
      <span>&copy; {new Date().getFullYear()}</span>
      <span> All rights reserved </span>
    </footer>
  );
};
export default LandingFooter;
