// src/components/Cine/FilterSortOptions.jsx
import { useContext } from "react";
import { MovieContext } from "../../context";

const FilterSortOptions = () => {
  const { setSortCriteria, setSelectedGenre } = useContext(MovieContext);

  const handleSortChange = (event) => {
    setSortCriteria(event.target.value);
  };

  const handleGenreChange = (event) => {
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
          onChange={handleSortChange}
          className="p-2 border border-gray-300 rounded bg-white dark:bg-[#171923] text-black dark:text-white"
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
          onChange={handleGenreChange}
          className="p-2 border border-gray-300 rounded bg-white dark:bg-[#171923] text-black dark:text-white"
        >
          <option value="">All</option>
          <option value="comedy">Comedy</option>
          <option value="drama">Drama</option>
          <option value="action">Action</option>
          <option value="adventure">Adventure</option>
          <option value="sci-fi">Sci-fi</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSortOptions;
