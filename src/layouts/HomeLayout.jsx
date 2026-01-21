import { Outlet } from "react-router-dom";
import SideNavbar from "../componentsForHome/SideNavbar.jsx";
import TopNavbar from "../componentsForHome/TopNavbar.jsx";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar - full width */}
      <TopNavbar />

      {/* Below Top Navbar */}
      <div className="flex flex-1">
        {/* Side Navbar */}
        <SideNavbar />

        {/* Page Content */}
        <main className="flex-1 p-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
