import { useContext } from "react";
import { MovieContext } from "../../context";
import { Movie } from "../../data/movies";
import MovieCard from "./MovieCard";

const MovieList: React.FC = () => {
  const { filteredMovies } = useContext(MovieContext);

  return (
    <div className="content">
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-7">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie: Movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No movies found.
          </p>
        )}
      </div>
    </div>
  );
};

export default MovieList;
