import { BreadCrumb } from "@/components";
import { useLocation } from "react-router-dom";

const Profile = () => {
  const something = useLocation();
  console.log(something);
  return (
    <div>
      <BreadCrumb currentPage="Profile" />
    </div>
  );
};
export default Profile;
