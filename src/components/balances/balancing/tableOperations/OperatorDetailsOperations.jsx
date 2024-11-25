// components/OperatorDetailsOperations.jsx
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { checkOpersPosition } from "../../../../infraestructure/states/opers_states.js";
import { zonesOpers } from "../../../../infraestructure/states/states_balancing.js";

const OperatorDetailsOperations = ({ zone, index }) => {
  const [selectedOperDetails] = useRecoilState(checkOpersPosition); // Array con los detalles de cada selección
  const [zonesOpersData, setZonesOpersData] = useRecoilState(zonesOpers); // Array con los datos por operador

  // Calcula el total de minutos
  const totalMinutes = zone.reduce((total, op) => total + parseFloat(op.minutes), 0).toFixed(2);

  // Efecto para actualizar los datos del operador en zonesOpersData
  useEffect(() => {
    const operatorData = {
      operator: selectedOperDetails[index]?.id,
      totalMinutes: parseFloat(totalMinutes),
      operations: zone,
    };

    setZonesOpersData((prevData) => {
      // Asegúrate de que prevData sea un array antes de actualizar
      const updatedData = Array.isArray(prevData) ? [...prevData] : [];
      updatedData[index] = operatorData; // Actualiza el índice correspondiente
      return updatedData;
    });

  }, [zone, selectedOperDetails, index, totalMinutes, setZonesOpersData]);


  return (
    <div className="border rounded-lg p-4 bg-white dark:bg-zinc-800">
      <h3 className="text-lg font-medium mb-3">
        Operador {selectedOperDetails.length >= 1 && selectedOperDetails[index]?.name}
      </h3>
      <div className="space-y-2">
        {zone.map((operation, opIndex) => (
          <div key={opIndex} className="border-b pb-2">
            <p className="font-medium">{operation.operation}</p>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <p>Máquina: {operation.machine}</p>
              <p>Minutos: {operation.minutes}</p>
            </div>
          </div>
        ))}
        <p className="font-medium pt-2">
          Total minutos: {totalMinutes}
        </p>
      </div>
    </div>
  );
};

export default OperatorDetailsOperations;
