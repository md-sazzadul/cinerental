import { useContext, useState } from "react";
import moon from "../../assets/icons/moon.svg";
import sun from "../../assets/icons/sun.svg";
import logo from "../../assets/logo.svg";
import ring from "../../assets/ring.svg";
import cart from "../../assets/shopping-cart.svg";
import { MovieContext, ThemeContext } from "../../context";
import CartDetails from "../Cine/CartDetails";

const Header: React.FC = () => {
  const [showCart, setShowCart] = useState<boolean>(false);
  const { state } = useContext(MovieContext);
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  function handleCartShow() {
    setShowCart(true);
  }

  return (
    <header>
      {showCart && <CartDetails onClose={() => setShowCart(false)} />}
      <nav className="container flex items-center justify-between space-x-10 py-6">
        <a href="/">
          <img src={logo} width="139" height="26" alt="Cinerental Logo" />
        </a>

        <ul className="flex items-center space-x-5">
          <li>
            <button
              className="bg-primary/20 dark:bg-primary/[7%] rounded-lg backdrop-blur-[2px] p-1"
              aria-label="Notifications"
            >
              <img src={ring} width="24" height="24" alt="Notifications" />
            </button>
          </li>

          <li>
            <button
              className="bg-primary/20 dark:bg-primary/[7%] rounded-lg backdrop-blur-[2px] p-1"
              aria-label="Toggle Dark Mode"
              onClick={() => setDarkMode((prev) => !prev)}
            >
              <img
                src={darkMode ? sun : moon}
                width="24"
                height="24"
                alt="Theme Toggle"
              />
            </button>
          </li>

          <li className="relative">
            <button
              className="bg-primary/20 dark:bg-primary/[7%] rounded-lg backdrop-blur-[2px] p-1"
              aria-label="Open Cart"
              onClick={handleCartShow}
            >
              <img src={cart} width="24" height="24" alt="Cart" />
              {state.cartData.length > 0 && (
                <span className="absolute -top-2 left-7 bg-[#12CF6F] text-white text-center rounded-full p-[2px] w-[22px] h-[22px] text-sm flex items-center justify-center">
                  {state.cartData.length}
                </span>
              )}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
