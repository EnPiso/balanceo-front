// components/OperatorDetailsOperations.jsx
import {useRecoilState} from "recoil";
import {checkOpersPosition} from "../../../../infraestructure/states/opers_states.js";
import {useEffect} from "react";

const OperatorDetailsOperations = ({ zone, index }) => {
  const [selectedOperDetails, setSelectedOperDetails] = useRecoilState(checkOpersPosition); // Array con los detalles de cada selección

  return(
    <div className="border rounded-lg p-4 bg-white dark:bg-zinc-800">
      <h3 className="text-lg font-medium mb-3">Operador {selectedOperDetails.length >= 1 && selectedOperDetails[index]?.name}</h3>
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
          Total minutos: {zone.reduce((total, op) => total + parseFloat(op.minutes), 0).toFixed(2)}
        </p>
      </div>
    </div>
  )
};

export default OperatorDetailsOperations;