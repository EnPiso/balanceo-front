import React, { useState } from 'react';

const BalancedOperations = () => {
  // Define initial operations data
  const initialOperations = [
    { name: "PEGAR BOLERO INFERIOR A PIEZA SUPERIOR ZURCIENDO", sam: 1.547 },
    { name: "CERRAR COSTADOS M/S X2 CON COMPOSICIÓN CAZANDO BOLERO", sam: 0.933 },
    { name: "SESGAR SISAS X2 MEDIA SISA", sam: 0.726 },
    { name: "SESGAR TIRA", sam: 0.495 },
    { name: "DOBLAR ESCOTE FORMANDO TÚNEL", sam: 0.851 },
    { name: "DOBLAR RUEDO BAJO", sam: 0.692 },
    { name: "MEDIR Y CORTAR TIRA", sam: 0.379 },
    { name: "FIJAR MARQUILLA", sam: 0.241 },
    { name: "REMATAR PUNTAS DE TIRA DOBLANDO X4", sam: 0.635 },
    { name: "REMATAR EXTREMOS DE ESCOTE X2", sam: 0.521 },
    { name: "INSERTAR TIRA EN TUNELX1", sam: 0.759 }
  ];

  // State to hold number of available operators
  const [numOperators, setNumOperators] = useState(0);

  // Function to balance operations across operators
  const balanceOperations = (operations, operators) => {
    const zones = Array.from({ length: operators }, () => []);
    const zonesMinutes = Array.from({ length: operators }, () => 0);

    operations.forEach((operation) => {
      let minutes = operation.sam * Math.floor((60 * operators) / operations.reduce((total, op) => total + op.sam, 0));
      let currentOperator = 0;

      while (minutes > 0 && currentOperator < operators) {
        if (zonesMinutes[currentOperator] + minutes <= 60) {
          zones[currentOperator].push({ name: operation.name, minutos_necesarios: minutes.toFixed(2) });
          zonesMinutes[currentOperator] += minutes;
          minutes = 0;
        } else {
          const remaining = 60 - zonesMinutes[currentOperator];
          if (remaining > 0) {
            zones[currentOperator].push({ name: operation.name, minutos_necesarios: remaining.toFixed(2) });
          }
          minutes -= remaining;
          zonesMinutes[currentOperator] = 60;
          currentOperator += 1;
        }
      }
    });

    return zones.filter((zone) => zone.length > 0);
  };

  // Function to render balanced operations
  const renderBalancedOperations = () => {
    if (numOperators === 0) return null;

    const zones = balanceOperations(initialOperations, numOperators);

    return (
      <div className="space-y-4">
        {zones.map((zone, index) => (
          <div key={index}>
            <h3 className="text-lg font-medium">Operator {index + 1}</h3>
            <ul className="space-y-2">
              {zone.filter(operation => parseFloat(operation.minutos_necesarios) > 0).map((operation, opIndex) => (
                <li key={opIndex}>
                  {operation.name}: {operation.minutos_necesarios} minutes
                </li>
              ))}
            </ul>
            <p className="font-medium">
              Total minutes: {zone.reduce((total, op) => total + parseFloat(op.minutos_necesarios), 0).toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-md">
      <div>
        <div>Balanced Operations</div>
      </div>
      <div>
        <div className="space-y-4">
          <label htmlFor="numOperators" className="block font-medium">
            Number of Operators:
          </label>
          <input
            type="number"
            id="numOperators"
            className="w-full border rounded px-3 py-2"
            value={numOperators}
            onChange={(e) => setNumOperators(parseInt(e.target.value))}
          />
          {renderBalancedOperations()}
        </div>
      </div>
    </div>
  );
};

export default BalancedOperations;