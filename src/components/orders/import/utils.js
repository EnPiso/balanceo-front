// Función para extraer imágenes del workbook
export const extractImages = (workbook) => {
  const images = [];
  if (workbook.model?.media) {
    workbook.model.media.forEach((media) => {
      if (media.type === 'image') {
        const base64String = `data:image/${media.extension};base64,${media.buffer.toString('base64')}`;
        images.push(base64String);
      }
    });
  }
  return images;
};

// Función para extraer operaciones del worksheet
export const extractOperations = (worksheet) => {
  const operations = [];
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber > 1) {
      operations.push({
        name: row.getCell(1).value,
        machine: row.getCell(2).value,
        repetitions: row.getCell(3).value,
        observations: row.getCell(4).value,
        guideType: row.getCell(6).value,
        garment: row.getCell(7).value,
        sam: row.getCell(8).value,
      });
    }
  });
  return operations;
};


export const formatearString = (str) => {
  // Eliminar caracteres especiales (excepto letras, números y espacios)
    if (!str) {
    console.warn("Se recibió un valor null o undefined para formatear.");
    return "";
  }
  const sinEspeciales = str.replace(/[^\w\s]/gi, '');

  // Eliminar espacios al final
  const sinEspaciosFinal = sinEspeciales.trimEnd();

  // Eliminar puntos al final (si los hubiera, aunque en tu ejemplo no hay)
  const sinPuntoFinal = sinEspaciosFinal.replace(/\.$/, '');

  return sinPuntoFinal;
}