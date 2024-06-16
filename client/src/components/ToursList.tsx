import { Link, useLoaderData } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { ToursData } from "@/pages/Tours";
import { RiAlarmWarningFill } from "react-icons/ri";

const ToursList = () => {
  const { tours, numOfTours } = useLoaderData() as ToursData;

  if (tours.length < 1) {
    return (
      <div className="h-[30vh] grid place-items-center">
        <div className="flex flex-col justify-center items-center gap-y-4">
          <RiAlarmWarningFill className="text-4xl warning" />
          <p className="text-xl">It seems you don't have any tours!</p>
          <Button asChild>
            <Link to="./newTour">Create new tour</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-xl mb-4 text-primary font-bold tracking-wide">
        {numOfTours} tour{numOfTours > 1 ? "'s" : ""} found
      </h2>
      <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {tours.map((tour) => {
          const { _id, title, image, country, city, description } = tour;
          return (
            <Card key={_id}>
              <CardHeader>
                {image && (
                  <img
                    src={image}
                    alt={country}
                    className="h-[17rem] object-cover rounded-lg"
                  />
                )}
                <CardTitle className="block text-primary text-xl">
                  {title}
                </CardTitle>

                <h3>
                  {city}-{country}
                </h3>

                <CardDescription>
                  {description.substring(0, 100)}...
                </CardDescription>
              </CardHeader>
              <CardContent></CardContent>
              <CardFooter className="flex justify-end">
                <Button asChild>
                  <Link to={`./tours/${_id}`}>Check</Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </section>
    </>
  );
};
export default ToursList;
