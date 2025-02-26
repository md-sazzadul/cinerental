import { Link } from "react-router-dom";
import comingSoon from "../../assets/icons/commingSoon.svg";
import favourite from "../../assets/icons/favourite.svg";
import newRelease from "../../assets/icons/newRelease.svg";
import trending from "../../assets/icons/trending.svg";
import watchLater from "../../assets/icons/watchLater.svg";

const Sidebar = () => {
  return (
    <aside>
      <ul className="space-y-2">
        <li>
          <Link
            className="flex items-center space-x-2 px-5 py-3.5 rounded-lg bg-primary text-black"
            to="/"
          >
            <img src={trending} width="24" height="24" alt="trending" />
            <span>Trending</span>
          </Link>
        </li>
        <li>
          <Link
            className="flex items-center space-x-2 px-5 py-3.5 rounded-lg"
            to="/new-releases"
          >
            <img src={newRelease} width="24" height="24" alt="newRelease" />
            <span>New Releases</span>
          </Link>
        </li>
        <li>
          <Link
            className="flex items-center space-x-2 px-5 py-3.5 rounded-lg"
            to="/coming-soon"
          >
            <img src={comingSoon} width="24" height="24" alt="comingSoon" />
            <span>Coming Soon</span>
          </Link>
        </li>
        <li>
          <Link
            className="flex items-center space-x-2 px-5 py-3.5 rounded-lg"
            to="/favourites"
          >
            <img src={favourite} width="24" height="24" alt="favourite" />
            <span>Favourites</span>
          </Link>
        </li>
        <li>
          <Link
            className="flex items-center space-x-2 px-5 py-3.5 rounded-lg"
            to="/watchlist"
          >
            <img src={watchLater} width="24" height="24" alt="watchLater" />
            <span>Watch Later</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
