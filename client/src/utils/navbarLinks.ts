import { nanoid } from "nanoid";

type Link = {
  id: string;
  path: string;
  label: string;
};

export const links: Link[] = [
  {
    id: nanoid(),
    path: ".",
    label: "tours",
  },
  {
    id: nanoid(),
    path: "newTour",
    label: "new tour",
  },
  {
    id: nanoid(),
    path: "chat",
    label: "chat",
  },
  {
    id: nanoid(),
    path: "profile",
    label: "profile",
  },
 {
    id: nanoid(),
    path: "plans",
    label: "plans",
  }
  
  // {
  //   id: nanoid(),
  //   path: "calendar",
  //   label: "calendar",
  // },
];
