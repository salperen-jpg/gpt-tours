import { toast } from "@/components/ui/use-toast";
import { TourResponse, customFetch } from "@/utils";
import { BreadCrumb, ToursList } from "@/components";
import { AxiosError } from "axios";
import { LoaderFunction } from "react-router-dom";

export type ToursData = {
  tours: TourResponse[];
};

export const loader: LoaderFunction = async (): Promise<ToursData | null> => {
  try {
    const { data } = await customFetch.get<ToursData>("/tours");
    return data;
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
      <ToursList />
    </section>
  );
};
export default Tours;
