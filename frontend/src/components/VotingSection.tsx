//src/components/VotingSection.tsx
import React, { useState, useEffect } from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit';
import CategoryCard from './CategoryCard';
import RestaurantChooser from './RestaurantChooser';
import VoteOption from './VoteOption';
import SearchBar from './Searchbar';

const VotingSection = () => {
  const [categories, setCategories] = useState([
    { name: "Maharaja", cuisine: "Indian", votes: 7 },
    { name: "Random", cuisine: "Grill", votes: 6 },
    { name: "Gostilna Čad", cuisine: "Grill", votes: 6 },
  ]);
  const [selectedName, setSelectedName] = useState<string | null>(null);  // Now using name as the identifier

  // Initial sorting of categories
  useEffect(() => {
    const sortedCategories = [...categories].sort((a, b) => b.votes - a.votes);
    setCategories(sortedCategories);
  }, []); // Run this effect only once, on component mount

  const handleVote = (name: string) => {
    const index = categories.findIndex(cat => cat.name === name);
    if (selectedName === name) {  // Toggle vote off
      unvoteCategory(index);
    } else if (selectedName && selectedName !== name) {  // Change vote
      changeVote(index);
    } else {  // New vote
      voteForCategory(index);
    }
  };

  const voteForCategory = (index: number) => {
    const newCategories = [...categories];
    newCategories[index].votes += 1;
    setCategories(newCategories);
    setSelectedName(categories[index].name);
  };

  const unvoteCategory = (index: number) => {
    const newCategories = [...categories];
    newCategories[index].votes -= 1;
    setCategories(newCategories);
    setSelectedName(null);
  };

  const changeVote = (index: number) => {
    const newCategories = [...categories];
    const oldIndex = categories.findIndex(cat => cat.name === selectedName);
    if (oldIndex !== -1) {
      newCategories[oldIndex].votes -= 1;
    }
    newCategories[index].votes += 1;
    setCategories(newCategories);
    setSelectedName(categories[index].name);
  };

  return (
    <Flipper flipKey={categories.map(category => category.votes).join('')}>
      <div className="space-y-8">
      <h2 className="text-3xl font-bold px-4 py-2 font-montserrat text-black">1. Vote for a restaurant to make a group order from</h2>
      <div className="bg-white rounded-lg shadow-md mt-12">
        
        <VoteOption timeRange="00:00-11:30" actionDescription="Vote restaurant" />
        <VoteOption timeRange="11:30-11:45" actionDescription="Choose dish" />
        <VoteOption timeRange="11:45-" actionDescription="Wait for your food" />
      </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-2xl font-bold mb-4">Categories</h2>
          <div className="grid grid-cols-3 gap-4 text-black">
            {categories.map((category, index) => (
              <Flipped key={category.name} flipId={category.name}>
                <div>
                  <CategoryCard
                    votes={category.votes}
                    name={category.name}
                    cuisine={category.cuisine}
                    selected={category.name === selectedName}
                    onClick={() => handleVote(category.name)}
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
