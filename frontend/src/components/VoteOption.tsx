// src/components/VoteOption.tsx
import React from 'react';

interface VoteOptionProps {
  timeRange: string;
  actionDescription: string;
  currentPhase: string; // New prop to determine if this option should be active
}

const phaseToTimeRange = {
  voting: "00:00-11:30",
  choosing: "11:30-11:45",
  waiting: "11:45-"
};

const VoteOption: React.FC<VoteOptionProps> = ({ timeRange, actionDescription, currentPhase }) => {
  const isActive = phaseToTimeRange[currentPhase] === timeRange;

  return (
    <div className={`flex flex-col justify-center items-center px-4 py-2 border-b ${isActive ? 'bg-gray-100' : ''}`}>
      <span className={`text-center ${isActive ? 'text-black font-bold' : 'text-gray-700'}`}>
        {actionDescription}
      </span>
      <span className={`text-center ${isActive ? 'text-black font-bold' : 'text-gray-500'}`}>
        {timeRange}
      </span>
    </div>
  );
};

export default VoteOption;