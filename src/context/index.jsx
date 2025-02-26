import { createContext, useEffect, useReducer, useState } from "react";
import { getAllMovies } from "../data/movies";
import { cartReducer, initialState } from "../reducers/CartReducer";

const MovieContext = createContext();

const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [watchlist, setWatchlist] = useState([]);

  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const allMovies = getAllMovies();
    setMovies(allMovies);
    setFilteredMovies(allMovies);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = movies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          movie.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          movie.rating.toString().includes(searchTerm)
      );

      setFilteredMovies(filtered);
    } else {
      setFilteredMovies(movies);
    }
  }, [searchTerm, movies]);

  return (
    <MovieContext.Provider
      value={{
        filteredMovies,
        setSearchTerm,
        state,
        dispatch,
        watchlist,
        setWatchlist,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

const ThemeContext = createContext();

export { MovieContext, MovieProvider, ThemeContext };
