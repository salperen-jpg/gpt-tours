import { FormInput, Logo } from "@/components";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Register = () => {
  return (
    <main className="min-h-[100vh] grid place-content-center">
      <Card className="w-[350px]">
        <CardHeader className="text-center">
          <CardTitle className="mb-6">
            <Logo />
          </CardTitle>
          <h2>Register</h2>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <FormInput name="name" type="text" />
              <FormInput name="email" type="email" />
              <FormInput name="password" type="password" />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button className="w-full">Register</Button>
        </CardFooter>
      </Card>
    </main>
  );
};
export default Register;
