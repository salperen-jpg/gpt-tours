import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { Button } from "./ui/button";
import { FaCheck } from "react-icons/fa6";
import { toast } from "./ui/use-toast";
import { useLoaderData, useNavigate } from "react-router-dom";
import { customFetch, Plan } from "@/utils";
import { CheckoutType } from "@/pages/Checkout";


const CheckoutForm = ({selectedPlan,isSuccessed,setIsSuccessed}:{selectedPlan:Plan,isSuccessed:boolean,setIsSuccessed:(a:boolean)=>void}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<null | string | undefined>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate=useNavigate();
  const {plan}=useLoaderData() as CheckoutType;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
      },
      redirect: "if_required",
    });
 
    if (error?.type === "card_error" || error?.type === "validation_error") {
      setMessage(error?.message || "An unexpected error occurred.");
    }
    toast({description:'Your payment was successfull!'})
    setIsSuccessed(true);
    const response= await customFetch.patch(`/plans/${plan._id}`,selectedPlan)
    console.log(response);
    setTimeout(()=>{
        navigate('/dashboard/plans');
    },5000)
    setIsLoading(false);
  };

    if(isSuccessed){
      return <article className="flex justify-center w-full items-center">
       <div className='mb-4 flex flex-col items-center justify-center  gap-y-3'>
         <span className="h-[3rem] w-[3rem]  text-blue-300 bg-green-400	rounded-full grid place-items-center">
          <FaCheck className="text-3xl text-white" />
          </span>
        <h4>Thank you!</h4>
        <h4>Your payment was successful!</h4>
        <h4>Redirecting to home page shortly</h4>
       </div>
    </article>
    }
    

  return (
  <>
   <form id="payment-form" onSubmit={handleSubmit} >
      <PaymentElement id="payment-element"  />
      <Button  disabled={isLoading || !stripe || !elements} id="submit" className="mt-4 w-full ">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </Button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  </>
  )
}
export default CheckoutForm