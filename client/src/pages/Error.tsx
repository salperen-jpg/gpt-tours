import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";
import errorImg from "../assets/errorImg.svg";
import { Button } from "@/components/ui/button";
const Error = () => {
  const error = useRouteError();
  console.log(error);
  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <main className="min-h-[100vh] grid place-items-center">
        <div className="text-center px-8">
          <img src={errorImg} alt="error" className="max-w-md mb-6" />
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6 text-primary">
            Page not found!
          </h1>
          <p className="tracking-wide mb-6">
            Sorry, we could not find the page you are looking for
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/dashboard">Go back home</Link>
          </Button>
        </div>
      </main>
    );
  }
  return <div>Error</div>;
};
export default Error;
