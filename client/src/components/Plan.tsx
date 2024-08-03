import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plan as PlanProp } from "@/utils";
import { SiElement } from "react-icons/si";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { convertPrice } from "@/utils";
type PlanProps= PlanProp & {dashboard?:boolean}

const Plan = ({ title, cost, tokens, description,dashboard }: PlanProps) => {
  return (
    <Card>
      <CardHeader>
        <SiElement className="text-6xl mx-auto mb-4" />
        <CardTitle className="text-center font-extrabold bg-clip-text bg-gradient-to-r from-violet-300 to-fuchsia-300 text-transparent">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h2 className="text-center mb-4 text-2xl">
          {typeof cost === 'string' ? "Free" : convertPrice(cost)}
        </h2>
        <p className="text-center mb-4">
          {tokens} <span className="text-primary pl-1">tokens</span>
        </p>
        <p className="text-[14px] leading-7 tracking-wide">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-center">
       {
        dashboard  ? title ==='Starter' ? <Button disabled >Active</Button> : <Button asChild>
          <Link to={`/dashboard/checkout/${title}`}>Get the plan</Link>
          </Button> :  <Button asChild>
          <Link to="/login">Get Started</Link>
        </Button>
       }
      </CardFooter>
    </Card>
  );
};
export default Plan;
