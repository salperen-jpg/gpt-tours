import { StatusCodes } from "http-status-codes";
import Plan from "../models/planModel.js";
import Token from "../models/tokenModel.js";
import stripe from 'stripe';
import AllPlans from "../models/allPlansModel.js";
import dotenv from "dotenv";
import { BadRequestError } from "../errors/customErrors.js";
import { isPlanValid } from "../utils/planUtils.js";
dotenv.config();

const stripeInstant=stripe(process.env.STRIPE_SECRET_KEY);

const getAllPlans= async(req,res)=>{
  const allPlans= await AllPlans.find();
  console.log(allPlans);
  res.status(StatusCodes.OK).json({allPlans})
}

// attach with admin route , admin can see all the tariffs associated to user.
const getPlans = async (req, res) => {
  const plans = await Plan.find({});
  console.log(plans);
  res.json({ plans });
};

const createPlan = async (req, res) => {
  const starterPlan = {
    title: "Starter",
    cost: "Free",
    tokens: 1000,
    description:
      "Ideal for beginners, allowing basic interaction with the chat and tour creation.",
  };
  starterPlan.planOwner = req.userTokenId;
  const plans = await Plan.create(starterPlan);
  console.log(plans);
  res.status(StatusCodes.CREATED).json({ msg: "User created!" });
};

const getSinglePlan= async(req,res)=>{
  const planId=req.params.id;
  const plan= await Plan.findById(planId);
  console.log(plan);
  res.status(StatusCodes.OK).json({plan})
}

const updatePlan = async (req, res) => {
  const newPlan=req.body;
  const isValid=await isPlanValid(newPlan)
  if(!isValid) throw new BadRequestError('Requsted plan did not match any existing plans!')
  await Plan.findOneAndUpdate({planOwner:req.user.userId},req.body,{new:true});
 await Token.findOneAndUpdate({tokenOwner:req.user.userId},{tokenAmount:newPlan.tokens});
  res.status(StatusCodes.OK).json({ msg: "Plan updated!" });
};

const createPaymentIntent= async(req,res)=>{
  const newPlan=req.body;
  const isValid=await isPlanValid(newPlan)
  if(!isValid) throw new BadRequestError('Requsted plan did not match any existing plans!')
  const paymentIntent= await stripeInstant.paymentIntents.create({
    amount:300,
    currency:"usd",
    automatic_payment_methods:{
      enabled:true
    }
  })
  res.status(StatusCodes.OK).json({ clientSecret: paymentIntent.client_secret });
}

const getCurrentUserPlan=async(req,res)=>{
  const currentUserPlan= await Plan.findOne({planOwner:req.user.userId});
  return res.status(StatusCodes.OK).json({plan:currentUserPlan})
}

export { getPlans, createPlan, updatePlan,getSinglePlan,createPaymentIntent,getAllPlans,getCurrentUserPlan};
