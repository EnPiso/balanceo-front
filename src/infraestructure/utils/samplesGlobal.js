export const samplesGlobalShared = (samplingsCircle, opersSelect, totalSam) => {
  // Función para convertir "mm:ss" a segundos
  const convertToSeconds = (time) => {
    
    const [minutes, seconds] = time.split(":").map(Number);
    
    return minutes * 60 + seconds;
  };

  // Sumar todos los valores de "sample" en segundos
  
  const samplings = samplingsCircle.flat()
  
  let totalSeconds = samplings.reduce((total, item) => {
    return total + convertToSeconds(item.sample);
  }, 0);

  totalSeconds = totalSeconds / 60; // Convertir a minutos
  totalSeconds = totalSeconds / samplingsCircle.length; // Promedio de minutos

  // Función para procesar el formato de tiempo
  const processTimeFormat = (timeFormat) => {
    const [time, divisor] = timeFormat.split("/").map(Number); // Separar el tiempo y el divisor
    // Dividir por el divisor y redondear a 2 decimales
    return `${((time / divisor) * 100).toFixed(0)} %`;
  };

  // Calcular golDay
  const golDay = () => {
    const minutesHour = opersSelect.size * 60;
    const golHour = parseInt(minutesHour / totalSeconds);
    const golDayNumber = parseInt((minutesHour / totalSeconds) * 8);

    return golDayNumber;
  };

  // Retornar los datos calculados
  return {
    cycles: samplingsCircle.length,
    total_time: totalSeconds.toFixed(2),
    potencial_percent: processTimeFormat(`${totalSam}/${totalSeconds}`),
    potential_uds: golDay(),
  };
};