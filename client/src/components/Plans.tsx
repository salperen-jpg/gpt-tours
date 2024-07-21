import { plans } from "@/utils";
import SectionSeperator from "./SectionSeperator";
import SectionTitle from "./SectionTitle";
import Plan from "./Plan";

const Plans = () => {
  return (
    <>
      <section className="sub-section align-element">
        <SectionTitle title="Plans" />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => {
            return <Plan key={plan.id} {...plan} />;
          })}
        </div>
      </section>
      <SectionSeperator />
    </>
  );
};
export default Plans;
