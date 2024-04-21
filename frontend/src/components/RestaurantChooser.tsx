import React, { useEffect } from 'react';

interface RestaurantChooserProps {
  onSelect: (restaurant: string) => void;  // Callback when a restaurant is selected
}

const RestaurantChooser: React.FC<RestaurantChooserProps> = ({ onSelect }) => {
  
  useEffect(() => {
    // You might want to load initial data here or leave it if nothing is needed initially
  }, []);

  const handleSelect = async () => {
    // Placeholder for selecting a restaurant
    const object = { "lat":64, "lon":14};
    console.log(object);

    try {
      const response = await fetch(`/api/restaurants`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(object),
      });

      const data = await response.json();  // Assuming the response is in JSON format

      // Call onSelect with the first restaurant's name as an example
      if (data && data.restaurants && data.restaurants.length > 0) {
        onSelect(data.restaurants[0].name);  // Example usage of onSelect
      }
    } catch (error) {
      console.error('Failed to fetch restaurants', error);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 border rounded-lg shadow-sm bg-gray-100 cursor-pointer" onClick={handleSelect}>
      <span className="text-lg font-bold">+ Pick a different restaurant</span>
    </div>
  );
};

export default RestaurantChooser;
