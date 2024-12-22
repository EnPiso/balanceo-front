// components/OperatorDetailsOperations.jsx
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { checkOpersPosition } from "../../../../infraestructure/states/opers_states.js";
import {updateDragOperation, zonesOpers} from "../../../../infraestructure/states/states_balancing.js";
import {orderObjBalancing} from "../../../../infraestructure/states/order_states.js";
import {FaUser} from "react-icons/fa6";

const OperatorDetailsOperations = ({ zone, index }) => {
  const [selectedOperDetails] = useRecoilState(checkOpersPosition); // Array con los detalles de cada selección
  const [zonesOpersData, setZonesOpersData] = useRecoilState(zonesOpers); // Array con los datos por operador
  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);
  const [updateDrag, setUpdateDrag] = useRecoilState(updateDragOperation);



  // Calcula el total de minutos
  const totalMinutes = zone.reduce((total, op) => total + parseFloat(op.minutes), 0).toFixed(2);

  // Efecto para actualizar los datos del operador en zonesOpersData
  useEffect(() => {
    console.log("Ejecución del useEffect", { selectedOperDetails, totalMinutes, index, zone });

    const operatorData = {
      operator: selectedOperDetails[index]?.id,
      totalMinutes: parseFloat(totalMinutes),
      operations: zone,
    };

    setZonesOpersData((prevData) => {
      const updatedData = Array.isArray(prevData) ? [...prevData] : [];
      const filteredData = updatedData.filter((data) => data.operator !== undefined);

      const operatorExists = filteredData.some((data) => data.operator === operatorData.operator);

      if (!operatorExists && operatorData.operator !== undefined) {
        filteredData.push(operatorData);
        console.log("Nuevo operador agregado:", operatorData);
      } else if (operatorExists) {
        const existingIndex = filteredData.findIndex((data) => data.operator === operatorData.operator);
        filteredData[existingIndex] = operatorData;
        console.log("Operador actualizado:", operatorData);
      } else {
        console.warn(`Se intentó agregar un objeto con 'operator: undefined' en el índice ${index}`);
      }

      const result = filteredData.filter((item) =>
        selectedOperDetails.some((obj) => obj.id === item.operator)
      );
      return result;
    });
  }, [selectedOperDetails, totalMinutes, objBalancing]);






  return (
    <div className="border rounded-lg p-4 bg-white dark:bg-zinc-800">

        {selectedOperDetails.length >= 1 && (
          <>
            <div className="flex justify-between items-center">
              <h3 className="text-lg mb-3 text-zinc-500 uppercase font-black">
                {selectedOperDetails[index]?.index} - {" "}
                {selectedOperDetails[index]?.name}
              </h3>
              <FaUser color="green"/>
            </div>

          </>
      )}

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
          Total minutos: {Math.round(totalMinutes)}
        </p>
      </div>
    </div>
  );
};

export default OperatorDetailsOperations;
