import { Navbar } from "@/components";
import { toast } from "@/components/ui/use-toast";
import { UserResponse, customFetch } from "@/utils";
import { AxiosError } from "axios";
import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";

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

const SharedLayout = () => {
  const user = useLoaderData() as UserResponse;
  const navigate = useNavigate();

  const logout = async () => {
    await customFetch("/auth/logout");
    toast({ description: "Logged out!" });
    return navigate("/login");
  };

  return (
    <>
      <Navbar user={user} logout={logout} />
      <section className="align-element py-20">
        <Outlet context={{ user }} />
      </section>
    </>
  );
};
export default SharedLayout;
