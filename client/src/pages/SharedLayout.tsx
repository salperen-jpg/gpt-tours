import { Navbar } from "@/components";
import { toast } from "@/components/ui/use-toast";
import { User, customFetch } from "@/utils";
import { AxiosError } from "axios";
import { Outlet, redirect, useLoaderData } from "react-router-dom";

export const loader = async (): Promise<User | Response> => {
  try {
    const { data } = await customFetch("/user/currentUser");
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
  const user = useLoaderData() as User;
  return (
    <>
      <Navbar user={user} />
      <section className="align-element py-20">
        <Outlet context={{ user }} />
      </section>
    </>
  );
};
export default SharedLayout;
