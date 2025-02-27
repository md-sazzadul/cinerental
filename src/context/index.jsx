import { createContext, useEffect, useMemo, useReducer, useState } from "react";
import { getAllMovies } from "../data/movies";
import { cartReducer, initialState } from "../reducers/CartReducer";

const MovieContext = createContext();

const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState("title");
  const [selectedGenre, setSelectedGenre] = useState("");

  const [watchlist, setWatchlist] = useState(() => {
    return JSON.parse(localStorage.getItem("watchlist")) || [];
  });

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const allMovies = getAllMovies();
    setMovies(allMovies);
  }, []);

  const filteredMovies = useMemo(() => {
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

    return [...filtered].sort((a, b) => {
      switch (sortCriteria) {
        case "price":
          return a.price - b.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return a.title.localeCompare(b.title);
      }
    });
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

const ThemeContext = createContext({ darkMode: true, setDarkMode: () => {} });

export { MovieContext, MovieProvider, ThemeContext };
