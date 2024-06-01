import { BreadCrumb, FormInput, TokenAmount } from "@/components";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { customFetch } from "@/utils";
import { AxiosError } from "axios";
import {
  ActionFunction,
  Form,
  LoaderFunction,
  useOutletContext,
} from "react-router-dom";
import { useNavigation } from "react-router-dom";
import { OutletUser } from "./SharedLayout";

export type Token = {
  tokenAmount: number;
};

export const loader: LoaderFunction = async (): Promise<Token | null> => {
  try {
    const response = await customFetch.get<Token>("/token");
    return response.data;
  } catch (error) {
    toast({ description: "something went wrong!" });
    return null;
  }
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const newUserData = Object.fromEntries(formData);
  try {
    await customFetch.patch("/user/update-user", newUserData);
    toast({ description: "user updated!" });
  } catch (error) {
    const errorMessage =
      error instanceof AxiosError
        ? error.response?.data.msg
        : "something went wrong!";
    toast({ description: errorMessage });
  }
  return null;
};

const Profile = () => {
  const { user } = useOutletContext() as OutletUser;
  const { name, lastName, email, location } = user;
  const isSubmitted = useNavigation().state === "submitting";

  return (
    <>
      <BreadCrumb currentPage="Profile" />
      <section>
        <TokenAmount />
        <Form
          method="post"
          className="border-[1px] border-primary border-solid rounded-md p-6 mb-16 "
        >
          <h4 className="text-primary text-center capitalize font-medium tracking-wide mb-4">
            Update User
          </h4>
          <div className="grid gap-4 lg:grid-cols-3 items-end">
            <FormInput type="text" name="name" defaultValue={name} />
            <FormInput
              type="text"
              name="lastName"
              labelTitle="last name"
              defaultValue={lastName}
            />
            <FormInput type="text" name="location" defaultValue={location} />
            <FormInput type="text" name="email" defaultValue={email} />
            <Button variant="default" disabled={isSubmitted}>
              Update
            </Button>
          </div>
        </Form>
      </section>
    </>
  );
};
export default Profile;
