import { FormInput, Logo } from "@/components";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { customFetch } from "@/utils";
import { AxiosError } from "axios";
import { ActionFunction, Form, redirect } from "react-router-dom";

export const action: ActionFunction = async ({
  request,
}): Promise<Response | null> => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/register", data);
    toast({ description: "Registered successfully!" });
    return redirect("/dashboard");
  } catch (error) {
    const errorMessage =
      error instanceof AxiosError
        ? error.response?.data.msg
        : "registration failed!";
    toast({ description: errorMessage });
    return null;
  }
};

const Register = () => {
  return (
    <main className="min-h-[100vh] grid place-content-center">
      {/* <Form action="post"> */}
      <Card className="w-[350px]">
        <CardHeader className="text-center">
          <CardTitle className="mb-6">
            <Logo />
          </CardTitle>
          <h2>Register</h2>
        </CardHeader>
        <CardContent>
          <Form method="post">
            <div className="grid w-full items-center gap-4">
              <FormInput name="name" type="text" />
              <FormInput name="email" type="email" />
              <FormInput name="password" type="password" />
              <Button className="w-full">Register</Button>
            </div>
          </Form>
        </CardContent>
      </Card>
      {/* </Form> */}
    </main>
  );
};
export default Register;
