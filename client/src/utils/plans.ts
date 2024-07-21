import { nanoid } from "nanoid";

export type Plan = {
  id: string;
  title: string;
  cost: string | number;
  tokenAmount: number;
  description: string;
};

export const plans: Plan[] = [
  {
    id: nanoid(),
    title: "Starter",
    cost: "Free",
    tokenAmount: 1000,
    description:
      "Ideal for beginners, allowing basic interaction with the chat and tour creation.",
  },
  {
    id: nanoid(),
    title: "Basic",
    cost: 300,
    tokenAmount: 10000,
    description:
      "Suitable for regular users needing more interactions and tour creation.",
  },
  {
    id: nanoid(),
    title: "Advanced",
    cost: 500,
    tokenAmount: 20000,
    description:
      "Perfect for users requiring extensive interaction and comprehensive tours.",
  },
];
