import { Tour, TourResponse } from "@/utils";

type TourInfoProps = {
  tourInfo: TourResponse;
};

const TourInfo = ({ tourInfo }: TourInfoProps) => {
  const { city, description, stops, title, country } = tourInfo;
  // re-write css after adding the image
  return (
    <section>
      <div>
        <h1>
          {city}/{country}
        </h1>
        <h2 className="text-primary">{title}</h2>
        <p>{description}</p>
        <div>
          <span>Activities</span>
          <ul>
            {stops.map((act) => {
              return <li key={act}>{act}</li>;
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};
export default TourInfo;
