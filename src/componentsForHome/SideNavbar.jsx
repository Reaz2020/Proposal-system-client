import { NavLink, useNavigate } from "react-router-dom";
import { Plus, FileText, Handshake, LogOut } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../components/AuthContext";

const ICON_SIZE = 28;

const SideItem = ({ to, icon: Icon, label, onClick }) => {
  const content = (
    <div className="flex flex-col items-center gap-2 text-gray-600 hover:text-black">
      <Icon size={ICON_SIZE} strokeWidth={1.5} />
      <span className="text-sm">{label}</span>
    </div>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className="w-full py-6">
        {content}
      </button>
    );
  }

  return (
    <NavLink to={to} className="w-full py-6">
      {content}
    </NavLink>
  );
};

export default function SideNavbar() {
  const { handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogout = async () => {
    await handleLogout();
    navigate("/login");
  };

  return (
    <aside className="w-24 bg-gray-50 border-r flex flex-col items-center justify-between py-6">
      {/* Top / Middle */}
      <div className="flex flex-col items-center gap-10">
        <SideItem to="/home/create" icon={Plus} label="Skapa nytt" />
        <SideItem to="/home/quotes" icon={FileText} label="Offerter" />
        <SideItem to="/home/customers" icon={Handshake} label="Kunder" />
      </div>

      {/* Bottom */}
      <SideItem icon={LogOut} label="Log out" onClick={onLogout} />
    </aside>
  );
}
