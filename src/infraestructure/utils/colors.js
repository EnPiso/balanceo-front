export const colorFormatPercent = (value) => {
  const valueInt = parseInt(value);
  if (valueInt < 60) return 'text-red-500';
  if (valueInt < 80) return 'text-yellow-500';
  if (valueInt <= 100) return 'text-green-500';
  return 'text-blue-500';
};