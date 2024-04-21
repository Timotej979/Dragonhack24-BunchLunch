// src/components/RestaurantCard.tsx
import React from 'react';

interface RestaurantCardProps {
  name: string;
  cuisine: string;
  rating: number;
  price: string;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ name, cuisine, rating, price }) => {
  return (
    <div className="p-4 border rounded-lg shadow-lg bg-white">
      <h3 className="text-lg font-bold">{name}</h3>
      <p>{cuisine}</p>
      <p>{'★'.repeat(rating)}{'☆'.repeat(5-rating)}</p>
      <p>{price}</p>
    </div>
  );
};

export default RestaurantCard;
