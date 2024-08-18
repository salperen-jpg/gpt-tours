import SectionSeperator from "./SectionSeperator";
import SectionTitle from "./SectionTitle";
import Plan from "./Plan";
import { useLoaderData } from "react-router-dom";
import { AllPlans } from "@/pages/Landing";

const Plans = () => {
  const {allPlans}= useLoaderData() as AllPlans;
  return (
    <>
      <section className="sub-section align-element">
        <SectionTitle title="Plans" />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {allPlans.map((plan) => {
            return <Plan key={plan._id} {...plan} />;
          })}
        </div>
      </section>
      <SectionSeperator />
    </>
  );
};
export default Plans;
