import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/dashboard">
      <h3 className="logo font-[Caveat] text-4xl font-semibold ">
        T
        <span className="font-extrabold bg-clip-text bg-gradient-to-r from-violet-300 to-fuchsia-300 text-transparent">
          {"<"}OURS{">"}
        </span>
      </h3>
    </Link>
  );
};
export default Logo;
