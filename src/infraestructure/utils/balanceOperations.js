// utils/balanceOperations.js
export const balanceOperations = (operations, numOperators, golHour) => {
  if (numOperators < 1) return { zones: [], operationMap: new Map() };

  const zones = Array.from({ length: numOperators }, () => []);
  const zonesMinutes = Array.from({ length: numOperators }, () => 0);
  const operationMap = new Map();

  operations.forEach((operation) => {
    let minutes = operation.sam * golHour;
    let currentOperator = 0;
    const operatorTimes = new Map();

    while (minutes > 0 && currentOperator < numOperators) {
      if (zonesMinutes[currentOperator] + minutes <= 60) {
        zones[currentOperator].push({
          operation: operation.operation,
          machine: operation.machine,
          minutes: minutes.toFixed(2),
          sam: operation.sam
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
            minutes: remaining.toFixed(2),
            sam: operation.sam
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

  return {
    zones: zones.filter(zone => zone.length > 0),
    operationMap
  };
};