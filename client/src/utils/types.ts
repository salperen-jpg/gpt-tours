export type UserResponse = {
  _id: string;
  name: string;
  lastName: string;
  location: string;
  email: string;
  role: string;
  __v: number;
};

export type ChatMessage = {
  content: string | null;
  role: string;
};

export type Tour = {
  city: string;
  country: string;
  title: string;
  description: string;
  stops: string[];
  image: string | null;
};

export type TourResponse = {
  _id: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
} & Tour;

export type User = {
  email: string;
  name: string;
  lastName: string;
  location: string;
  role: string;
};

export type Plan={
  _id?:string;
  title:string,
  cost:number |string,
  tokens:number,
  description:string
}