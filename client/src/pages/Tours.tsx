import { TourResponse, customFetch } from "@/utils";
import {
  BreadCrumb,
  Pagination,
  SectionTitle,
  ToursForm,
  ToursList,
} from "@/components";
import { LoaderFunction, useLoaderData } from "react-router-dom";

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
  const { tours, params } = useLoaderData() as ToursDataWithParams;
  if (tours.length < 1 && Object.keys(params).length === 0) {
    return (
      <>
        <BreadCrumb currentPage="tours" />
        <SectionTitle title="Tours" />
        <ToursList />
      </>
    );
  }
  return (
    <section>
      <BreadCrumb currentPage="tours" />
      <ToursForm />
      <SectionTitle title="Tours" />
      <ToursList />
      <Pagination />
    </section>
  );
};
export default Tours;
