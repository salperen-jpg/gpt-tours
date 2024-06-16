import { FormInput, FormSelect } from ".";
import { Form, useLoaderData } from "react-router-dom";
import { Button } from "./ui/button";
import { ToursData } from "@/pages/Tours";

const ToursForm = () => {
  const data = useLoaderData() as ToursData;
  const { title, country, city, sort } = data;
  return (
    <Form className="shadow-sm border rounded-md p-6 mb-16 ">
      <h2 className="text-primary text-2xl  capitalize font-medium tracking-wide mb-4">
        filters
      </h2>
      <div className="grid gap-4 lg:grid-cols-3 items-end">
        <FormInput
          type="text"
          name="title"
          labelTitle="Tour's title"
          required={false}
          defaultValue={title ?? ""}
        />
        <FormInput
          type="text"
          name="country"
          required={false}
          defaultValue={country ?? ""}
        />
        <FormInput
          type="text"
          name="city"
          defaultValue={city ?? ""}
          required={false}
        />
        <FormSelect
          name="sort"
          options={["a-z", "z-a", "newest", "oldest"]}
          defaultValue={sort}
        />
        <Button variant="default">Search</Button>
        <Button variant="default" className="bg-red-400">
          Clear
        </Button>
      </div>
    </Form>
  );
};
export default ToursForm;
