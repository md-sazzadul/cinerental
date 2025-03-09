import { Suspense, lazy, useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeContext } from "../../context";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";
import Sidebar from "../Sidebar/Sidebar";

// Lazy-loaded components for performance optimization
const FilterSortOptions = lazy(() => import("../Cine/FilterSortOptions"));
const MovieList = lazy(() => import("../Cine/MovieList"));
const Watchlist = lazy(() => import("../Cine/Watchlist"));

const Page: React.FC = () => {
  const { darkMode } = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);

  // Simulated loading delay (can be removed or modified as per real use case)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <svg
          className="w-10 h-10 animate-spin text-gray-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className={`h-full ${darkMode ? "dark" : ""}`}>
      <Header />
      <main className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-4 px-4">
        <Sidebar />
        <div>
          <ErrorBoundary>
            <Suspense
              fallback={<div className="text-center text-xl">Loading...</div>}
            >
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <SearchBar />
                      <FilterSortOptions />
                      <MovieList />
                    </>
                  }
                />
                <Route path="/watchlist" element={<Watchlist />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Page;
