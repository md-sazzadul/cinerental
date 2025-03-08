import { createContext, useEffect, useMemo, useReducer, useState } from "react";
import { getAllMovies } from "../data/movies";
import {
  CartActionType,
  cartReducer,
  initialState,
} from "../reducers/CartReducer";

interface Movie {
  id: number;
  title: string;
  genre: string;
  rating: number;
  price: number;
}

interface MovieContextType {
  filteredMovies: Movie[];
  setSearchTerm: (term: string) => void;
  state: typeof initialState;
  dispatch: React.Dispatch<CartActionType>;
  watchlist: Movie[];
  setWatchlist: React.Dispatch<React.setStateAction<Movie[]>>;
  setSortCriteria: (criteria: string) => void;
  selectedGenre: string;
  setSelectedGenre: (genre: string) => void;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

const MovieProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortCriteria, setSortCriteria] = useState<string>("title");
  const [selectedGenre, setSelectedGenre] = useState<string>("");

  const [watchlist, setWatchlist] = useState<Movie[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("watchlist") || "[]");
    } catch (error) {
      console.error("Error reading watchlist from localStorage:", error);
      return [];
    }
  });

  // Debounce localStorage updates for performance optimization
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      try {
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
      } catch (error) {
        console.error("Error saving watchlist to localStorage:", error);
      }
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [watchlist]);

  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load all movies on initial render
  useEffect(() => {
    try {
      const allMovies = getAllMovies();
      setMovies(allMovies);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
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
        setSelectedGenre,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

interface ThemeContextType {
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  darkMode: true,
  setDarkMode: () => {},
});

export { MovieContext, MovieProvider, ThemeContext };
