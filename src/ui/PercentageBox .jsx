import React from 'react';

const PercentSamplesZones = ({ value }) => {
  let color = '';

  if (value < 60) {
    color = 'bg-red-500';
  } else if (value >= 60 && value < 80) {
    color = 'bg-yellow-500';
  } else if (value >= 80 && value <= 100) {
    color = 'bg-secondary_two';
  } else {
    color = 'bg-blue-500';
  }

  // Calcular cuánto le falta
  const remaining = value > 100 ? 0 : 100 - value;

  return (
    <div className="w-36 h-6 bg-zinc-200 rounded overflow-hidden flex shadow-md">
      <div
        className={`${color} h-full text-zinc-100 text-sm font-bold flex items-center justify-center`}
        style={{ width: `${Math.min(value, 100)}%` }}
      >
        {value > 30 && `${value.toFixed(0)} %`}
      </div>
      {value < 100 && (
        <div
          className="h-full bg-white text-gray-500 text-xs flex items-center justify-center"
          style={{ width: `${remaining}%` }}
        >
         
        </div>
      )}
    </div>
  );
};

export default PercentSamplesZones;
