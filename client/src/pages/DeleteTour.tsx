import { toast } from "@/components/ui/use-toast";
import { customFetch } from "@/utils";
import { AxiosError } from "axios";
import { ActionFunction, redirect } from "react-router-dom";

const action: ActionFunction = async ({ params }) => {
  const { id } = params;
  try {
    await customFetch.delete(`/tours/${id}`);
    toast({ description: "deleted successfully!" });
    return redirect("/dashboard");
  } catch (error) {
    const errorMessage =
      error instanceof AxiosError
        ? error.response?.data.msg
        : "something went wrong";
    toast({ description: errorMessage });
    redirect("/dashboard");
  }
  return null;
};

export default action;
