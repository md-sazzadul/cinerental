import { useCallback, useContext, useState } from "react";
import moon from "../../assets/icons/moon.svg";
import sun from "../../assets/icons/sun.svg";
import logo from "../../assets/logo.svg";
import ring from "../../assets/ring.svg";
import cart from "../../assets/shopping-cart.svg";
import { MovieContext, ThemeContext } from "../../context";
import CartDetails from "../Cine/CartDetails";
import IconButton from "../IconButton/IconButton";

const Header: React.FC = () => {
  const [showCart, setShowCart] = useState(false);
  const { state } = useContext(MovieContext);
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  // Prevent unnecessary re-renders
  const handleCartShow = useCallback(() => {
    setShowCart(true);
  }, []);

  return (
    <header>
      {showCart && <CartDetails onClose={() => setShowCart(false)} />}
      <nav className="container flex items-center justify-between space-x-10 py-6">
        <a href="/">
          <img src={logo} width="139" height="26" alt="Cinerental Logo" />
        </a>

        <ul className="flex items-center space-x-5">
          <li>
            <IconButton icon={ring} label="Notifications" />
          </li>
          <li>
            <IconButton
              icon={darkMode ? sun : moon}
              label="Toggle Dark Mode"
              onClick={() => setDarkMode((prev) => !prev)}
            />
          </li>
          <li>
            <IconButton
              icon={cart}
              label="Open Cart"
              hasBadge={state.cartData.length > 0}
              badgeCount={state.cartData.length}
              onClick={handleCartShow}
            />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
