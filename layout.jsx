import { Outlet } from "react-router-dom";
import Navbar from "./src/components/Navbar";
import Footer from "./src/components/Footer";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <main
        className="
          flex-grow
          pt-0
          sm:pt-[64px]
          lg:pt-[80px]
        "
      >
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
