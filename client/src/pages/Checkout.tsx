import { customFetch, Plan, plans } from "@/utils";
import { Link, LoaderFunction, useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm, SectionTitle } from "@/components";
import { useDashboardContext } from "@/context";
import { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { RiAlarmWarningFill } from "react-icons/ri";

const stripePromise = loadStripe("pk_test_51Pea6TBQGbKh00RXGelCBf0g1na5oFp9RdpOlAehmqFU55oSKuH6iPgI0QKPkWBjyuMDtyfclteiqoA5KqdaII3v003ENbItd1");

export type PlanResponse={
  plan:Plan
}


export const loader :LoaderFunction= async ()=>{
  try {
    const response= await customFetch.get<PlanResponse>('/plans/current-user-plan');
    return response.data
  } catch (error) {
    return null;
  }
}

const Checkout = () => {
  const {plan}=useParams<{plan:string}>();
  const selectedPlan=plans.find(p=> p.title===plan)!;
  const {theme}=useDashboardContext();
  const [clientSecret, setClientSecret] = useState("");
  const [error,setIsError]=useState<{show:boolean,message:string}>({show:false,message:""});

  const getClientSecret= async ()=>{
    try {
      const response= await customFetch.post('/plans/create-payment-intent',selectedPlan,{
      headers:{
        'Content-Type':"application/json"
      }
    })
    setClientSecret(response.data.clientSecret);
    } catch (error) {
      const errorMessage= error instanceof AxiosError ? error.response?.data.msg : "Something went wrong ,please try again later!";
      setIsError({show:true,message:errorMessage});
    }
  }

  useEffect(() => {
      getClientSecret()
  }, []);

  const appearance : StripeElementsOptions['appearance'] = {
    theme: theme=== 'dark' ? "night": "stripe",
    labels: 'floating'
  };

  const options = {
    clientSecret,
    appearance,
  };

 

  return (
    <section>
      <SectionTitle title="Checkout"/>
      {error.show &&  <div className="h-[30vh] grid place-items-center">
        <div className="flex flex-col justify-center items-center gap-y-4 bg-secondary p-16 rounded-md">
                    <RiAlarmWarningFill className="text-4xl warning" />
              <h2>{error.message}</h2>
              <Button asChild >
                <Link to="/dashboard/plans">Go to Plans</Link>
              </Button>
        </div>
      </div>}
      {/* selected plan */}
      {/* <article></article> */}
      {clientSecret && (
        <Elements options={options}  stripe={stripePromise}>
         <CheckoutForm selectedPlan={selectedPlan}/>
        </Elements>
      )}
    </section>
  )
}
export default Checkout