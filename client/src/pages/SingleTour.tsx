import { TourInfo } from "@/components";
import { toast } from "@/components/ui/use-toast";
import { TourResponse, customFetch } from "@/utils";
import { AxiosError } from "axios";
import { LoaderFunction, redirect, useLoaderData } from "react-router-dom";

type SingleTourData = {
  tour: TourResponse;
};

export const loader: LoaderFunction = async ({
  params,
}): Promise<TourResponse | Response> => {
  const { id } = params;
  try {
    const response = await customFetch<SingleTourData>(`/tours/${id}`);
    return response.data.tour;
  } catch (error) {
    const errorResponse =
      error instanceof AxiosError
        ? error.response?.data.msg
        : "something went wrong";
    toast({ description: errorResponse });
    return redirect("./tours");
  }
};

const SingleTour = () => {
  const tour = useLoaderData() as TourResponse;
  return (
    <>
      <TourInfo tourInfo={tour} />
    </>
  );
};
export default SingleTour;
