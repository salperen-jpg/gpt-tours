import { TourResponse } from "@/utils";
import { MdTour } from "react-icons/md";

type TourInfoProps = {
  tourInfo: TourResponse;
};

const TourInfo = ({ tourInfo }: TourInfoProps) => {
  const { city, description, stops, title, country, image } = tourInfo;
  return (
    <>
      <h1 className="mb-8 text-primary text-2xl tracking-wide">
        {city}-{country}
      </h1>
      <section className="grid gap-8 lg:grid-cols-2 gap-x-12">
        {image && (
          <img
            src={image}
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
    </>
  );
};
export default TourInfo;
