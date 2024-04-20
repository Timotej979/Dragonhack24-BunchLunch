//src/components/VotingSection.tsx

import React from 'react';
import VoteOption from './VoteOption';
import CategoryCard from './CategoryCard';
import RestaurantChooser from './RestaurantChooser';
import SearchBar from './Searchbar';


const VotingSection: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Vote for a restaurant section */}
      <h2 className="text-3xl font-bold px-4 py-2 font-montserrat text-black mt-4">1. Vote for a restaurant to make a group order from</h2>
      <div className="bg-white rounded-lg shadow-md mt-12">
        
        <VoteOption timeRange="00:00-11:30" actionDescription="Vote restaurant" />
        <VoteOption timeRange="11:30-11:45" actionDescription="Choose dish" />
        <VoteOption timeRange="11:45-" actionDescription="Wait for your food" />
      </div>

      {/* Top picks section */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-2xl font-bold mb-4">Categories</h2>
        <div className="grid grid-cols-3 gap-4 text-black">
          <CategoryCard votes={7} name="Maharaja" cuisine="Indian" />
          <CategoryCard votes={6} name="Gostilna Čad" cuisine="Grill" />
          <CategoryCard votes={6} name="Gostilna Čad" cuisine="Grill" />
          {/* This new card allows the user to select their own choice */}
            <RestaurantChooser onSelect={(restaurant) => console.log(restaurant)} />
            <SearchBar/>
          {/* Add more CategoryCard components as needed */}
        </div>
      </div>
    </div>
  );
};

export default VotingSection;