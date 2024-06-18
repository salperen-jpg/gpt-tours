import { TourResponse, customFetch } from "@/utils";
import { BreadCrumb, SectionTitle, ToursForm, ToursList } from "@/components";
import { LoaderFunction } from "react-router-dom";

export type Params = {
  params: {
    title?: string;
    country?: string;
    city?: string;
    sort?: string;
  };
};

export type ToursData = {
  tours: TourResponse[];
  numOfTours: number;
  currentPage: number;
  totalPageNumber: number;
};

export type ToursDataWithParams = ToursData & Params;

export const loader: LoaderFunction = async ({
  request,
}): Promise<ToursDataWithParams> => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  const { data } = await customFetch<ToursData>("/tours", {
    params,
  });
  return { ...data, params };
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
