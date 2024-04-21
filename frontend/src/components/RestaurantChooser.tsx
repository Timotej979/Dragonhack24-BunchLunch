import React, { useEffect } from 'react';
import axios from 'axios';
import { headers } from 'next/headers';

interface RestaurantChooserProps {
  onSelect: (restaurant: string) => void; // This will be used when you have a method to select restaurants
}

const RestaurantChooser: React.FC<RestaurantChooserProps> = ({ onSelect }) => {
  useEffect(() => {
    // Call handleSelect when component mounts
    handleSelect();
  }, []);

  const handleSelect = () => {
    // Placeholder functionality to select a restaurant
    navigator.geolocation.getCurrentPosition(async function(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const object = { "lat":lat, "lon":lon};

      console.log(object);
      
      
<<<<<<< HEAD
      const response = await fetch(`/api/restaurants`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(object),
    });
=======
>>>>>>> fef2f36e2b25f59aac11cd216dedf25a101cc8f6

      
      
    });
  };

  return (
    <div className="flex flex-col items-center p-4 border rounded-lg shadow-sm bg-gray-100 cursor-pointer" onClick={handleSelect}>
      <span className="text-lg font-bold">+ Pick a different restaurant</span>
    </div>
  );
};

export default RestaurantChooser;
