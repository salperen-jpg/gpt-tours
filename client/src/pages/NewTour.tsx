import {
  BreadCrumb,
  FormInput,
  LoadingSkeletonNewTour,
  TourInfo,
} from "@/components";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import useTokenAmount from "@/hooks/useToken";
import {
  CityCountryParam,
  Tour,
  TourResponse,
  capitalizeCityAndCountry,
  convertToLatitudeAndLongitude,
  createNewTour,
  customFetch,
  generateImage,
} from "@/utils";
import { QueryClient } from "@tanstack/react-query";
import { ActionFunction, Form, useActionData } from "react-router-dom";
import { useNavigation } from "react-router-dom";

type IsTourExisting = {
  tour: TourResponse | null;
};

export const action =
  (queryClient: QueryClient): ActionFunction =>
  async ({ request }): Promise<TourResponse | Tour | null> => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    let { city, country } = data as CityCountryParam;
    city = capitalizeCityAndCountry(city);
    country = capitalizeCityAndCountry(country);
    try {
      const {
        data: { tour },
      } = await customFetch.get<IsTourExisting>(`/tours/${city}/${country}`);
      if (tour) {
        toast({ description: "tour already exists!" });
        return tour;
      }
      const generateNewTourAI = await createNewTour({ city, country });
      if (!generateNewTourAI) {
        toast({ description: "tour can not be generated!" });
        return null;
      }
      const tourImage = await generateImage({ query: country });
      generateNewTourAI.tour!.image = tourImage as string;
      const locations = await convertToLatitudeAndLongitude(
        generateNewTourAI.tour!.stopNames
      );
      if (locations) generateNewTourAI.tour!.locations = locations;
      await customFetch.post("/tours", generateNewTourAI.tour);
      const { total_tokens } = generateNewTourAI;
      const { data } = await customFetch.patch<{ msg: string; token: number }>(
        "/token",
        {
          usedToken: total_tokens,
        }
      );
      toast({
        description: `tour saved to db! ,your current token amount is ${data?.token}`,
      });
      queryClient.invalidateQueries({ queryKey: ["token"] });
      return generateNewTourAI.tour;
    } catch (error) {
      toast({ description: "something went wrong,try again later!" });
      return null;
    }
  };

const NewTour = () => {
  const newTour = useActionData() as TourResponse;
  const isSubmitted = useNavigation().state === "submitting";
  const { isPending, data: tokenAmount } = useTokenAmount();

  const isTokenThere = tokenAmount ?? 0;
  const isTokenEnough = isTokenThere < 300;

  if (isSubmitted) {
    return (
      <>
        <BreadCrumb currentPage="new tour" />
        <Form
          method="post"
          className="border-[1px] border-primary border-solid rounded-md p-6 mb-16 "
        >
          <h4 className="text-primary text-center capitalize font-medium tracking-wide mb-4">
            Create new tour
          </h4>
          <div className="grid gap-4 lg:grid-cols-3 items-end">
            <FormInput type="text" name="city" />
            <FormInput type="text" name="country" />
            <Button variant="default" disabled={isSubmitted}>
              {isPending || isSubmitted ? "loading" : "Add Tour"}
            </Button>
          </div>
        </Form>
        <LoadingSkeletonNewTour />
      </>
    );
  }

  return (
    <>
      <BreadCrumb currentPage="new tour" />
      <section>
        <Form
          method="post"
          className="border-[1px] border-primary border-solid rounded-md p-6 mb-16 "
        >
          <h4 className="text-primary text-center capitalize font-medium tracking-wide mb-4">
            Create new tour
          </h4>
          <div className="grid gap-4 lg:grid-cols-3 items-end">
            <FormInput type="text" name="city" />
            <FormInput type="text" name="country" />
            <Button variant="default" disabled={isSubmitted || isTokenEnough}>
              Add tour
            </Button>
          </div>
          {isTokenEnough && (
            <small className="block text-red-500 mt-4">
              You don't have enough token!
            </small>
          )}
        </Form>
        {newTour && <TourInfo tourInfo={newTour} />}
      </section>
    </>
  );
};
export default NewTour;
