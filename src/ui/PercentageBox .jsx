import React from 'react';

const PercentSamplesZones = ({ value }) => {
  let color = '';

  if (value < 60) {
    color = 'bg-red-500';
  } else if (value >= 60 && value < 80) {
    color = 'bg-yellow-500';
  } else if (value >= 80 && value <= 100) {
    color = 'bg-green-500';
  } else {
    color = 'bg-blue-500';
  }

  const remaining = value > 100 ? 0 : 100 - value;

  return (
    <div className="w-full max-w-sm h-6 bg-zinc-200 rounded overflow-hidden flex drop-shadow-md">
      <div
        className={`${color} h-full text-zinc-100 text-xs sm:text-sm font-semibold flex items-center justify-center transition-all duration-300 ease-in-out`}
        style={{ width: `${Math.min(value, 100)}%` }}
      >
        {value > 30 && `${value.toFixed(0)} %`}
      </div>
      {value < 100 && (
        <div
          className="h-full bg-white text-gray-400 text-xs flex items-center justify-center"
          style={{ width: `${remaining}%` }}
        >
          {/* Espacio restante */}
        </div>
      )}
    </div>
  );
};

export default PercentSamplesZones;
