
import React from 'react';

const Logo = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="h-8 w-8 bg-medical-primary rounded-md flex items-center justify-center mr-2">
        <span className="text-white font-bold text-sm">M</span>
      </div>
      <div className="font-bold text-xl text-medical-primary">
        <span className="text-medical-secondary">Medifile</span>
      </div>
    </div>
  );
};

export default Logo;
