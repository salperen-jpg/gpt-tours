import { popularTours } from "@/utils";
import SectionTitle from "./SectionTitle";
import { Link } from "react-router-dom";
import SectionSeperator from "./SectionSeperator";

const MostPopularTours = () => {
  return (
    <>
      <section className="sub-section">
        <SectionTitle title="Popular Tours" />
        <div className="align-element   grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
          {popularTours.map((popularTour) => {
            const { image, city, country } = popularTour;
            return (
              <Link to="/dashboard" key={country}>
                <article
                  className={`image-background h-[23rem] w-full flex flex-col items-center gap-2 justify-end p-4 transition duration-150 hover:scale-110 border-2 border-gray-500 rounded-lg`}
                  style={{
                    backgroundImage: `linear-gradient(to bottom,rgba(0,0,0,0.3),rgba(0,0,0,0.5)),url('${image}')`,
                  }}
                >
                  <span>{city}</span>
                  <span className="text-2xl tracking-wider">{country}</span>
                </article>
              </Link>
            );
          })}
        </div>
      </section>
      <SectionSeperator />
    </>
  );
};
export default MostPopularTours;
