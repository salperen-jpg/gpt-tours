import paris from "../assets/paris.jpg";
import london from "../assets/london.jpg";
import istanbul from "../assets/istanbul.jpg";
import rome from "../assets/rome.jpg";
type PopularTour = {
  image: string;
  city: string;
  country: string;
};

export const popularTours: PopularTour[] = [
  {
    image: istanbul,
    city: "Istanbul",
    country: "Turkey",
  },
  {
    image: paris,
    city: "Paris",
    country: "France",
  },
  {
    image: london,
    city: "London",
    country: "England",
  },
  {
    image: rome,
    city: "Rome",
    country: "Italy",
  },
];
