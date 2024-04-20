//src/components/VoteOption.tsx
import React from 'react';
import { isCurrentTimeInRange } from './utilities/timeUtils';

interface VoteOptionProps {
  timeRange: string;
  actionDescription: string;
}

const VoteOption: React.FC<VoteOptionProps> = ({ timeRange, actionDescription }) => {
  const isActive = isCurrentTimeInRange(timeRange);

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
