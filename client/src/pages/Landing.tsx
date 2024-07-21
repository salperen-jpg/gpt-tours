import {
  ContactUs,
  HeroImages,
  LandingFooter,
  Plans,
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
      <Plans />
      <ContactUs />
      <LandingFooter />
    </>
  );
};
export default Landing;
