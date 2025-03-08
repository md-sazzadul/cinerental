import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Page from "./components/Page/Page";
import { MovieProvider, ThemeContext } from "./context";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem("darkMode") === "true";
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      return false;
    }
  });

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      try {
        document.documentElement.classList.toggle("dark", darkMode);
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
      } catch (error) {
        console.error("Error updating dark mode settings:", error);
      }
    }, 300); // Debounce for 300ms

    return () => clearTimeout(debounceTimeout); // Cleanup
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <MovieProvider>
        <Page />
        <ToastContainer />
      </MovieProvider>
    </ThemeContext.Provider>
  );
};

export default App;
