import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import comingSoonIcon from "../../assets/icons/comingSoon.svg";
import favouriteIcon from "../../assets/icons/favourite.svg";
import newReleaseIcon from "../../assets/icons/newRelease.svg";
import trendingIcon from "../../assets/icons/trending.svg";
import watchLaterIcon from "../../assets/icons/watchLater.svg";

const Sidebar: React.FC = () => {
  const location = useLocation();

  const menuItems = useMemo(
    () => [
      { path: "/", label: "Trending", icon: trendingIcon },
      { path: "/new-releases", label: "New Releases", icon: newReleaseIcon },
      { path: "/coming-soon", label: "Coming Soon", icon: comingSoonIcon },
      { path: "/favourites", label: "Favourites", icon: favouriteIcon },
      { path: "/watchlist", label: "Watch Later", icon: watchLaterIcon },
    ],
    []
  );

  return (
    <aside>
      <ul className="space-y-2">
        {menuItems.map(({ path, label, icon }) => {
          const isActive = location.pathname === path;
          return (
            <li key={path}>
              <Link
                className={`flex items-center space-x-3 px-5 py-3.5 rounded-lg transition-colors duration-200 
                ${
                  isActive
                    ? "bg-primary text-black font-semibold"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
                to={path}
                aria-current={isActive ? "page" : undefined}
              >
                <img src={icon} width="24" height="24" alt={`${label} Icon`} />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
