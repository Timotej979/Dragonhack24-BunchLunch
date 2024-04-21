// src/components/DishCard.tsx

import React from 'react';

interface DishCardProps {
  name: string;
  price: number;
  allergens: string[];
}

const DishCard: React.FC<DishCardProps> = ({ name, price, allergens }) => {
  return (
    <div className="flex flex-col items-center p-4 border rounded-lg shadow-sm hover:bg-gray-200 cursor-pointer">
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
