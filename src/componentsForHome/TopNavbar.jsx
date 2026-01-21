// components/TopNavbar.jsx
import { Link } from "react-router-dom";
import { HelpCircle, User } from "lucide-react";

export default function TopNavbar() {
  return (
    <header className="h-36 bg-white border-b flex items-center justify-between px-6">
      {/* Logo */}
      <Link to="/" className="flex items-center ">
        <img src="/logo2.png" alt="DAZOQ" className="h-16 w-40" />
      </Link>

      {/* Right icons */}
      <div className="flex items-center gap-6 text-gray-600">
        <button className="flex items-center gap-1 hover:text-black">
          <HelpCircle size={60} />
          <span className="text-sm">Support</span>
        </button>

        <button className="flex items-center gap-1 hover:text-black">
          <User size={60} />
          <span className="text-sm">Profile</span>
        </button>
      </div>
    </header>
  );
}
