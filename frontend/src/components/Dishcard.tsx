// src/components/DishCard.tsx

import React, { useState } from 'react';

interface DishCardProps {
  name: string;
  price: number;
  allergens: string[];
  selected: boolean; // Added prop for tracking selection state
  onClick: () => void; // Function to handle click event
}

const DishCard: React.FC<DishCardProps> = ({ name, price, allergens, selected, onClick }) => {
  const [isHovered, setIsHovered] = useState(false); // State to track hover state

  const handleMouseOver = () => {
    setIsHovered(true); // Set hover state to true on mouse over
  };

  const handleMouseOut = () => {
    setIsHovered(false); // Set hover state to false on mouse out
  };

  return (
    <div
      className={`flex flex-col items-center p-4 border rounded-lg shadow-sm cursor-pointer transition-all duration-300 ${
        selected || isHovered ? "bg-blue-100 hover:bg-blue-200" : "hover:bg-gray-200"
      }`}
      onClick={onClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      style={{
        transform: selected ? "scale(1.05) translateY(-5px)" : "scale(1) translateY(0px)", // Apply scale transformation if selected
        boxShadow: selected ? "0 4px 20px rgba(0,0,0,0.25)" : "none", // Apply box shadow if selected
      }}
    >
      <h4 className="text-lg font-bold">{name}</h4>
      <p className="text-md">${price.toFixed(2)}</p>
      <ul className="text-sm">
        {allergens.map((allergen, index) => (
          <li key={index}>{allergen}</li>
        ))}
      </ul>
    </div>
  );
};

export default DishCard;
