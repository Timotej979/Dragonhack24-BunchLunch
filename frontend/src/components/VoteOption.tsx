//src/components/VoteOption.tsx
import React from 'react';

interface VoteOptionProps {
  timeRange: string;
  actionDescription: string;
}

const VoteOption: React.FC<VoteOptionProps> = ({ timeRange, actionDescription }) => {
  return (
    <div className="flex flex-col justify-center items-center px-4 py-2 border-b">
      <span className="text-gray-700 text-center">{actionDescription}</span>
      <span className="font-bold text-gray-500 text-center">{timeRange}</span>
    </div>
  );
};

export default VoteOption;
