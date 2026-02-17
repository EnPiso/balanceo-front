import React, { useEffect, useRef } from 'react';
import { useRecoilState } from "recoil";
import { orderObjBalancing } from "../../../../infraestructure/states/order_states.js";
import { checkOpersPosition, selectOpers } from "../../../../infraestructure/states/opers_states.js";
import { fetchGetData } from "../../../../infraestructure/call_api/crud.js";
import { urlMain } from "../../../../infraestructure/data/const.js";

const useModal = () => {
  const [objBalancing] = useRecoilState(orderObjBalancing);
  const [, setSelectedOperDetails] = useRecoilState(checkOpersPosition); // No necesitas el valor actual aquí, solo el setter
  const [, setOpersSelect] = useRecoilState(selectOpers);
  const hasFetchedData = useRef(false); // Usamos useRef para verificar si ya se ha ejecutado

  useEffect(() => {


    const product_id = objBalancing.product?.id; // Usa `?.` en caso de que `product` esté inicialmente indefinido

    if (product_id) {
      const getData = async () => {
        try {
          const result = await fetchGetData(`${urlMain}/opers_balancings?product_id=${product_id}`);

          if (result && Array.isArray(result)) {
            // Extrae los IDs y detalles de los operarios desde la respuesta
            const operDetails = result.map((operBalancing, index) => ({
              id: operBalancing.oper.id,
              name: operBalancing.oper.name,
              index: index + 1 // Define la posición como el índice en la lista
            }));
            setSelectedOperDetails(operDetails);

            const operIds = new Set(result.map(operBalancing => operBalancing.oper.id));
            setOpersSelect(operIds); // Asegura que opersSelect esté actualizado

          } else {
            console.warn("No se encontraron datos de operarios.");
          }
        } catch (error) {
          console.error('Error al obtener los datos:', error);
        }
      };

      getData();

    }
  }, []); // Dependencias vacías para que se ejecute solo una vez al montar

  return objBalancing;
};

export default useModal;
