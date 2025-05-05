import React from "react";

export const LoadingState: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin h-8 w-8 border-4 border-orange-400 rounded-full border-t-transparent"></div>
    </div>
  );
};
