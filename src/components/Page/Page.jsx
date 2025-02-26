import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeContext } from "../../context";
import FilterSortOptions from "../Cine/FilterSortOptions";
import MovieList from "../Cine/MovieList";
import Watchlist from "../Cine/Watchlist";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";
import Sidebar from "../Sidebar/Sidebar";

const Page = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={`h-full ${darkMode ? "dark" : ""}`}>
      <Header></Header>
      <main>
        <div className="container grid lg:grid-cols-[218px_1fr] gap-[3.5rem]">
          <Sidebar />
          <div>
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
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Page;
