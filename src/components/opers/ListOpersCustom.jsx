import React, {useEffect, useState} from "react";
import {fetchGetData} from "../../infraestructure/call_api/crud.js";
import {urlMain} from "../../infraestructure/data/const.js";
import {FaBackward, FaPlusCircle} from "react-icons/fa";
import FormCategoryProduct from "../products/FormCategoryProduct.jsx";
import EditCategoryCrud from "../products/EditCategoryCrud.jsx";
import {FaDeleteLeft, FaUser} from "react-icons/fa6";
import {Spinner} from "@nextui-org/react";
import FormEditInput from "../balances/balancing/sidebarForm/FormEditInput.jsx";
import FormDynamicField from "./FormDynamicField.jsx";
import TheadOperatorsCustom from "./TheadOperatorsCustom.jsx";
import EditOperFormEdit from "./EditOperFormEdit.jsx";
import { listOpersCustom } from "../../infraestructure/states/opers_states.js";
import { useRecoilState } from "recoil";

const ListOpersCustom = ({prodPlant, isLoading, setIsLoading, setIsLoadingModules}) => {
  const [opers,setOpers] = useRecoilState(listOpersCustom)

  const [isNewOperator,setIsNewOperator] = useState(false)

  const [nameData,setNameData] = useState('')
  const [idOper,setIdOper] = useState('')

  useEffect(() => {
    const getData = async () => {
      const module_id = prodPlant.module.id
      try {
        const data = await fetchGetData(`${urlMain}opers?module_id=${module_id}`);
        setIsLoading(false)
        
        setOpers(data);

      } catch (error) {
        console.error('Error al obtener los datos:', error);
      } finally {
        setIsLoadingModules(null)
      }
    };

    getData();
  }, [prodPlant]);


  return(
    <>

      <table className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-lg shadow-md border border-gray-300">
        {isNewOperator && (
          <TheadOperatorsCustom
            opers={opers}
            setOpers={setOpers}
            moduleId={prodPlant && prodPlant.module.id}
            setIsNewOperator={setIsNewOperator}
          />
        )}
        <thead>
        <tr className="dark:bg-gray-100 bg-zinc-200 text-zinc-800 sticky top-0">
          <th className="p-4 font-medium border border-gray-300">Nombre</th>
          <th className="p-4 font-medium border border-gray-300 flex justify-between items-center">
            <span>Cédula</span>
            <span onClick={() => setIsNewOperator(!isNewOperator)} className={`cursor-pointer flex items-center font-bold `}>
              {!isNewOperator ? (
                <>
                  Agregar operario <FaPlusCircle size={23} className="ml-2 text-secondary_two"/>
                </>
              ) : (
                <>
                 <FaBackward color="red" className="mr-2"/> Cancelar 
                </>
              )}
            </span>
          </th>
        </tr>
        </thead>
        <tbody>
        {isLoading ? (
          <tr>
            <td colSpan={2} className="text-center p-4">
              <Spinner size="lg" color="default"/>
            </td>
          </tr>
        ) : (
          opers.map((oper, i) => <EditOperFormEdit key={i} oper={oper} opers={opers} setOpers={setOpers}/>)
        )}
        </tbody>
      </table>

    </>
  )
}

export default ListOpersCustom;