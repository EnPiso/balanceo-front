export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const formatDateRails = (isoDateString) => {
  const date = new Date(isoDateString); // Convierte el string ISO a un objeto Date
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date);
};