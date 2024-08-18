import {
  ContactUs,
  HeroImages,
  LandingFooter,
  Plans,
  Questions,
  Services,
} from "@/components";
import MostPopularTours from "@/components/MostPopularTours";
import { toast } from "@/components/ui/use-toast";
import { customFetch, Plan } from "@/utils";
import { AxiosError } from "axios";
import { LoaderFunction } from "react-router-dom";

export type AllPlans={
  allPlans: Plan[]
}

export const loader:LoaderFunction=async()=>{
  try {
    const response= await customFetch.get<AllPlans>('/plans/allPlans');
    return response.data;
  } catch (error) {
    const errorMessage=error instanceof AxiosError ? error.response?.data.msg : 'something went wrong!';
    toast({description:errorMessage});
    return null;
}
}

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
