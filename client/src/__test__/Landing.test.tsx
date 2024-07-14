import { render, screen } from "@testing-library/react";
import {
  Route,
  RouterProvider,
  createMemoryRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { Landing } from "@/pages";

beforeEach(() => {
  let router = createMemoryRouter(
    createRoutesFromElements(<Route path="/" element={<Landing />} />)
  );
  render(<RouterProvider router={router} />);
});

test("renders landing components correctly", () => {
  const button = screen.getByRole("button");

  expect(
    screen.getByText("Unleash Your Wanderlust with AI-Powered Tours")
  ).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});

test("should have 3 section displayed", () => {
  const headings = screen.getAllByRole("heading");
  expect(headings).toHaveLength(9);
});

test("is footer there", () => {
  const footerContent = screen.getByRole("contentinfo");
  expect(footerContent).toBeInTheDocument();
});

test("should render 2 links to navigate register", () => {
  const getStartedButton = screen.getByRole("link", {
    name: /get started/i,
  });
  const loginRegister = screen.getByRole("link", { name: /register/i });

  expect(getStartedButton).toHaveAttribute("href", "/register");
  expect(loginRegister).toHaveAttribute("href", "/register");
  expect(getStartedButton).toBeInTheDocument();
  expect(loginRegister).toBeInTheDocument();
});
