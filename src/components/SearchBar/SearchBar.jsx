import { useContext } from "react";
import { MovieContext } from "../../context";

const SearchBar = () => {
  const { setSearchTerm } = useContext(MovieContext);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="my-4">
      <input
        type="text"
        placeholder="Search by title, genre, or rating"
        className="w-full p-2 border border-gray-300 rounded bg-white dark:bg-[#171923] text-black dark:text-white"
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
