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


const generatePastelColor = () => {
  const r = Math.floor(200 + Math.random() * 19); // Rango más cercano a blanco
  const g = Math.floor(200 + Math.random() * 19);
  const b = Math.floor(200 + Math.random() * 19);
  return `rgb(${r}, ${g}, ${b})`;
};


// Asignador de colores por ID dentro de detail
export const assignColorsToArray = (array) => {
  const colorMap = {}; // Mapa para almacenar colores únicos por `oper_id`

  const update_array = array.map((item) => {
    if (!colorMap[item.oper_id]) {
      // Si no hay color asignado a este oper_id, genera uno
      colorMap[item.oper_id] = generatePastelColor();
    }

    return {
      ...item,
      detail: {
        ...item.detail,
        color: colorMap[item.oper_id], // Agrega el color dentro de `detail`
      },
    };
  });

  return update_array
};