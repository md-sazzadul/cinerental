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
  setWatchlist: React.Dispatch<React.SetStateAction<Movie[]>>;
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

  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Persist watchlist to localStorage with debounce
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      try {
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
      } catch (error) {
        console.error("Error saving watchlist to localStorage:", error);
      }
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [watchlist]);

  // Load all movies on mount
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const allMovies = await getAllMovies();
        setMovies(allMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const filteredMovies = useMemo(() => {
    let filtered = movies;

    const searchLower = searchTerm.toLowerCase();
    const genreLower = selectedGenre.toLowerCase();

    if (searchLower) {
      filtered = filtered.filter(
        (movie) =>
          movie.title.toLowerCase().includes(searchLower) ||
          movie.genre.toLowerCase().includes(searchLower) ||
          movie.rating.toString().includes(searchTerm)
      );
    }

    if (genreLower) {
      filtered = filtered.filter((movie) =>
        movie.genre.toLowerCase().includes(genreLower)
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
        sortCriteria,
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

// Ensuring safe access to `localStorage` for SSR
const getInitialDarkMode = () => {
  if (typeof window !== "undefined") {
    try {
      return JSON.parse(localStorage.getItem("darkMode") || "false");
    } catch (error) {
      console.error("Error reading dark mode preference:", error);
    }
  }
  return false;
};

const ThemeContext = createContext<ThemeContextType>({
  darkMode: getInitialDarkMode(),
  setDarkMode: () => {},
});

export { MovieContext, MovieProvider, ThemeContext };
