import React from 'react';

interface RestaurantChooserProps {
  onSelect: (restaurant: string) => void; // This will be used when you have a method to select restaurants
}

const RestaurantChooser: React.FC<RestaurantChooserProps> = ({ onSelect }) => {
  // Placeholder functionality to select a restaurant
  const handleSelect = () => {
    // This could be replaced with an actual selection method
    onSelect("New Restaurant");
  };

  return (
    <div className="flex flex-col items-center p-4 border rounded-lg shadow-sm bg-gray-100 cursor-pointer" onClick={handleSelect}>
      <span className="text-lg font-bold">+ Pick a different restaurant</span>
    </div>
  );
};

export default RestaurantChooser;
