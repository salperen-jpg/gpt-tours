import { FormInput, Logo } from "@/components";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { customFetch } from "@/utils";
import { AxiosError } from "axios";
import { ActionFunction, Form, Link, redirect } from "react-router-dom";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/login", data);
    toast({ description: "Logged in!" });
    return redirect("/dashboard");
  } catch (error) {
    const errorMessage =
      error instanceof AxiosError ? error.response?.data.msg : "Login failed!";
    toast({ description: errorMessage });
    return null;
  }
};

const Login = () => {
  return (
    <main className="min-h-[100vh] grid place-content-center">
      <Card className="w-[350px]">
        <CardHeader className="text-center">
          <CardTitle className="mb-6">
            <Logo />
          </CardTitle>
          <h2>Login</h2>
        </CardHeader>
        <CardContent>
          <Form method="post">
            <div className="grid w-full items-center gap-4">
              <FormInput name="email" type="email" />
              <FormInput name="password" type="password" />
              <Button className="w-full">Login</Button>
            </div>
          </Form>
          <span className="mt-4 flex justify-end gap-x-2 text-sm">
            you don't have an account?
            <Link to="/register" className="text-primary capitalize">
              register
            </Link>
          </span>
        </CardContent>
      </Card>
    </main>
  );
};
export default Login;
