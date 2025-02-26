// src/components/Cine/Watchlist.jsx
import { useContext } from "react";
import { MovieContext } from "../../context";
import MovieCard from "./MovieCard";

const Watchlist = () => {
  const { watchlist } = useContext(MovieContext);

  return (
    <div className="content">
      <h2 className="text-2xl mb-4">Watchlist</h2>
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-7">
        {watchlist.map((movie) => (
          <MovieCard key={movie.id} movie={movie}></MovieCard>
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
