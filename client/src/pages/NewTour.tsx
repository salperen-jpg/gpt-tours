import { FormInput, TourInfo } from "@/components";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  CityCountryParam,
  Tour,
  TourResponse,
  createNewTour,
  customFetch,
  generateImage,
} from "@/utils";
import { ActionFunction, Form, useActionData } from "react-router-dom";
import { useNavigation } from "react-router-dom";

type IsTourExisting = {
  tour: TourResponse | null;
};

export const action: ActionFunction = async ({
  request,
}): Promise<TourResponse | Tour | null> => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const { city, country } = data as CityCountryParam;
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
    const tourImage = await generateImage(country);
    generateNewTourAI.image = tourImage;
    await customFetch.post("/tours", generateNewTourAI);
    toast({ description: "tour saved to db!" });
    return generateNewTourAI;
  } catch (error) {
    console.log(error);
    toast({ description: "something went wrong,try again later!" });
    return null;
  }
};

const NewTour = () => {
  const newTour = useActionData() as TourResponse;
  const isSubmitted = useNavigation().state === "submitting";

  return (
    <section>
      <Form method="post">
        <FormInput type="text" name="city" />
        <FormInput type="text" name="country" />
        <Button variant="default" disabled={isSubmitted}>
          Add tour
        </Button>
      </Form>
      {newTour && <TourInfo tourInfo={newTour} />}
    </section>
  );
};
export default NewTour;