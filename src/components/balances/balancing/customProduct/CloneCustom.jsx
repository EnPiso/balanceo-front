import React, { useEffect, useState } from "react";
import { fetchGetData } from "../../../../infraestructure/call_api/crud.js";
import { urlMain } from "../../../../infraestructure/data/const.js";
import CloneObjCustom from "./CloneObjCustom.jsx";
import {useRecoilState} from "recoil";
import {searchOperations} from "../../../../infraestructure/states/operation_states.js";

const CloneCustom = ({ addOperation }) => {
  const [cloneOperations, setCloneOperations] = useRecoilState(searchOperations);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchGetData(`${urlMain}operations`);
        setCloneOperations(result);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    // getData();
  }, []);

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
          <CloneObjCustom
            key={operation.id}
            operation={operation}
            addOperation={addOperation}
          />
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default CloneCustom;
