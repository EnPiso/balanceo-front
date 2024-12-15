export const balanceOperations = (operations, numOperators, golHour) => {
  if (numOperators < 1) return { zones: [], operationMap: new Map() };

  const zones = Array.from({ length: numOperators }, () => []);
  const zonesMinutes = Array.from({ length: numOperators }, () => 0);
  const operationMap = new Map();

  operations.forEach((operation) => {
    let samValue = operation.is_sam_minutes ? operation.sam * 60 : operation.sam;

    let minutes = operation.sam * golHour;
    let currentOperator = 0;
    const operatorTimes = new Map();

    while (minutes > 0 && currentOperator < numOperators) {
      if (zonesMinutes[currentOperator] + minutes <= 60) {
        zones[currentOperator].push({
          operation: operation.operation,
          machine: operation.machine,
          minutes: parseFloat(minutes.toFixed(2)),
          sam: operation.sam,
          id: operation.id,
          operation_balancing_id: operation.operation_balancing_id,
        });
        operatorTimes.set(currentOperator, parseFloat(minutes.toFixed(2)));
        zonesMinutes[currentOperator] += minutes;
        minutes = 0;
      } else {
        const remaining = 60 - zonesMinutes[currentOperator];
        if (remaining > 0) {
          zones[currentOperator].push({
            operation: operation.operation,
            machine: operation.machine,
            minutes: parseFloat(remaining.toFixed(2)),
            sam: operation.sam,
            id: operation.id,
            operation_balancing_id: operation.operation_balancing_id,
          });
          operatorTimes.set(currentOperator, parseFloat(remaining.toFixed(2)));
        }
        minutes -= remaining;
        zonesMinutes[currentOperator] = 60;
        currentOperator += 1;
      }
    }
    operationMap.set(operation.operation, operatorTimes);
  });

  // Ajuste final para garantizar que todos los operadores tengan exactamente 60 minutos
  const totalAssigned = zonesMinutes.reduce((sum, minutes) => sum + minutes, 0);
  const totalExpected = numOperators * 60;
  let adjustment = totalExpected - totalAssigned;

  if (adjustment !== 0) {
    zones.forEach((zone, index) => {
      if (adjustment === 0) return;

      if (adjustment > 0) {
        // Agregar tiempo faltante
        const missing = Math.min(adjustment, 60 - zonesMinutes[index]);
        if (missing > 0) {
          zone.push({
            operation: "Adjustment",
            machine: null,
            minutes: parseFloat(missing.toFixed(2)),
            sam: null,
            id: null,
            operation_balancing_id: null,
          });
          zonesMinutes[index] += missing;
          adjustment -= missing;
        }
      } else {
        // Quitar tiempo en exceso
        let excess = Math.min(Math.abs(adjustment), zonesMinutes[index]);
        if (excess > 0) {
          for (let op of zone) {
            if (op.minutes >= excess) {
              op.minutes -= parseFloat(excess.toFixed(2));
              adjustment += excess;
              break;
            } else {
              adjustment += op.minutes;
              op.minutes = 0;
            }
          }
          zone = zone.filter((op) => op.minutes > 0);
          zonesMinutes[index] = zone.reduce((sum, op) => sum + op.minutes, 0);
        }
      }
    });
  }

  return {
    zones: zones.filter((zone) => zone.length > 0),
    operationMap,
  };
};
