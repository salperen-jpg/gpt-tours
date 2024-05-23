import { BreadCrumb } from "@/components";
import { useLocation } from "react-router-dom";

const Profile = () => {
  const something = useLocation();
  console.log(something);
  return (
    <div>
      <BreadCrumb />
    </div>
  );
};
export default Profile;
