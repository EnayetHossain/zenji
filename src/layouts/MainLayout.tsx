import { Outlet } from "react-router";
import Navbar from "../components/shared/Navbar";

function MainLayout() {
  return (
    <div className="text-[1.6rem] bg-bg text-text">
      <Navbar />
      <main className="flex-1 w-full">
        <div className="mx-auto w-full max-w-[250rem] px-4">
          <Outlet />
        </div>
      </main>
      <footer>footer</footer>
    </div>
  )
}

export default MainLayout;
