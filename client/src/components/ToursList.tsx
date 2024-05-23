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
const ToursList = () => {
  const { tours } = useLoaderData() as ToursData;
  console.log(tours);
  return (
    <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {tours.map((tour) => {
        const { _id, image, country, city, description } = tour;
        return (
          <Card>
            <CardHeader>
              {image && (
                <img
                  src={image}
                  alt={country}
                  className="h-[17rem] object-cover rounded-lg"
                />
              )}
              <CardTitle className="block text-primary">
                {city}-{country}
              </CardTitle>
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
  );
};
export default ToursList;
