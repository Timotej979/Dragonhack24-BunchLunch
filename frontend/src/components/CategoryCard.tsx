// src/components/CategoryCard.tsx

import React from 'react';

interface CategoryCardProps {
  votes: number;
  name: string;
  cuisine: string;
  onClick: () => void;  // Function to handle click event
}

const CategoryCard: React.FC<CategoryCardProps> = ({ votes, name, cuisine, onClick }) => {
  return (
    <div 
      className="flex flex-col items-center p-4 border rounded-lg shadow-sm transition-all duration-300 hover:shadow-2xl hover:bg-gray-200 cursor-pointer"
      onClick={onClick}
      style={{
        transform: 'translateY(0px)',
        transition: 'transform 0.5s cubic-bezier(0.18, 0.89, 0.32, 1.28), box-shadow 0.5s ease-in-out, background-color 0.5s ease'
      }}
      onMouseOver={(event) => ((event.currentTarget as HTMLElement).style.transform = "scale(1.05) translateY(-5px)")}
      onMouseOut={(event) => ((event.currentTarget as HTMLElement).style.transform = "scale(1) translateY(0px)")}
    >
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
