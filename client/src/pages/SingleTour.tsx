import { BreadCrumb, TourInfo } from "@/components";
import { toast } from "@/components/ui/use-toast";
import { TourResponse, customFetch, generateImage } from "@/utils";
import { AxiosError } from "axios";
import { LoaderFunction, redirect, useLoaderData } from "react-router-dom";

type SingleTourData = {
  tour: TourResponse;
};

type LoaderReturn = {
  tour: TourResponse;
  photoGallery: string[];
};

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderReturn | Response> => {
  const { id } = params;
  try {
    const response = await customFetch<SingleTourData>(`/tours/${id}`);
    const photoGallery = (await generateImage({
      query: response.data.tour.country,
      per_page: 5,
    })) as string[];
    return { tour: response.data.tour, photoGallery };
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
  const data = useLoaderData() as LoaderReturn;
  return (
    <>
      <BreadCrumb
        tourName={`${data.tour.city}-${data.tour.country}`}
        isSingleTourPage
      />
      <TourInfo
        tourInfo={data.tour}
        photoGallery={data.photoGallery}
        isComingFromSingleTourPage
      />
    </>
  );
};
export default SingleTour;
