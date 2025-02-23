import { useContext } from "react";
import { MovieContext } from "../../context";
import MovieCard from "./MovieCard";

const MovieList = () => {
  const { filteredMovies } = useContext(MovieContext);

  return (
    <div className="content">
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-7">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie}></MovieCard>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
