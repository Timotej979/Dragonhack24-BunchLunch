import React, { useState, useEffect } from 'react';

// Define a type for the category
type Category = {
  id: number;
  name: string;
  icon: string; // This will hold the emoji or icon path
};

// Mock data for categories
const mockCategories: Category[] = [
  { id: 1, name: 'Food', icon: '🍔' },
  { id: 2, name: 'Beverages', icon: '🍹' },
  { id: 3, name: 'Desserts', icon: '🧁' },
  // ... more categories
];

const Categories: React.FC = () => {
  // State for categories (in a real app, this would come from an API)
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // Simulate fetching data from an API
    setCategories(mockCategories);
  }, []);

  return (
    <div className="flex flex-row justify-center space-x-4">
      {categories.map((category) => (
        <div key={category.id} className="flex flex-col items-center p-4 text-center text-black">
          <div className="text-3xl">{category.icon}</div>
          <div className="mt-2">{category.name}</div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
