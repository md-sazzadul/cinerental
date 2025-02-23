import React, { useContext } from "react";
import { ThemeContext } from "../../context";
import MovieList from "../Cine/MovieList";
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
          <Sidebar></Sidebar>
          <div>
            <SearchBar />
            <MovieList></MovieList>
          </div>
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default Page;
