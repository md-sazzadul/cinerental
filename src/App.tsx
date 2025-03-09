import { useCallback, useEffect, useMemo, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Page from "./components/Page/Page";
import { MovieProvider, ThemeContext } from "./context";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      return JSON.parse(localStorage.getItem("darkMode") || "false");
    } catch (error) {
      console.error("Error reading dark mode preference:", error);
      return false;
    }
  });

  // Toggle dark mode in the DOM when state changes
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Persist dark mode preference with debounce
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      try {
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
      } catch (error) {
        console.error("Error updating dark mode setting:", error);
      }
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [darkMode]);

  // useCallback to optimize context value
  const toggleDarkMode = useCallback(() => setDarkMode((prev) => !prev), []);

  // Memoized context value to prevent unnecessary re-renders
  const themeContextValue = useMemo(
    () => ({ darkMode, setDarkMode: toggleDarkMode }),
    [darkMode, toggleDarkMode]
  );

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <MovieProvider>
        <Page />
        <ToastContainer theme={darkMode ? "dark" : "light"} />
      </MovieProvider>
    </ThemeContext.Provider>
  );
};

export default App;
