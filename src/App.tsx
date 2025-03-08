import { useCallback, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Page from "./components/Page/Page";
import { MovieProvider, ThemeContext } from "./context";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Load dark mode preference on mount
  useEffect(() => {
    try {
      const storedDarkMode = localStorage.getItem("darkMode");
      if (storedDarkMode !== null) {
        setDarkMode(JSON.parse(storedDarkMode));
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  }, []);

  // Apply dark mode class and update localStorage when `darkMode` changes
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);

    const debounceTimeout = setTimeout(() => {
      try {
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
      } catch (error) {
        console.error("Error updating dark mode settings:", error);
      }
    }, 300); // Debounce localStorage update

    return () => clearTimeout(debounceTimeout);
  }, [darkMode]);

  // useCallback to optimize context value
  const toggleDarkMode = useCallback(() => setDarkMode((prev) => !prev), []);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode: toggleDarkMode }}>
      <MovieProvider>
        <Page />
        <ToastContainer theme={darkMode ? "dark" : "light"} />
      </MovieProvider>
    </ThemeContext.Provider>
  );
};

export default App;
