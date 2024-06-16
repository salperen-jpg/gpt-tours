import { toast } from "@/components/ui/use-toast";
import { TourResponse, customFetch } from "@/utils";
import { BreadCrumb, SectionTitle, ToursForm, ToursList } from "@/components";
import { AxiosError } from "axios";
import { LoaderFunction } from "react-router-dom";

type Params = {
  title: string;
  country: string;
  city: string;
  sort: string;
};

export type ToursData = {
  tours: TourResponse[];
  numOfTours: number;
  currentPage: number;
  totalPageNumber: number;
} & Params;

export const loader: LoaderFunction = async ({
  request,
}): Promise<ToursData | null> => {
  const searchParams = new URL(request.url).searchParams;
  const params = Object.fromEntries(searchParams.entries());
  try {
    const { data } = await customFetch.get<ToursData>("/tours", {
      params,
    });
    console.log(params);
    console.log(data);
    return { ...data, ...params };
  } catch (error) {
    const errorMessage =
      error instanceof AxiosError
        ? error?.response?.data.msg
        : "something went wrong!";
    toast({ description: errorMessage });
    return null;
  }
};

const Tours = () => {
  return (
    <section>
      <BreadCrumb currentPage="tours" />
      <ToursForm />
      <SectionTitle title="Tours" />
      <ToursList />
    </section>
  );
};
export default Tours;
