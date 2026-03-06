import { useState, useRef } from "react";
import { Button } from "./Button";
import { SearchIcon } from "../icons/SearchIcon";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch } : SearchBarProps) => {
  const [query, setQuery] = useState("");
  const previousLength = useRef(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length < previousLength.current) {
      onSearch(value);
    }

    previousLength.current = value.length;
    setQuery(value);
  };

  const handleSearchClick = () => {
    onSearch(query);
  };

  return (
    <div className="flex items-center w-full gap-2">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search Card..."
        className="flex-1 px-4 py-2 rounded-lg border border-slate-300 
                   focus:outline-none focus:ring-2 focus:ring-purple-dark
                   shadow-sm"
      />
      <Button
        variant="secondary"
        text = {"Search"}
        onClick={handleSearchClick}
        startIcon={<SearchIcon/>}
      >
      </Button>
    </div>
  );
};

export default SearchBar;
