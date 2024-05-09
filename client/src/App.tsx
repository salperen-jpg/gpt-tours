import { RouterProvider, createBrowserRouter } from "react-router-dom";
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

function App() {
  const router = createBrowserRouter([
    {
      path: "register",
      element: <Register />,
      errorElement: <Error />,
    },
    {
      path: "login",
      element: <Login />,
      errorElement: <Error />,
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
    </>
  );
}

export default App;
