import { FormInput, FormSelect } from ".";
import { Form, Link, useLoaderData } from "react-router-dom";
import { Button } from "./ui/button";
import { ToursDataWithParams } from "@/pages/Tours";

const ToursForm = () => {
  const { params } = useLoaderData() as ToursDataWithParams;
  const { title, country, city, sort } = params;
  return (
    <Form className="shadow-sm border rounded-md p-6 mb-16 ">
      <div className="grid gap-4 lg:grid-cols-3 items-end">
        <FormInput
          type="search"
          name="title"
          label="Tour's title"
          required={false}
          defaultValue={title}
        />
        <FormInput type="text" name="country" defaultValue={country} />
        <FormInput
          type="text"
          name="city"
          defaultValue={city}
          required={false}
        />
        <FormSelect
          name="sort"
          options={["a-z", "z-a", "newest", "oldest"]}
          defaultValue={sort}
        />
        <Button type="submit" variant="default">
          Search
        </Button>
        <Button type="submit" asChild variant="outline">
          <Link to="/dashboard">Clear</Link>
        </Button>
      </div>
    </Form>
  );
};
export default ToursForm;
