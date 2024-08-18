import { convertPrice, customFetch, Plan } from "@/utils";
import { Link, LoaderFunction, useLoaderData, useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm, SectionTitle } from "@/components";
import { useDashboardContext } from "@/context";
import { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { RiAlarmWarningFill } from "react-icons/ri";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { AllPlans } from "./Landing";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export type PlanResponse={
  plan:Plan
}

export type CheckoutType={
  plan:Plan,
  allPlans: Plan[]
}


export const loader :LoaderFunction= async ()=>{
  try {
    const response= await customFetch.get<PlanResponse>('/plans/current-user-plan');
    const responseAllPlans= await customFetch.get<AllPlans>('/plans/allPlans');
    return {plan:response.data.plan,allPlans:responseAllPlans.data.allPlans}
  } catch (error) {
    return null;
  }
}

const Checkout = () => {
  const {allPlans}=useLoaderData() as CheckoutType;
  console.log(allPlans);
  const {plan}=useParams<{plan:string}>();
  const selectedPlan=allPlans.find(p=> p.title===plan)!;
  const {theme}=useDashboardContext();
  const [clientSecret, setClientSecret] = useState("");
  const [error,setIsError]=useState<{show:boolean,message:string}>({show:false,message:""});
    const [isSuccessed,setIsSuccessed]=useState(false);


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

  
  if(!selectedPlan){
    return <div className="h-[30vh] grid place-items-center">
        <div className="flex flex-col justify-center items-center gap-y-4 bg-secondary p-16 rounded-md">
                    <RiAlarmWarningFill className="text-4xl warning" />
              <h2>Selected plan is not matching with any plans!</h2>
              <Button asChild >
                <Link to="/dashboard/plans">Go to Plans</Link>
              </Button>
        </div>
      </div>
    }
  

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
      <div className="w-full flex justify-center align-center gap-x-8">
        {!isSuccessed && <Card className="flex-1">
        <CardHeader>
          <CardTitle className="text-primary">{selectedPlan.title } Plan</CardTitle>
          <h1 className=" font-bold">  {selectedPlan.tokens} tokens</h1>      
        </CardHeader>
        <CardContent>
          <p className="max-w-[25rem]">{selectedPlan.description}</p>
        </CardContent>
        
        <p className="px-6 text-[1.3rem]"> Total :  <span className='text-primary'>{convertPrice(selectedPlan.cost as number)}</span></p> 
      
      </Card>}
      {clientSecret && (
        <div className='flex-1'>
        <Elements options={options}  stripe={stripePromise} >
         <CheckoutForm selectedPlan={selectedPlan} isSuccessed={isSuccessed} setIsSuccessed={setIsSuccessed} />
        </Elements>
        </div>
          
      )}
      </div>
    </section>
  )
}
export default Checkout