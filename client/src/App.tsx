import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  Landing,
  Login,
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
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "dashboard",
      element: <SharedLayout />,
      children: [
        {
          path: "tours",
          element: <Tours />,
        },
        {
          path: "tours/:id",
          element: <SingleTour />,
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
