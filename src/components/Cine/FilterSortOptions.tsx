import { ChangeEvent, useContext } from "react";
import { MovieContext } from "../../context";

const genres = ["Comedy", "Drama", "Action", "Adventure", "Sci-Fi"]; // Dynamic genre list

const FilterSortOptions: React.FC = () => {
  const { sortCriteria, setSortCriteria, selectedGenre, setSelectedGenre } =
    useContext(MovieContext);

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSortCriteria(event.target.value);
  };

  const handleGenreChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(event.target.value);
  };

  return (
    <div className="flex flex-col space-y-4 mb-4">
      <div className="flex flex-col">
        <label htmlFor="sort" className="mb-2 text-sm font-semibold">
          Sort By:
        </label>
        <select
          id="sort"
          value={sortCriteria}
          onChange={handleSortChange}
          className="p-2 border border-gray-300 rounded bg-white dark:bg-[#171923] text-black dark:text-white"
          aria-label="Sort movies"
        >
          <option value="title">Title</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="genre" className="mb-2 text-sm font-semibold">
          Filter By Genre:
        </label>
        <select
          id="genre"
          value={selectedGenre}
          onChange={handleGenreChange}
          className="p-2 border border-gray-300 rounded bg-white dark:bg-[#171923] text-black dark:text-white"
        >
          <option value="">All</option>
          {genres.map((genre) => (
            <option key={genre.toLowerCase()} value={genre.toLowerCase()}>
              {genre}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterSortOptions;
