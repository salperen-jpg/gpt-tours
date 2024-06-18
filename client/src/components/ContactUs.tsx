import {
  ActionFunction,
  Form,
  useActionData,
  useNavigation,
} from "react-router-dom";
import SectionTitle from "./SectionTitle";
import { Button } from "./ui/button";
import FormInput from "./FormInput";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import SectionSeperator from "./SectionSeperator";
import { customFetch } from "@/utils";
import { AxiosError } from "axios";
import { toast } from "./ui/use-toast";
import { LandingLoadingState } from ".";
import { LandingAfterFormState } from ".";

export const action: ActionFunction = async ({ request }): Promise<boolean> => {
  const formData = await request.formData();
  const contactData = Object.fromEntries(formData);
  try {
    await customFetch.post("/queries", contactData);
    await new Promise((resolve) => setTimeout(() => resolve(""), 3000));
    return true;
  } catch (error) {
    const errorMessage =
      error instanceof AxiosError
        ? error.response?.data.msg
        : "something went wrong!";
    toast({ description: errorMessage });
    return false;
  }
};

const ContactUs = () => {
  const { state } = useNavigation();
  const isSubmitting = state === "submitting";
  const isFormSubmittedSuccesffuly = useActionData() as boolean;
  if (isSubmitting) {
    return <LandingLoadingState />;
  }

  if (isFormSubmittedSuccesffuly) {
    return <LandingAfterFormState />;
  }

  return (
    <>
      <section className="sub-section align-element max-w-2xl">
        <SectionTitle title="Contact Us" />
        <p className="text-center p-4 max-w-[30rem] mb-12 leading-7 mx-auto">
          Questions about our products/services,application or just want to say
          hello ? We're here to help.
        </p>
        <Form method="POST">
          <div className="mb-6 grid gap-6 grid-cols-1 sm:grid-cols-2">
            <FormInput
              name="title"
              label="Subject"
              type="text"
              placeholder="Tour creation"
            />
            <FormInput
              name="email"
              type="email"
              placeholder="example@gmail.com"
            />
          </div>
          <div className="mb-6">
            <Label id="message" className="block mb-2">
              Your message
            </Label>
            <Textarea name="message" placeholder="Type your message..." />
          </div>
          <Button className="w-full">Send message</Button>
        </Form>
      </section>
      <SectionSeperator />
    </>
  );
};
export default ContactUs;
