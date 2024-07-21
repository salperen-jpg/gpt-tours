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

const Plan = ({ title, cost, tokenAmount, description }: PlanProp) => {
  return (
    <Card>
      <CardHeader>
        <SiElement className="text-6xl mx-auto mb-4" />
        <CardTitle className="text-center font-extrabold bg-clip-text bg-gradient-to-r from-violet-300 to-fuchsia-300 text-transparent">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h2 className="text-center mb-4 text-2xl">{cost} per month</h2>
        <p className="text-center mb-4">
          {tokenAmount} <span className="text-primary pl-1">tokens</span>
        </p>
        <p className="text-[14px] leading-7 tracking-wide">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button asChild>
          <Link to="/login">Get Started</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
export default Plan;
