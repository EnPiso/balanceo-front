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
  const r = Math.floor(200 + Math.random() * 12); // Rango más cercano a blanco
  const g = Math.floor(200 + Math.random() * 12);
  const b = Math.floor(200 + Math.random() * 12);
  return `rgb(${r}, ${g}, ${b})`;
};


// Asignador de colores por ID dentro de detail
export const assignColorsToArray = (array) => {

  const colors_ids = [...new Set(array.map(item => item.oper_id))]

  const update_colors = colors_ids.map((item)=> {
    const data = {
      id: item,
      color: generatePastelColor()
    }
    return data
  })

  // Crear un mapa de colores para acceso rápido
  const colorMap = Object.fromEntries(update_colors.map(item => [item.id, item.color]));

// Recorrer array2 y agregar el atributo `color` al `detail` si hay coincidencia
  const updatedArray = array.map(item => ({
    ...item,
    detail: {
      ...item.detail,
      color: colorMap[item.oper_id] || null, // Asigna el color si existe, de lo contrario null
    },
  }));

  return updatedArray
};


export const isRepeatUpdate = (operationsProduct, operations_balancing_ids) => {
  const updatedObjects = operationsProduct.map((obj) => {
    if (operations_balancing_ids.includes(obj.operation_balancing_id)) {
      return { ...obj, is_repeat: true }; // Si coincide, marca como true
    } else {
      return { ...obj, is_repeat: false }; // Si no coincide, marca como false
    }
  });

  return updatedObjects
}

export const isRepeatColor = (firstArray, secondArray) => {

  // Crear un nuevo array con la información combinada
  const resultArray = secondArray.map((item) => {
    // Buscar en el primer array si hay un objeto con el mismo `operations_balancing_id`
    const match = firstArray.find((entry) => entry.operations_balancing_id === item.operation_balancing_id);

    if (match) {
      // Si hay coincidencia, agregar `colors` e `is_repeat`
      return {
        ...item,
        colors: match.colors,
        is_repeat: match.colors.length > 1,
      };
    } else {
      // Si no hay coincidencia, agregar un array vacío para `colors` y `is_repeat: false`
      return {
        ...item,
        colors: [],
        is_repeat: false,
      };
    }


  });
  return resultArray
}


export const nameReferenceProduct = (garment) => {

  // Usar una expresión regular para capturar texto dentro y fuera de corchetes y llaves
  const match = garment.match(/^(.*?)\s*\[(.*?)\]\s*\{(.*?)\}$/);

  if (match) {
    const outside = match[1]; // Texto fuera de los corchetes
    const inside = match[2];  // Texto dentro de los corchetes
    const categoryProduct = match[3]; // Texto dentro de las llaves

    return {
      name: outside,
      reference: inside,
      categoryProduct: categoryProduct,
    };
  } else {
    console.log("Formato no coincide");
  }
};


export const firstWordInString = (str) => {
  return str.trim().split(" ")[0];
}

export const timeToSeconds = (timeString) => {
  const [minutes, seconds] = timeString.split(":").map(Number);
  return minutes * 60 + seconds;
}