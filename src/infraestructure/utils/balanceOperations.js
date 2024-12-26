export const balanceOperations = (operations, numOperators, golHour) => {
  if (numOperators < 1) return { zones: [], operationMap: new Map() };

  const zones = Array.from({ length: numOperators }, () => []);
  const zonesMinutes = Array.from({ length: numOperators }, () => 0);
  const operationMap = new Map();

  // Distribuir las operaciones entre los operadores
  operations.forEach((operation) => {
    let minutes = operation.sam * golHour;
    let currentOperator = 0;
    const operatorTimes = new Map();

    while (minutes > 0 && currentOperator < numOperators) {
      const remaining = 60 - zonesMinutes[currentOperator];

      if (remaining >= minutes) {
        // Asignar toda la operación al operador actual
        zones[currentOperator].push({
          operation: operation.operation,
          machine: operation.machine,
          minutes,
          sam: operation.sam,
          id: operation.id,
          operation_balancing_id: operation.operation_balancing_id,
        });
        operatorTimes.set(currentOperator, minutes);
        zonesMinutes[currentOperator] += minutes;
        minutes = 0;
      } else if (remaining > 0) {
        // Asignar una fracción de la operación al operador actual
        zones[currentOperator].push({
          operation: operation.operation,
          machine: operation.machine,
          minutes: remaining,
          sam: operation.sam,
          id: operation.id,
          operation_balancing_id: operation.operation_balancing_id,
        });
        operatorTimes.set(currentOperator, remaining);
        minutes -= remaining;
        zonesMinutes[currentOperator] = 60;
        currentOperator += 1;
      } else {
        currentOperator += 1;
      }
    }

    operationMap.set(operation.operation, operatorTimes);
  });

  // Ajustar minutos para garantizar que cada operador tenga exactamente 60 minutos
  zones.forEach((zone, index) => {
    const totalMinutes = zonesMinutes[index];

    if (Math.abs(totalMinutes - 60) > 0.01) {
      const difference = 60 - totalMinutes;
      if (zone.length > 0) {
        const lastOperation = zone[zone.length - 1];

        // Ajustar sin sobrescribir si es una operación fraccionada
        if (difference > 0) {
          lastOperation.minutes += difference;
        } else {
          lastOperation.minutes = Math.max(0, lastOperation.minutes + difference);
        }

        // Actualizar el total de minutos
        zonesMinutes[index] = 60;
      }
    }
  });

  // Redondear minutos al final
  zones.forEach((zone) => {
    zone.forEach((operation) => {
      operation.minutes = parseFloat(operation.minutes.toFixed(2));
    });
  });

  return {
    zones: zones.filter((zone) => zone.length > 0),
    operationMap,
  };
};
