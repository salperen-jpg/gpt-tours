import { FormInput, Logo } from "@/components";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { customFetch } from "@/utils";
import { AxiosError } from "axios";
import { ActionFunction, Form, redirect } from "react-router-dom";

export const action = async () => {
  return null;
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
        </CardContent>
      </Card>
    </main>
  );
};
export default Login;
