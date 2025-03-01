import { Link, useLocation } from "react-router-dom";
import comingSoon from "../../assets/icons/comingSoon.svg";
import favourite from "../../assets/icons/favourite.svg";
import newRelease from "../../assets/icons/newRelease.svg";
import trending from "../../assets/icons/trending.svg";
import watchLater from "../../assets/icons/watchLater.svg";

const Sidebar: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { path: "/", label: "Trending", icon: trending },
    { path: "/new-releases", label: "New Releases", icon: newRelease },
    { path: "/coming-soon", label: "Coming Soon", icon: comingSoon },
    { path: "/favourites", label: "Favourites", icon: favourite },
    { path: "/watchlist", label: "Watch Later", icon: watchLater },
  ];

  return (
    <aside>
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              className={`flex items-center space-x-2 px-5 py-3.5 rounded-lg ${
                location.pathname === item.path ? "bg-primary text-black" : ""
              }`}
              to={item.path}
            >
              <img src={item.icon} width="24" height="24" alt={item.label} />
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
