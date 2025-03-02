import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../../context";

const SearchBar: React.FC = () => {
  const { setSearchTerm } = useContext(MovieContext);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(inputValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue, setSearchTerm]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleClearSearch = () => {
    setInputValue("");
    setSearchTerm("");
  };

  return (
    <div className="my-4 flex items-center">
      <input
        type="text"
        placeholder="Search by title, genre, or rating"
        className="w-full p-2 border border-gray-300 rounded bg-white dark:bg-[#171923] text-black dark:text-white"
        value={inputValue}
        onChange={handleInputChange}
      />
      {inputValue && (
        <button
          onClick={handleClearSearch}
          className="ml-2 bg-gray-200 dark:bg-gray-700 p-2 rounded text-sm"
        >
          ✖
        </button>
      )}
    </div>
  );
};

export default SearchBar;
