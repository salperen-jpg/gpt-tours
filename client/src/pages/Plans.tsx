import { Plan, SectionTitle } from "@/components"
import { plans } from "@/utils"


const Plans = () => {
 

  return (
    <section className="h-[calc(100vh-5rem)]">
     <SectionTitle title="Plans" />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => {
            return <Plan key={plan.id} {...plan} dashboard />;
          })}
        </div>
      </section>
  )
}
export default Plans