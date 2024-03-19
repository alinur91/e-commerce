import { Outlet } from "react-router-dom";
import { Footer, Header } from "@ui/index";

const AuthenticatedLayout = () => {
  const isLoading = false;

  if (isLoading) {
    return "Loading...";
  }

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      <Header />

      <div className="overflow-scroll">
        <main className="mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default AuthenticatedLayout;
