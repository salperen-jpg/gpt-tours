import { Plan } from "../controllers/planController.js";
import AllPlans from "../models/allPlansModel.js";

const isPlanValid = async (newPlan: Plan) => {
  const newPlanDB = await AllPlans.findOne({
    title: newPlan.title,
    cost: newPlan.cost,
    tokens: newPlan.tokens,
  });
  if (
    !newPlanDB ||
    newPlan.title !== newPlanDB.title ||
    newPlan.cost !== newPlanDB.cost ||
    newPlan.tokens !== newPlanDB.tokens
  ) {
    return false;
  }
  return true;
};

export { isPlanValid };
