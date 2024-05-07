import { Outlet } from "react-router-dom";

const SharedLayout = () => {
  return (
    <>
      <h1>I am shared all across the router!</h1>
      <Outlet />
    </>
  );
};
export default SharedLayout;
