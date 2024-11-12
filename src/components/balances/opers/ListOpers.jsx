import React, { useEffect } from 'react';
import useOpers from "../../../hooks/balances/opers/useOpers.jsx";
import TitleDashboard from "../../../ui/TitleDashboard.jsx";
import { FaCheck } from "react-icons/fa";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import useSelectableRows from "../../../hooks/balances/opers/useSelectableRows.jsx";
import { useRecoilState } from "recoil";
import { selectOpers } from "../../../infraestructure/states/opers_states.js";

export const ListOpers = ({ updateSelectedOperDetails, selectedOperDetails }) => {
  const opers = useOpers();
  const [opersSelect, setOpersSelect] = useRecoilState(selectOpers);

  const {
    selectedItems,
    handleMouseDown,
    handleMouseUp,
    handleMouseEnter,
  } = useSelectableRows(opersSelect);

  useEffect(() => {
    const opersSelectArray = Array.from(opersSelect);
    const selectedItemsArray = Array.from(selectedItems);

    if (
      opersSelectArray.length !== selectedItemsArray.length ||
      !opersSelectArray.every(id => selectedItems.has(id))
    ) {
      setOpersSelect(new Set(selectedItems));
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
              onMouseDown={() => {
                handleMouseDown(oper.id);
                updateSelectedOperDetails(oper, !selectedItems.has(oper.id)); // Actualiza `selectedOperDetails`
              }}
              onMouseEnter={() => handleMouseEnter(oper.id)}
              className={`cursor-pointer select-none ${selectedItems.has(oper.id) ? 'bg-primary-100' : ''}`}
            >
              <TableCell className="flex items-center gap-2 select-none">
                {selectedItems.has(oper.id) && (
                  <>
                    <FaCheck className="text-primary" />
                    {/* Mostrar el índice de selección */}
                  </>
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
