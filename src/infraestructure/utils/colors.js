export const colorFormatPercent = (value) => {
  let color = '';

  if (value < 60) {
    color = 'red';
  } else if (value >= 60 && value < 80) {
    color = 'yellow';
  } else if (value >= 80 && value <= 100) {
    color = 'green';
  } else {
    color = 'blue';
  }

  return color
}