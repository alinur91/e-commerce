import { Outlet } from "react-router-dom";
import { Footer, Header } from "@ui/index";

const AuthenticatedLayout = () => {
  return (
    <div className="flex min-h-dvh flex-col items-center">
      <div className="container mx-auto flex-1 border-l-gray-100 border-r-gray-100 shadow-xl lg:border-l-2 lg:border-r-2">
        <Header />
        <main className="w-full">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AuthenticatedLayout;
