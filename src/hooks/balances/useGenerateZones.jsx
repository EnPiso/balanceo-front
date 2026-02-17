import { useEffect, useState } from 'react';
import { useRecoilState } from "recoil";
import { checkOpersPosition } from "../../infraestructure/states/opers_states.js";
import {zonesOpers} from "../../infraestructure/states/states_balancing.js";

const useGenerateZones = ({ opersSelect, balancing, zones }) => {
  const [selectedOperDetails] = useRecoilState(checkOpersPosition); // Detalles de operadores seleccionados
  const [zonesUpdate, setZonesUpdate] = useState([]);
  const [zonesOpersData, setZonesOpersData] = useRecoilState(zonesOpers); // Array con los datos por operador

  useEffect(() => {


    // Verifica si `opersSelect` tiene elementos y si `balancing` está definido
    if (opersSelect.size > 0 && balancing) {

      const updatedData = zones.map((zone, index) => {
        const totalMinutes = zone.reduce(
          (total, op) => total + parseFloat(op.minutes || 0),
          0
        ).toFixed(2);

        // Generar los datos del operador
        return {
          operator: selectedOperDetails[index]?.id || null, // Verifica si existe el operador
          totalMinutes: parseFloat(totalMinutes),
          operations: zone,
        };
      });



      // Filtrar objetos con operador `null` o `undefined` antes de actualizar
      const filteredData = updatedData.filter((data) => data.operator !== null);

      // **Evita actualizaciones redundantes comparando los datos**
      setZonesOpersData((prevData) => {
        
        // Si los datos no han cambiado, no actualizamos
        if (JSON.stringify(prevData) === JSON.stringify(filteredData)) {
          return prevData;
        }


        return filteredData;
      });
    }
  }, [opersSelect, balancing, zones, selectedOperDetails]);

  // Retorna las zonas actualizadas
  return { zonesUpdate };
};

export default useGenerateZones;
