import { ReactElement } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { Login } from "../pages";
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
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  return { emailInput, passwordInput };
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
          await customFetch.post("/auth/login", data);
          toast({ description: "Logged in successfully!" });
          return { redirect: "/dashboard" };
        } catch (error) {
          const errorMessage =
            error instanceof AxiosError
              ? error.response?.data.msg
              : "login failed!";
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

describe("Login Component", () => {
  test("should render the registration form", () => {
    renderWithRouter(<Login />);

    const { emailInput, passwordInput } = getInputs();

    expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it("navigates to register", () => {
    renderWithRouter(<Login />);
    const registerLink = screen.getByRole("link", { name: /register/i });
    expect(registerLink).toHaveAttribute("href", "/register");
  });

  test("should submit the form successfully", async () => {
    (
      customFetch.post as jest.MockedFunction<typeof customFetch.post>
    ).mockResolvedValueOnce({ status: 200 });

    renderWithRouter(<Login />);
    const { emailInput, passwordInput } = getInputs();

    fireEvent.change(emailInput, {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    await waitFor(() => {
      expect(emailInput).toHaveValue("john.doe@example.com");
      expect(passwordInput).toHaveValue("password");
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(customFetch.post).toHaveBeenCalledWith("/auth/login", {
        email: "john.doe@example.com",
        password: "password",
      });
    });

    expect(toast).toHaveBeenCalledWith({
      description: "Logged in successfully!",
    });
  });

  test("should show error message on registration failure", async () => {
    (
      customFetch.post as jest.MockedFunction<typeof customFetch.post>
    ).mockRejectedValueOnce({
      response: { data: { msg: "login failed!" } },
    });

    renderWithRouter(<Login />);

    const { emailInput, passwordInput } = getInputs();

    await userEvent.type(emailInput, "john.doe@example.com");
    await userEvent.type(passwordInput, "password");

    await waitFor(() => {
      expect(emailInput).toHaveValue("john.doe@example.com");
      expect(passwordInput).toHaveValue("password");
    });

    await userEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(customFetch.post).toHaveBeenCalledWith("/auth/login", {
        email: "john.doe@example.com",
        password: "password",
      });
    });

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith({
        description: "login failed!",
      });
    });
  });
});
