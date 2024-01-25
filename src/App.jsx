import { useState } from "react";
import "./App.css";
import Page from "./components/Page/Page";
import { MovieContext, ThemeContext } from "./context";

function App() {
  const [cartData, setCartData] = useState([]);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <MovieContext.Provider value={{ cartData, setCartData }}>
        <Page></Page>
      </MovieContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
