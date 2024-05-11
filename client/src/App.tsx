import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
// pages
import {
  Error,
  Landing,
  Login,
  Profile,
  Register,
  SharedLayout,
  SingleTour,
  Tours,
} from "./pages";
// actions
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
// loader
import { loader as sharedLayoutLoader } from "./pages/SharedLayout";

function App() {
  const router = createBrowserRouter([
    {
      path: "register",
      element: <Register />,
      errorElement: <Error />,
      action: registerAction,
    },
    {
      path: "login",
      element: <Login />,
      errorElement: <Error />,
      action: loginAction,
    },
    {
      path: "/",
      element: <Landing />,
      errorElement: <Error />,
    },
    {
      path: "dashboard",
      element: <SharedLayout />,
      errorElement: <Error />,
      loader: sharedLayoutLoader,
      children: [
        {
          index: true,
          element: <Tours />,
        },
        {
          path: "tours/:id",
          element: <SingleTour />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
