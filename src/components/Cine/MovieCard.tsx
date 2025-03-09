import { useCallback, useContext, useState } from "react";
import { toast } from "react-toastify";
import { MovieContext } from "../../context";
import { Movie } from "../../data/movies";
import { getImgUrl } from "../../utils/cine-utility";
import MovieDetailsModal from "./MovieDetailsModal";
import Rating from "./Rating";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { state, dispatch, watchlist, setWatchlist } = useContext(MovieContext);

  // Close modal
  const handleModalClose = useCallback(() => {
    setSelectedMovie(null);
    setShowModal(false);
  }, []);

  // Handle movie selection for modal
  const handleMovieSelection = useCallback((movie: Movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  }, []);

  // Add movie to cart
  const handleAddToCart = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, movie: Movie) => {
      event.stopPropagation();

      const found = state.cartData.find((item: Movie) => item.id === movie.id);

      if (!found) {
        dispatch({
          type: "ADD_TO_CART",
          payload: {
            ...movie,
          },
        });

        toast.success(`Movie ${movie.title} added successfully`, {
          position: "bottom-right",
        });
      } else {
        toast.error(`Movie ${movie.title} is already in the cart!`, {
          position: "bottom-right",
        });
      }
    },
    [state.cartData, dispatch]
  );

  // Add movie to watchlist
  const handleAddToWatchlist = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, movie: Movie) => {
      event.stopPropagation();

      const found = watchlist.find((item: Movie) => item.id === movie.id);

      if (!found) {
        setWatchlist((prevWatchlist: Movie[]) => [...prevWatchlist, movie]);

        toast.success(`Movie ${movie.title} added to watchlist`, {
          position: "bottom-right",
        });
      } else {
        toast.error(`Movie ${movie.title} is already in the watchlist!`, {
          position: "bottom-right",
        });
      }
    },
    [watchlist, setWatchlist]
  );

  return (
    <>
      {showModal && selectedMovie && (
        <MovieDetailsModal
          movie={selectedMovie}
          onClose={handleModalClose}
          onCartAdd={handleAddToCart}
        />
      )}
      <figure
        key={movie.id}
        tabIndex={0}
        role="button"
        aria-label={`Select ${movie.title}`}
        className="relative p-4 border border-black/10 shadow-lg dark:border-white/10 rounded-xl bg-white dark:bg-[#171923] cursor-pointer transition-all transform hover:scale-105 hover:shadow-2xl group"
        onClick={() => handleMovieSelection(movie)}
        onKeyDown={(e) => e.key === "Enter" && handleMovieSelection(movie)}
      >
        {/* Movie Image */}
        <img
          className="w-full object-cover rounded-lg transition-all transform group-hover:scale-105"
          src={getImgUrl(movie.cover)}
          alt={movie.title}
          loading="lazy"
        />

        {/* Movie Details */}
        <figcaption className="pt-4 flex flex-col items-center text-center">
          <h3 className="text-lg font-semibold mb-1 text-black dark:text-white group-hover:text-primary transition-all">
            {movie.title}
          </h3>
          <p className="text-gray-500 text-sm mb-2">{movie.genre}</p>
          <div className="flex items-center justify-center space-x-1 mb-3">
            <Rating value={movie.rating} />
          </div>

          <div className="w-full flex flex-col space-y-2">
            <button
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all"
              onClick={(e) => handleAddToCart(e, movie)}
            >
              <img src="/tag.svg" alt="tag" className="w-5 h-5" />
              <span>${movie.price} | Add to Cart</span>
            </button>
            <button
              className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all"
              onClick={(e) => handleAddToWatchlist(e, movie)}
            >
              <img src="/heart.svg" alt="heart" className="w-5 h-5" />
              <span>Add to Watchlist</span>
            </button>
          </div>
        </figcaption>

        {/* Movie Hover Overlay */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
          <div className="flex justify-center items-center h-full">
            <span className="text-white text-xl font-semibold">Quick View</span>
          </div>
        </div>
      </figure>
    </>
  );
};

export default MovieCard;
