import React, {useEffect, useState} from 'react'
import {FaArrowDownUpAcrossLine} from "react-icons/fa6";
import {FaCheck, FaClone, FaSave} from "react-icons/fa";
import {fetchGetData} from "../../../../infraestructure/call_api/crud.js";
import {urlMain} from "../../../../infraestructure/data/const.js";
import CloneObjCustom from "./CloneObjCustom.jsx";
import CustomButton from "../../../../ui/CustomButton.jsx";
import SearchCustom from "./SearchCustom.jsx";

const CloneCustom = () => {


  const [cloneOperations, setCloneOperations] = useState([]);

  const [operationsUpdate, setOperationsUpdate] = useState([]);


  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchGetData(`${urlMain}/operations`);

        console.log(result)
        setCloneOperations(result)

      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    getData();
  }, []);


  useEffect(() => {
    console.log(operationsUpdate)
  }, [operationsUpdate]);

  return (
   <>
     <div className="py-1">
       <SearchCustom/>
     </div>
     <div className="overflow-auto max-h-64">


       <table className="min-w-full border-collapse border border-gray-200">
         <thead className="dark:bg-zinc-100 bg-zinc-700 sticky top-0 z-10">
         <tr>
           <th className="px-4 py-2 border text-left dark:text-zinc-700 text-zinc-100 flex justify-between items-center">
             <FaCheck/>
             <span className="ml-2">Seleccionar</span>
           </th>
           <th className="px-4 py-2 border text-left dark:text-zinc-700 text-zinc-100">

             <span>Operación</span>
           </th>
           <th className="px-4 py-2 border text-left dark:text-zinc-700 text-zinc-100">Máquina</th>
           <th className="px-4 py-2 border text-left dark:text-zinc-700 text-zinc-100">Sam</th>

         </tr>
         </thead>
         <tbody className="rounded-md text-zinc-700  font-semibold !cursor-grabbing">
         {
           cloneOperations.map((operation)=> {
             return(
               <CloneObjCustom
                 operation={operation}
                 setOperationsUpdate={setOperationsUpdate}
                 operationsUpdate={operationsUpdate}
               />
             )
           })
         }

         </tbody>
       </table>

     </div>
     {
       operationsUpdate.length >= 1 && (
         <div className="py-2">
           <CustomButton
             color="default"
             variant="bordered"
             startContent={<FaSave color="green" />}
             onClick={()=> console.log("click")}
             title="Agregar Operación"
           />
         </div>
       )
     }

   </>
  )
}
export default CloneCustom
