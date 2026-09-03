import { Outlet } from "react-router";
import Navbar from "../components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { LoadingProvider } from "@/context/LoadingContext";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";

function MainLayout() {
  return (
    <LoadingProvider>
      <LoadingScreen />
      <CustomCursor />
      <div className="text-[1.6rem] bg-bg text-text min-h-screen">
        <Navbar />
        <main className="flex-1 w-full">
          <div className="mx-auto w-full max-w-[250rem] px-6">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </LoadingProvider>
  );
}

export default MainLayout;
