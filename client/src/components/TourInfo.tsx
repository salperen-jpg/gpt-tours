import { TourResponse } from "@/utils";
import { MdTour } from "react-icons/md";
import { Button } from "./ui/button";
import { Form } from "react-router-dom";
import PhotoGallery from "./PhotoGallery";
import Map from "./Map";

type TourInfoProps = {
  tourInfo: TourResponse;
  isComingFromSingleTourPage?: boolean;
  photoGallery?: string[];
};

const TourInfo = ({
  tourInfo,
  photoGallery,
  isComingFromSingleTourPage,
}: TourInfoProps) => {
  const {
    _id,
    city,
    description,
    stops,
    title,
    country,
    image,
    locations,
    stopNames,
  } = tourInfo;
  return (
    <>
      <h1 className="mb-8 text-primary text-2xl tracking-wide">
        {city}-{country}
      </h1>
      <section
        className={`grid gap-8 lg:grid-cols-2 gap-x-12 ${
          isComingFromSingleTourPage ? "lg:grid-cols-[1.5fr,1fr]" : ""
        }`}
      >
        {isComingFromSingleTourPage ? (
          <PhotoGallery photoGallery={photoGallery as string[]} />
        ) : (
          <img
            src={image ?? ""}
            alt={country}
            className="rounded-lg bg-opacity-85 lg:max-h-[500px] lg:min-w-[500px] lg:object-cover"
          />
        )}
        <div>
          <h1 className="text-primary mb-4 font-semibold">{title}</h1>
          <p className="leading-7 mb-4">{description}</p>
          <div>
            <span className="block text-primary mb-4">Activities</span>
            <ul>
              {stops.map((act) => {
                return (
                  <li key={act} className="flex items-center gap-x-4 mb-4">
                    <MdTour className="text-green-500 w-8 h-8" />
                    <span>{act}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
      <article className="mt-16">
        <Map locations={locations} stopNames={stopNames} />
      </article>
      {isComingFromSingleTourPage && (
        <Form
          method="POST"
          action={`../tours/deleteTour/${_id}`}
          className="mt-8 flex justify-end "
        >
          <Button type="submit" className="bg-red-400 hover:bg-red-600">
            Remove Tour
          </Button>
        </Form>
      )}
    </>
  );
};
export default TourInfo;
