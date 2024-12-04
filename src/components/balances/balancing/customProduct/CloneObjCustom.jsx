import React from 'react';
import {Checkbox} from "@nextui-org/react";
import {FaClone} from "react-icons/fa";

const CloneObjCustom = ({operation, setOperationsUpdate, operationsUpdate}) => {
  const [isSelected, setIsSelected] = React.useState(false);

  const handleCheck = (e, operation) => {
    setIsSelected(e);

    if (e) {
      // Si se selecciona, agregar la operación al array
      setOperationsUpdate((prev) => [...prev, operation]);
    } else {
      // Si se deselecciona, eliminar la operación del array
      setOperationsUpdate((prev) => prev.filter((op) => op.id !== operation.id));
    }
  };

  return (
    <tr className="dark:text-white">
      <td className="px-4 py-2 border border-gray-300 flex justify-center !cursor-pointer">
        <Checkbox
          color="default"
          size={"md"}
          isSelected={isSelected}
          onValueChange={(e) => handleCheck(e, operation)}
          icon={<FaClone />}
        />
      </td>
      <td className="px-4 py-2 border border-gray-300 ">
        {operation.operation}
      </td>
      <td className="px-4 py-2 border border-gray-300 ">
        {operation.machine}
      </td>
      <td className="px-4 py-2 border border-gray-300 ">
        {operation.sam}
      </td>
    </tr>
  );
};

export default CloneObjCustom;
