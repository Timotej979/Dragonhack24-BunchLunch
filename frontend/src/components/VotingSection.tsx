//src/components/VotingSection.tsx
import React, { useState, useEffect } from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit';
import CategoryCard from './CategoryCard';
import RestaurantChooser from './RestaurantChooser';
import VoteOption from './VoteOption';
import { isCurrentTimeInRange } from './utilities/timeUtils';
import DishCard from './Dishcard';
import Button from './Button';
import SearchBar from './Searchbar';
import axios from 'axios';

// Define the types for the props in an interface
interface VotingSectionProps {
  onCategorySelected: () => void;  // Function type, no arguments and returns nothing
  toggleCategories: () => void;   // Assuming toggleCategories is also a function with no arguments
}

const VotingSection: React.FC<VotingSectionProps> = ({ onCategorySelected, toggleCategories }) => {
  const [currentPhase, setCurrentPhase] = useState("voting");
  const [categories, setCategories] = useState([
    { name: "Maharaja", cuisine: "Indian", votes: 7 },
    { name: "Random", cuisine: "Grill", votes: 6 },
    { name: "Gostilna Čad", cuisine: "Grill", votes: 6 },
  ]);


  // Function to render content based on the current phase
  const renderContentBasedOnPhase = () => {
    switch (currentPhase) {
      case "voting":
        return categories.map((category, index) => (
          <Flipped key={category.name} flipId={category.name}>
            <div>
              <CategoryCard
                votes={category.votes}
                name={category.name}
                cuisine={category.cuisine}
                selected={category.name === selectedName}
                onClick={() => setSelectedName(category.name)}
              />
            </div>
          </Flipped>
        ));
      case "choosing":
        return dishes.map((dish, index) => (
          <Flipped key={dish.name} flipId={dish.name}>
            <div>
              <DishCard
                name={dish.name}
                price={dish.price}
                allergens={dish.allergens}
              />
            </div>
          </Flipped>
          
        ));
        case "waiting":
          return (
            <>
             
                <img src="/icons/mothafukin_truck.gif" alt="Waiting" />
              
            </>
          );
          
      default:
        return null;
    }
  };

  
  const [selectedName, setSelectedName] = useState(null);  // Now using name as the identifier

  const selectCategory = () => {
    onCategorySelected(); // Call the passed function when a category is selected
  };

  // Assume we have similar mock data or API response for dishes
  const [dishes, setDishes] = useState([
    { name: "Chicken Curry", price: 9.99, allergens: ["nuts", "dairy"] },
    { name: "Veggie Pizza", price: 12.49, allergens: ["gluten"] },
    { name: "Beef Steak", price: 15.99, allergens: ["none"] },
  ]);


  const [manualOverride, setManualOverride] = useState(false);


  useEffect(() => {
    const timerId = setInterval(() => {
      const currentTime = new Date();
      let newPhase = 'waiting'; // Default to 'waiting'
      if (currentTime.getHours() < 11 || (currentTime.getHours() === 11 && currentTime.getMinutes() < 30)) {
        newPhase = 'voting';
      } else if (currentTime.getHours() === 11 && currentTime.getMinutes() < 45) {
        newPhase = 'choosing';
      }
      setCurrentPhase(newPhase);
    }, 15*60000); // Update every minute

    return () => clearInterval(timerId);
  }, []);


  // Initial sorting of categories
  useEffect(() => {
    const sortedCategories = [...categories].sort((a, b) => b.votes - a.votes);
    const isSorted = JSON.stringify(categories) === JSON.stringify(sortedCategories);
    if (!isSorted) setCategories(sortedCategories);
    
  }, [categories]); // Run this effect only once, on component mount

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

  // Manual override for demo purposes
  const switchToDishChoosing = () => {
    setCurrentPhase("choosing");
  };

  const switchToWaiting = () => {
    setCurrentPhase("waiting");
  }


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
    <Flipper flipKey={`${currentPhase}-${JSON.stringify(categories)}-${JSON.stringify(dishes)}`}>
      <div className="space-y-8">
      <h2 className="text-3xl font-bold px-4 py-2 font-montserrat text-black">
        {currentPhase === "voting" && "1. Vote for a restaurant to make a group order from"}
        {currentPhase === "choosing" && "2. Choose your dish from the chosen restaurant"}
        {currentPhase === "waiting" && "3. Your group order is on the way!"}
        </h2>
        <div className="bg-white rounded-lg shadow-md mt-12">
          <VoteOption timeRange="00:00-11:30" actionDescription="Vote restaurant" currentPhase={currentPhase}/>
          <VoteOption timeRange="11:30-11:45" actionDescription="Choose dish" currentPhase={currentPhase}/>
          <VoteOption timeRange="11:45-" actionDescription="Wait for your food" currentPhase={currentPhase}/>
        </div>
        {currentPhase === "voting" && (
          <Button label="End the voting period early" primary={true} onClick={switchToDishChoosing} />
        )}
        {currentPhase === "choosing" && (
          <Button label="Don't wait and make the order NOW, before the choosing period ends" primary={true} onClick={switchToWaiting} />
        )}

        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-2xl font-bold mb-4">{currentPhase === "voting" ? "Categories" : "Choose your Dish"}</h2>
          <div className="grid grid-cols-3 gap-4 text-black">
          {renderContentBasedOnPhase()}
          </div>
        </div>
      </div>
    </Flipper>
  );
};

export default VotingSection;