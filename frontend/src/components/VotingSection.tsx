import React, { useState, useEffect } from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit';
import CategoryCard from './CategoryCard';
import RestaurantChooser from './RestaurantChooser';
import SearchBar from './Searchbar';

const VotingSection = () => {
  const [categories, setCategories] = useState([
    { name: "Maharaja", cuisine: "Indian", votes: 7 },
    { name: "Random", cuisine: "Grill", votes: 6 },
    { name: "Gostilna Čad", cuisine: "Grill", votes: 6 },
  ]);

  useEffect(() => {
    const sortedCategories = [...categories].sort((a, b) => b.votes - a.votes);
    setCategories(sortedCategories);
  }, [categories]);

  const handleVote = (index: number) => {
    const newCategories = [...categories];
    newCategories[index].votes += 1;
    setCategories(newCategories);
  };

  return (
    <Flipper flipKey={categories.map(category => category.votes).join('')}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-2xl font-bold mb-4">Categories</h2>
          <div className="grid grid-cols-3 gap-4 text-black">
            {categories.map((category, index) => (
              <Flipped key={index} flipId={category.name}>
                <div>
                  <CategoryCard
                    votes={category.votes}
                    name={category.name}
                    cuisine={category.cuisine}
                    onClick={() => handleVote(index)}
                  />
                </div>
              </Flipped>
            ))}
            <RestaurantChooser onSelect={(restaurant) => console.log(restaurant)} />
          </div>
        </div>
      </div>
    </Flipper>
  );
};

export default VotingSection;
