import { BreadCrumb, FormInput } from "@/components";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { User, customFetch } from "@/utils";
import { AxiosError } from "axios";
import { ActionFunction, Form, useOutletContext } from "react-router-dom";
import { useNavigation } from "react-router-dom";

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

type OutletUser = {
  user: User;
};

const Profile = () => {
  const { user } = useOutletContext() as OutletUser;
  const { name, lastName, email, location } = user;
  const isSubmitted = useNavigation().state === "submitting";

  return (
    <>
      <BreadCrumb currentPage="Profile" />
      <section>
        <Form
          method="post"
          className="border-[1px] border-primary border-solid rounded-md p-6 mb-16 "
        >
          <h4 className="text-primary text-center capitalize font-medium tracking-wide mb-4">
            Update User
          </h4>
          <div className="grid gap-4 lg:grid-cols-3 items-end">
            <FormInput type="text" name="name" defaultValue={name} />
            <FormInput type="text" name="lastName" defaultValue={lastName} />
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
