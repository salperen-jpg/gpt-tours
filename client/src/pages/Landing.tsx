import {
  ContactUs,
  HeroImages,
  LandingFooter,
  Questions,
  Services,
} from "@/components";
import MostPopularTours from "@/components/MostPopularTours";

const Landing = () => {
  return (
    <>
      <HeroImages />
      <MostPopularTours />
      <Services />
      <Questions />
      <ContactUs />
      <LandingFooter />
    </>
  );
};
export default Landing;
