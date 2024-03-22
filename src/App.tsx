import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  Home,
  Signin,
  Signup,
  ResetPassword,
  ProductPage,
  SearchPage,
} from "./pages";
import { AuthenticatedLayout, ProtectedRoute } from "./ui";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    element: (
      <ProtectedRoute>
        <AuthenticatedLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products/:id",
        element: <ProductPage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
    ],
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
