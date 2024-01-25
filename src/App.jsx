import { useReducer, useState } from "react";
import "./App.css";
import Page from "./components/Page/Page";
import { MovieContext, ThemeContext } from "./context";
import { cartReducer, initialState } from "./reducers/CartReducer";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <MovieContext.Provider value={{ state, dispatch }}>
        <Page></Page>
      </MovieContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
