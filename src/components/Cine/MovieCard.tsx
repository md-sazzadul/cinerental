import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { MovieContext } from "../../context";
import { getImgUrl } from "../../utils/cine-utility";
import MovieDetailsModal from "./MovieDetailsModal";
import Rating from "./Rating";

interface Movie {
  id: string;
  cover: string;
  title: string;
  description: string;
  genre: string;
  rating: number;
  price: number;
  reviews: string[];
}

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { state, dispatch, watchlist, setWatchlist } = useContext(MovieContext);

  const handleModalClose = () => {
    setSelectedMovie(null);
    setShowModal(false);
  };

  const handleMovieSelection = (movie: Movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const handleAddToCart = (
    event: React.MouseEvent<HTMLButtonElement>,
    movie: Movie
  ) => {
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
      toast.error(`Movie ${movie.title} has been added to the cart already!`, {
        position: "bottom-right",
      });
    }
  };

  const handleAddToWatchlist = (
    event: React.MouseEvent<HTMLButtonElement>,
    movie: Movie
  ) => {
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
  };

  return (
    <>
      {showModal && selectedMovie && (
        <MovieDetailsModal
          movie={selectedMovie}
          onClose={handleModalClose}
          onCartAdd={handleAddToCart}
        ></MovieDetailsModal>
      )}
      <figure
        key={movie.id}
        tabIndex={0}
        role="button"
        className="p-4 border border-black/10 shadow-sm dark:border-white/10 rounded-xl bg-white dark:bg-[#171923] cursor-pointer transition-transform hover:scale-105"
        onClick={handleMovieSelection}
        onKeyDown={(e) => e.key === "Enter" && handleMovieSelection()}
      >
        <img
          className="w-full object-cover rounded-lg"
          src={getImgUrl(movie.cover)}
          alt={movie.title}
          loading="lazy"
        />
        <figcaption className="pt-4 flex flex-col items-center text-center">
          <h3 className="text-lg font-semibold mb-1">{movie.title}</h3>
          <p className="text-gray-500 text-sm mb-2">{movie.genre}</p>
          <div className="flex items-center justify-center space-x-1 mb-3">
            <Rating value={movie.rating} />
          </div>

          <div className="w-full flex flex-col space-y-2">
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all"
              onClick={(e) => handleAddToCart(e, movie)}
            >
              <img src="/tag.svg" alt="tag" className="w-5 h-5" />
              <span>${movie.price} | Add to Cart</span>
            </button>
            <button
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all"
              onClick={(e) => handleAddToWatchlist(e, movie)}
            >
              <img src="/heart.svg" alt="heart" className="w-5 h-5" />
              <span>Add to Watchlist</span>
            </button>
          </div>
        </figcaption>
      </figure>
    </>
  );
};

export default MovieCard;
