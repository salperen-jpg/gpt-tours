import SectionTitle from "./SectionTitle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ourServices } from "@/utils";
import SectionSeperator from "./SectionSeperator";
const Services = () => {
  return (
    <>
      <section className="sub-section align-element">
        <SectionTitle title="Our Services" />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {ourServices.map((s) => {
            const { icon, description, service } = s;
            return (
              <Card
                key={service}
                className="text-center flex flex-col justify-center items-center gap-6"
              >
                <div className="text-center mt-6">{icon}</div>
                <CardHeader>
                  <CardTitle className="mb-6">{service}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </section>
      <SectionSeperator />
    </>
  );
};
export default Services;
