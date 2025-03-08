import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
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

  const [watchlist, setWatchlist] = useState<Movie[]>([]);

  // Load watchlist from localStorage on mount
  useEffect(() => {
    try {
      const storedWatchlist = localStorage.getItem("watchlist");
      if (storedWatchlist) {
        setWatchlist(JSON.parse(storedWatchlist));
      }
    } catch (error) {
      console.error("Error reading watchlist from localStorage:", error);
    }
  }, []);

  // Persist watchlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
    } catch (error) {
      console.error("Error saving watchlist to localStorage:", error);
    }
  }, [watchlist]);

  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load all movies on initial render
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

    // Precompute lowercase values for filtering
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

  // Memoized state setters to avoid unnecessary re-renders
  const memoizedSetSearchTerm = useCallback(setSearchTerm, []);
  const memoizedSetSortCriteria = useCallback(setSortCriteria, []);
  const memoizedSetSelectedGenre = useCallback(setSelectedGenre, []);
  const memoizedSetWatchlist = useCallback(setWatchlist, []);

  return (
    <MovieContext.Provider
      value={{
        filteredMovies,
        setSearchTerm: memoizedSetSearchTerm,
        state,
        dispatch,
        watchlist,
        setWatchlist: memoizedSetWatchlist,
        setSortCriteria: memoizedSetSortCriteria,
        selectedGenre,
        setSelectedGenre: memoizedSetSelectedGenre,
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
  darkMode: localStorage.getItem("darkMode") === "true",
  setDarkMode: () => {},
});

export { MovieContext, MovieProvider, ThemeContext };
