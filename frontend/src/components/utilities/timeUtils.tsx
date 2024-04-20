// src/utilities/timeUtils.tsx

export const isCurrentTimeInRange = (timeRange: string): boolean => {
    const currentTime = new Date();
    const [start, end] = timeRange.split('-').map((time) => {
      const [hours, minutes] = time.split(':').map(Number);
      const date = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), hours, minutes);
      return isNaN(hours) ? new Date(currentTime.getTime() + 86400000) : date; // if hours are NaN, set date to one day ahead
    });
  
    return currentTime >= start && (!end || currentTime <= end);
  };
  