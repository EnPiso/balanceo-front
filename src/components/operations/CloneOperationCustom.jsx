import React, { useEffect, useState } from "react";
import CloneObjCustom from "../balances/balancing/customProduct/CloneObjCustom";
import CloneOperationObjCustom from "./CloneOperationObjCustom";




const CloneOperationCustom = ({ addOperation, cloneOperations, setCloneOperations, setShowFormNew  }) => {


  return (
    <div className="overflow-auto max-h-[600px] bg-gray-50 p-4 rounded-md shadow-md">
      <table className="min-w-full border-collapse text-small">
        <thead className="bg-gradient-to-r from-zinc-700 to-zinc-900 text-white sticky top-0 z-10">
        <tr>
          <th className="px-4 py-2 border text-left dark:text-zinc-700 text-secondary_two ">
            Operaciones
          </th>
          <th className="px-4 py-2 border text-left dark:text-zinc-700 text-secondary_two">
            Máquina
          </th>
          <th className="px-4 py-2 border text-left dark:text-zinc-700 text-secondary_two">
            Sam
          </th>
        </tr>
        </thead>
        <tbody className="rounded-md text-zinc-700 font-semibold !cursor-grabbing divide-y divide-gray-200 uppercase">
        {cloneOperations.map((operation) => (
          <CloneOperationObjCustom
            key={operation.id}
            operation={operation}
            addOperation={addOperation}
            setShowFormNew={setShowFormNew}
          />
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default CloneOperationCustom;
