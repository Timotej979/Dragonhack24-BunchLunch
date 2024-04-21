// src/components/CategoryCard.tsx

import React from 'react';

interface CategoryCardProps {
  votes: number;
  name: string;
  cuisine: string;
  onClick: () => void;
  selected: boolean;
  leadingCard: boolean; // Add leadingCard prop
}

const CategoryCard: React.FC<CategoryCardProps> = ({ votes, name, cuisine, onClick, selected, leadingCard }) => {
  const containerClasses = `relative flex flex-col items-center p-4 border rounded-lg shadow-sm transition-all duration-300 cursor-pointer ${
    selected ? "bg-blue-100 hover:bg-blue-200" : "hover:bg-gray-200"
  }`;

  const handleMouseOver = (event: React.MouseEvent<HTMLElement>) => {
    event.currentTarget.style.transform = "scale(1.05) translateY(-5px)";
    event.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.25)";
  };

  const handleMouseOut = (event: React.MouseEvent<HTMLElement>) => {
    event.currentTarget.style.transform = "scale(1) translateY(0px)";
    event.currentTarget.style.boxShadow = "none";
  };

  return (
    <div
      className={containerClasses}
      onClick={onClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      style={{
        transition: 'transform 0.5s cubic-bezier(0.18, 0.89, 0.32, 1.28), box-shadow 0.5s ease-in-out'
      }}
    >
      {leadingCard && ( // Render crown icon if it's the leading card
        <div className="absolute top-0 left-0 mt-1 ml-3"> {/* Adjusted ml (margin-left) value */}
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6d/Simple_crown_icon.svg" alt="Crown icon" className="h-12 w-12 text-yellow-500" />
        </div>
      )}
      <div className="bg-gray-300 rounded-full h-20 w-20 mb-3 flex items-center justify-center transition-colors duration-300">
        <svg viewBox="0 0 24 24" width="30" height="30" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
          <path d="M12 5v14M5 12h14"></path>
        </svg>
      </div>
      <span className="font-bold text-lg">{votes} votes</span>
      <span className="text-xl">{name}</span>
      <span className="text-sm text-gray-600">{cuisine}</span>
    </div>
  );
};

export default CategoryCard;
