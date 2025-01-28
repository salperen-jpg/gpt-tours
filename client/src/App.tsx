import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
// pages
import {
  Chat,
  Checkout,
  Error,
  Landing,
  Layout,
  Login,
  NewTour,
  Plans,
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
import { loader as tokenLoader } from "./pages/Profile";
import { loader as checkoutLoader } from "./pages/Checkout";
import { loader as landingLoader } from "./pages/Landing";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorElement } from "./components";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Landing />,
          errorElement: <ErrorElement />,
          action: landingAction,
          loader: landingLoader,
        },
        {
          path: "register",
          element: <Register />,
          action: registerAction,
        },
        {
          path: "login",
          element: <Login />,
          action: loginAction,
        },
        {
          path: "dashboard",
          element: <SharedLayout />,
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
              loader: tokenLoader,
              errorElement: <ErrorElement />,
            },
            {
              path: "newTour",
              element: <NewTour />,
              action: newTourAction(queryClient),
              errorElement: <ErrorElement />,
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
              loader: tokenLoader,
              errorElement: <ErrorElement />,
            },
            {
              path: "plans",
              element: <Plans />,
              loader: checkoutLoader,
              errorElement: <ErrorElement />,
            },
            {
              path: "checkout/:plan",
              element: <Checkout />,
              loader: checkoutLoader,
              errorElement: <ErrorElement />,
            },
          ],
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
