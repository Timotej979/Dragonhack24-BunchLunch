import React from 'react';

interface SearchBarProps {
  placeholder: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder }) => {
  return (
    <div className="absolute top-0 left-0 right-0 flex items-center justify-center">
      <input
        type="text"
        placeholder="Search for nearby restaurants and dishes"
        style={{ width: 'fit-content' }}
        className="py-2 pl-8 pr-4 text-gray-600 bg-white border border-gray-300 rounded-full focus:outline-none font-righteous"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-0 w-6 h-6 ml-2 mt-2 text-gray-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    </div>
  );
};

export default SearchBar;
