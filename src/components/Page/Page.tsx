import { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeContext } from "../../context";
import FilterSortOptions from "../Cine/FilterSortOptions";
import MovieList from "../Cine/MovieList";
import Watchlist from "../Cine/Watchlist";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";
import Sidebar from "../Sidebar/Sidebar";

const Page: React.FC = () => {
  const { darkMode } = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500); // Simulated delay
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">Loading...</div>
    );
  }

  return (
    <div className={`h-full ${darkMode ? "dark" : ""}`}>
      <Header />
      <main>
        <div className="container grid lg:grid-cols-[218px_1fr] gap-[3.5rem]">
          <Sidebar />
          <div>
            <ErrorBoundary>
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
            </ErrorBoundary>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Page;
