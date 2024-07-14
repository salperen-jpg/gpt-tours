import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import ContactUs from "../components/ContactUs";
import { useNavigation, useActionData } from "react-router-dom";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigation: vi.fn(),
    useActionData: vi.fn(),
    Form: actual.Form,
  };
});

vi.mock("./LandingAfterFormState", () => ({
  LandingAfterFormState: () => (
    <div> Your message has been submitted successfully!</div>
  ),
}));

describe("Success state", () => {
  it("renders success state after form submission", async () => {
    (useActionData as jest.Mock).mockReturnValue(true);
    (useNavigation as jest.Mock).mockReturnValue({ state: "idle" });

    render(<ContactUs />);

    expect(screen.getByText(/success/i)).toBeInTheDocument();
  });
});

describe("After form submission", () => {
  it("should not render forms", async () => {
    (useNavigation as jest.Mock).mockReturnValue({ state: "idle" });

    (useActionData as jest.Mock).mockReturnValue(true);

    render(<ContactUs />);

    expect(
      screen.getByText(/Your message has been submitted successfully!/i)
    ).toBeInTheDocument();

    expect(screen.queryByPlaceholderText("Subject")).toBeNull();
    expect(screen.queryByPlaceholderText("example@gmail.com")).toBeNull();
    expect(screen.queryByPlaceholderText("Type your message...")).toBeNull();
  });
});
