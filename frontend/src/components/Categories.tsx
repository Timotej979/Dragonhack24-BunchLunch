import React, { useState, useEffect } from 'react';

// Define a type for the category
type Category = {
  id: number;
  name: string;
  icon: string; // This will hold the path to the SVG icon
};

// Mock data for categories with paths to SVGs
const mockCategories: Category[] = [
  { id: 1, name: 'Chicken', icon: '/icons/chicken.svg' }, // Updated path for SVGs
  { id: 2, name: 'Burger', icon: '/icons/burger.svg' },
  { id: 3, name: 'American', icon: '/icons/american.svg' },
  { id: 4, name: 'Pizza', icon: '/icons/pizza.svg' },
  { id: 5, name: 'Wraps', icon: '/icons/wraps.svg' },
  { id: 6, name: 'Salad', icon: '/icons/salad.svg' },
  { id: 7, name: 'Dessert', icon: '/icons/dessert.svg' },
  { id: 8, name: 'Breakfast', icon: '/icons/breakfast.svg' },
  { id: 9, name: 'Noodles', icon: '/icons/noodles.svg' },
  { id: 10, name: 'Asian', icon: '/icons/asian.svg' },
  { id: 11, name: 'Lunch', icon: '/icons/lunch.svg' },
  { id: 12, name: 'Healthy', icon: '/icons/healthy.svg' },
  { id: 13, name: 'Soup', icon: '/icons/soup.svg' },
  { id: 14, name: 'Bakery', icon: '/icons/bakery.svg' },
  { id: 15, name: 'Cafe', icon: '/icons/cafe.svg' },
  { id: 16, name: 'Bowl', icon: '/icons/bowl.svg' },
  { id: 17, name: 'Chinese', icon: '/icons/chinese.svg' },
  { id: 18, name: 'Ice Cream', icon: '/icons/icecream.svg' },
  { id: 19, name: 'Vegan', icon: '/icons/vegan.svg' },
  { id: 20, name: 'Wings', icon: '/icons/wings.svg' },
  { id: 21, name: 'Steak', icon: '/icons/steak.svg' },
  { id: 22, name: 'Kids meals', icon: '/icons/kidsmeals.svg' },
  { id: 23, name: 'Fish', icon: '/icons/fish.svg' },
];

const Categories: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(mockCategories.length / itemsPerPage);

  const paginatedCategories = () => {
    const start = currentPage * itemsPerPage;
    return mockCategories.slice(start, start + itemsPerPage);
  };

  const handlePrevClick = () => {
    setCurrentPage((prevCurrentPage) => Math.max(prevCurrentPage - 1, 0));
  };

  const handleNextClick = () => {
    setCurrentPage((prevCurrentPage) => Math.min(prevCurrentPage + 1, totalPages - 1));
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center">
        <button
          onClick={handlePrevClick}
          disabled={currentPage === 0}
          className="p-4 disabled:opacity-50"
          aria-label="Previous categories"
        >
          {/* Left arrow SVG or text */}
          <img src="/icons/leftarrow.svg" alt="Previous" className="h-6 w-6" />
        </button>

        <div className="flex space-x-4 overflow-hidden">
          {paginatedCategories().map((category) => (
            <div key={category.id} className="flex flex-col items-center p-4 text-center text-black">
              <img src={category.icon} alt={category.name} className="w-12 h-12" />
              <div className="mt-2">{category.name}</div>
            </div>
          ))}
        </div>

        <button
          onClick={handleNextClick}
          disabled={currentPage >= totalPages - 1}
          className="p-4 disabled:opacity-50"
          aria-label="Next categories"
        >
          {/* Right arrow SVG or text */}
          <img src="/icons/rightarrow.svg" alt="Next" className="h-6 w-6"/>
        </button>
      </div>
    </div>
  );
};

export default Categories;