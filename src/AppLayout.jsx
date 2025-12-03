import { Outlet } from "react-router-dom";
import Navbar from "./ui/Navbar";

function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* Optional Footer */}
      {/* <footer className="text-center py-4 text-gray-600 text-sm">© 2025 Signature</footer> */}
    </div>
  );
}

export default AppLayout;
