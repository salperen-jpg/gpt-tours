import { Navbar } from "@/components";
import { toast } from "@/components/ui/use-toast";
import { User, UserResponse, customFetch } from "@/utils";
import { AxiosError } from "axios";
import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";

type UserFetch = {
  user: UserResponse;
};

export const loader = async (): Promise<UserResponse | Response> => {
  try {
    const { data } = await customFetch<UserFetch>("/user/currentUser");
    return data.user;
  } catch (error) {
    const errorMessage =
      error instanceof AxiosError
        ? error.response?.data.msg
        : "Something went wrong!";
    toast({ description: errorMessage });
    return redirect("/login");
  }
};

export type OutletUser = {
  user: User;
};

const SharedLayout = () => {
  const user = useLoaderData() as UserResponse;
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";

  const logout = async () => {
    await customFetch("/auth/logout");
    toast({ description: "Logged out!" });
    return navigate("/login");
  };

  return (
    <>
      <Navbar user={user} logout={logout} />
      <section className="align-element py-20 ">
        {isPageLoading ? <>Loading...</> : <Outlet context={{ user } as OutletUser}  />}
      </section>
    </>
  );
};
export default SharedLayout;
