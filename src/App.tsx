import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthenticatedLayout, ProtectedRoute } from "./ui";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthenticationPagesEnum } from "@ts-types/enums";
import {
  AuthPage,
  Home,
  ProductPage,
  SearchPage,
  ProfilePage,
  OrderPage,
  OrderPlacedPage,
} from "@pages/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AuthenticatedLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products/:id",
        element: <ProductPage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "order",
        element: <OrderPage />,
      },
      {
        path: "order/:id",
        element: <OrderPlacedPage />,
      },
    ],
  },
  {
    path: "/signin",
    element: <AuthPage pageType={AuthenticationPagesEnum.Signin} />,
  },
  {
    path: "/signup",
    element: <AuthPage pageType={AuthenticationPagesEnum.Signup} />,
  },
  {
    path: "/reset-password",
    element: <AuthPage pageType={AuthenticationPagesEnum.Reset_Password} />,
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
