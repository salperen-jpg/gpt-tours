import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
// pages
import {
  Chat,
  Error,
  Landing,
  Login,
  NewTour,
  Profile,
  Register,
  SharedLayout,
  SingleTour,
  Tours,
} from "./pages";
// actions
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as newTourAction } from "./pages/NewTour";
import { default as deleteTourAction } from "./pages/DeleteTour";
import { action as profileAction } from "./pages/Profile";
import { action as landingAction } from "./components/ContactUs";
// loader
import { loader as sharedLayoutLoader } from "./pages/SharedLayout";
import { loader as toursLoader } from "./pages/Tours";
import { loader as singleTourLoader } from "./pages/SingleTour";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
function App() {
  const queryClient = new QueryClient();

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
      action: landingAction,
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
          loader: toursLoader,
        },
        {
          path: "chat",
          element: <Chat />,
          loader: toursLoader,
        },
        {
          path: "newTour",
          element: <NewTour />,
          action: newTourAction,
        },
        {
          path: "tours/:id",
          element: <SingleTour />,
          loader: singleTourLoader,
        },
        {
          path: "tours/deleteTour/:id",
          action: deleteTourAction,
        },
        {
          path: "profile",
          element: <Profile />,
          action: profileAction,
        },
      ],
    },
  ]);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
      <Toaster />
    </>
  );
}

export default App;
