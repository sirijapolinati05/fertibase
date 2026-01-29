import { Outlet } from "react-router-dom";
import Navbar from "./src/components/Navbar";
import Footer from "./src/components/Footer";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed Navbar */}
      <Navbar />

      {/* Page Content (space equals navbar height) */}
      <main className="flex-grow pt-[80px]">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
