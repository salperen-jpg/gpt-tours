import { nanoid } from "nanoid";

 type Plan = {
  id: string;
  title: string;
  cost: string | number;
  tokens: number;
  description: string;
};

export const plans: Plan[] = [
  {
    id: nanoid(),
    title: "Starter",
    cost: "Free",
    tokens: 1000,
    description:
      "Ideal for beginners, allowing basic interaction with the chat and tour creation.",
  },
  {
    id: nanoid(),
    title: "Basic",
    cost: 300,
    tokens: 10000,
    description:
      "Suitable for regular users needing more interactions and tour creation.",
  },
  {
    id: nanoid(),
    title: "Advanced",
    cost: 500,
    tokens: 20000,
    description:
      "Perfect for users requiring extensive interaction and comprehensive tours.",
  },
];
