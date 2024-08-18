import { Plan, SectionTitle } from "@/components"
import { useLoaderData } from "react-router-dom"
import { CheckoutType } from "./Checkout";


const Plans = () => {
  const {allPlans}=useLoaderData() as CheckoutType;

  return (
    <section className="h-[calc(100vh-5rem)]">
     <SectionTitle title="Plans" />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {allPlans.map((plan) => {
            return <Plan key={plan._id} {...plan} dashboard />;
          })}
        </div>
      </section>
  )
}
export default Plans