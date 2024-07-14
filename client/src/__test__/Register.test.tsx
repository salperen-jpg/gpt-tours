import { ReactElement } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { Register } from "../pages";
import { customFetch } from "@/utils";
import { toast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";

vi.mock("@/utils", () => ({
  customFetch: {
    post: vi.fn(),
  },
}));

vi.mock("@/components/ui/use-toast", () => ({
  toast: vi.fn(),
}));

const getInputs = () => {
  const nameInput = screen.getByLabelText("name");
  const lastNameInput = screen.getByLabelText("lastName");
  const locationInput = screen.getByLabelText(/location/i);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  return { nameInput, lastNameInput, locationInput, emailInput, passwordInput };
};

const renderWithRouter = (ui: ReactElement, { route = "/" } = {}) => {
  const routes = [
    {
      path: "/",
      element: ui,
      action: async ({ request }: { request: Request }) => {
        const formData = await request.formData();
        const data = Object.fromEntries(formData);
        try {
          await customFetch.post("/auth/register", data);
          toast({ description: "Registered successfully!" });
          return { redirect: "/login" };
        } catch (error) {
          const errorMessage =
            error instanceof AxiosError
              ? error.response?.data.msg
              : "registration failed!";
          toast({ description: errorMessage });
          return null;
        }
      },
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: [route],
  });

  return render(<RouterProvider router={router} />);
};

describe("Register Component", () => {
  test("should render the registration form", () => {
    renderWithRouter(<Register />);

    const {
      nameInput,
      lastNameInput,
      locationInput,
      emailInput,
      passwordInput,
    } = getInputs();

    expect(
      screen.getByRole("heading", { name: /register/i })
    ).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(locationInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test("should submit the form successfully", async () => {
    (
      customFetch.post as jest.MockedFunction<typeof customFetch.post>
    ).mockResolvedValueOnce({ status: 200 });

    renderWithRouter(<Register />);
    const {
      nameInput,
      lastNameInput,
      locationInput,
      emailInput,
      passwordInput,
    } = getInputs();

    fireEvent.change(nameInput, { target: { value: "John" } });
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });
    fireEvent.change(locationInput, { target: { value: "NY" } });
    fireEvent.change(emailInput, {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    await waitFor(() => {
      expect(nameInput).toHaveValue("John");
      expect(lastNameInput).toHaveValue("Doe");
      expect(locationInput).toHaveValue("NY");
      expect(emailInput).toHaveValue("john.doe@example.com");
      expect(passwordInput).toHaveValue("password");
    });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(customFetch.post).toHaveBeenCalledWith("/auth/register", {
        name: "John",
        lastName: "Doe",
        location: "NY",
        email: "john.doe@example.com",
        password: "password",
      });
    });

    expect(toast).toHaveBeenCalledWith({
      description: "Registered successfully!",
    });
  });

  test("should show error message on registration failure", async () => {
    (
      customFetch.post as jest.MockedFunction<typeof customFetch.post>
    ).mockRejectedValueOnce({
      response: { data: { msg: "registration failed!" } },
    });

    renderWithRouter(<Register />);

    const {
      nameInput,
      lastNameInput,
      locationInput,
      emailInput,
      passwordInput,
    } = getInputs();

    await userEvent.type(lastNameInput, "Doe");
    await userEvent.type(locationInput, "NY");
    await userEvent.type(emailInput, "john.doe@example.com");
    await userEvent.type(passwordInput, "password");

    await waitFor(() => {
      expect(nameInput).toHaveValue("");
      expect(lastNameInput).toHaveValue("Doe");
      expect(locationInput).toHaveValue("NY");
      expect(emailInput).toHaveValue("john.doe@example.com");
      expect(passwordInput).toHaveValue("password");
    });

    await userEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(customFetch.post).toHaveBeenCalledWith("/auth/register", {
        name: "",
        lastName: "Doe",
        location: "NY",
        email: "john.doe@example.com",
        password: "password",
      });
    });

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith({
        description: "registration failed!",
      });
    });
  });
});
