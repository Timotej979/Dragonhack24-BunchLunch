//src/components/RestaurantChooser.tsx
import React, { useEffect } from 'react';

interface RestaurantChooserProps {
  onSelect: (restaurant: string) => void;  // Callback when a restaurant is selected
}

const RestaurantChooser: React.FC<RestaurantChooserProps> = ({ onSelect }) => {
  
  useEffect(() => {
    // You might want to load initial data here or leave it if nothing is needed initially
  }, []);

  const handleSelect = () => {
    // Placeholder functionality to select a restaurant

    // Get the user's location
    navigator.geolocation.getCurrentPosition(async function(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const object = { "lat":lat, "lon":lon};
      
      // Call the API to get the list of restaurants
      const response = await fetch(`/api/restaurants`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(object),
      });

      const jsonData = await response.json();

      // Parse the response and call onSelect with the restaurant name
      const parsedData: Record<string, { name: string; price: number; rating: number }> = {};
      for (const key in jsonData) {
        if (Object.prototype.hasOwnProperty.call(jsonData, key)) {
          const name = key.replace("venue-", "");
          const { p: price, r: rating } = jsonData[key];
          parsedData[name] = { name, price, rating };
        }
      }
    });
  };
  

  return (
    <div className="flex flex-col items-center p-4 border rounded-lg shadow-sm bg-gray-100 cursor-pointer" onClick={handleSelect}>
      <span className="text-lg font-bold">+ Pick a different restaurant</span>
    </div>
  );
};

export default RestaurantChooser;
