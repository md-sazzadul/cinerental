import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Page from "./components/Page/Page";
import { MovieProvider, ThemeContext } from "./context";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <MovieProvider>
        <Page></Page>
        <ToastContainer></ToastContainer>
      </MovieProvider>
    </ThemeContext.Provider>
  );
}

export default App;
