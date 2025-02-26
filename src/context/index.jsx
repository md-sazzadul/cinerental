import { createContext, useEffect, useReducer, useState } from "react";
import { getAllMovies } from "../data/movies";
import { cartReducer, initialState } from "../reducers/CartReducer";

const MovieContext = createContext();

const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [watchlist, setWatchlist] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("title");
  const [selectedGenre, setSelectedGenre] = useState("");

  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const allMovies = getAllMovies();
    setMovies(allMovies);
    setFilteredMovies(allMovies);
  }, []);

  useEffect(() => {
    let filtered = movies;

    if (searchTerm) {
      filtered = filtered.filter(
        (movie) =>
          movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          movie.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          movie.rating.toString().includes(searchTerm)
      );
    }

    if (selectedGenre) {
      filtered = filtered.filter((movie) =>
        movie.genre.toLowerCase().includes(selectedGenre.toLowerCase())
      );
    }

    switch (sortCriteria) {
      case "price":
        filtered = filtered.sort((a, b) => a.price - b.price);
        break;
      case "rating":
        filtered = filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    setFilteredMovies(filtered);
  }, [searchTerm, movies, sortCriteria, selectedGenre]);

  return (
    <MovieContext.Provider
      value={{
        filteredMovies,
        setSearchTerm,
        state,
        dispatch,
        watchlist,
        setWatchlist,
        setSortCriteria,
        selectedGenre,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

const ThemeContext = createContext();

export { MovieContext, MovieProvider, ThemeContext };
