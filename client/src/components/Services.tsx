import SectionTitle from "./SectionTitle";
import {
  Card,
  CardDescription,
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
              <Card key={service} className="p-4 text-center group">
                <div className="flex justify-center pt-6">{icon}</div>
                <CardHeader>
                  <CardTitle className="mb-4">{service}</CardTitle>
                  <CardDescription className="leading-7">
                    {description}
                  </CardDescription>
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
