//src/components/CategoryCard.tsx

import React from 'react';

interface CategoryCardProps {
  votes: number;
  name: string;
  cuisine: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ votes, name, cuisine }) => {
  return (
    <div className="flex flex-col items-center p-4 border rounded-lg shadow-sm">
      <div className="bg-gray-200 rounded-full h-16 w-16 mb-2"></div> {/* Placeholder for image */}
      <span className="font-bold">{votes} votes</span>
      <span>{name}</span>
      <span className="text-sm text-gray-600">{cuisine}</span>
    </div>
  );
};

export default CategoryCard;
