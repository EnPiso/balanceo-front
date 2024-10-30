// ListOpers.jsx
import React, { useEffect } from 'react';
import useOpers from "../../../hooks/balances/opers/useOpers.jsx";
import TitleDashboard from "../../../ui/TitleDashboard.jsx";
import { FaCheck } from "react-icons/fa";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import useSelectableRows from "../../../hooks/balances/opers/useSelectableRows.jsx";
import { useRecoilState } from "recoil";
import { selectOpers } from "../../../infraestructure/states/opers_states.js";

export const ListOpers = () => {
  const opers = useOpers();
  const [opersSelect, setOpersSelect] = useRecoilState(selectOpers);

  // Pasa opersSelect como estado inicial para el hook
  const {
    selectedItems,
    handleMouseDown,
    handleMouseUp,
    handleMouseEnter,
    isMousePressed,
  } = useSelectableRows(opersSelect);

  // Sincroniza selectedItems con el átomo de Recoil, evitando el bucle infinito
  useEffect(() => {
    // Convertimos ambos conjuntos en arrays para comparar sus contenidos
    const opersSelectArray = Array.from(opersSelect);
    const selectedItemsArray = Array.from(selectedItems);

    // Solo actualiza Recoil si hay cambios reales
    if (
      opersSelectArray.length !== selectedItemsArray.length ||
      !opersSelectArray.every(item => selectedItems.has(item))
    ) {
      setOpersSelect(selectedItems);
    }
  }, [selectedItems, setOpersSelect, opersSelect]);

  return (
    <div onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} className="select-none">
      <TitleDashboard />
      <Table aria-label="Tabla de operaciones">
        <TableHeader>
          <TableColumn className="select-none">NOMBRE</TableColumn>
        </TableHeader>
        <TableBody>
          {opers.map((oper) => (
            <TableRow
              key={oper.id}
              onMouseDown={() => handleMouseDown(oper.id)}
              onMouseEnter={() => handleMouseEnter(oper.id)}
              className={`cursor-pointer select-none ${
                selectedItems.has(oper.id) ? 'bg-primary-100' : ''
              }`}
            >
              <TableCell className="flex items-center gap-2 select-none">
                {selectedItems.has(oper.id) && (
                  <FaCheck className="text-primary" />
                )}
                {oper.name}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ListOpers;
