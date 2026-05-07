import React from 'react';

const FrameworkCard = ({ title, subtitle, children, accent = 'red' }) => {
  const accentColors = {
    red: 'border-l-red-500',
    blue: 'border-l-blue-500',
    green: 'border-l-green-500',
    amber: 'border-l-amber-500',
  };

  return (
    <div className={`framework-card border-l-4 ${accentColors[accent]}`}>
      <div className="mb-4">
        <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
        {subtitle && <p className="text-sm text-gray-400 mt-1 uppercase tracking-wider">{subtitle}</p>}
      </div>
      <div className="text-base text-gray-300">
        {children}
      </div>
    </div>
  );
};

export default FrameworkCard;
