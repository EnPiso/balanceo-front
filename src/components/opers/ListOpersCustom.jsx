import React, {useEffect, useState} from "react";
import {fetchGetData} from "../../infraestructure/call_api/crud.js";
import {urlMain} from "../../infraestructure/data/const.js";
import {FaPlusCircle} from "react-icons/fa";
import FormCategoryProduct from "../products/FormCategoryProduct.jsx";
import EditCategoryCrud from "../products/EditCategoryCrud.jsx";
import {FaDeleteLeft} from "react-icons/fa6";
import {Spinner} from "@nextui-org/react";
import FormEditInput from "../balances/balancing/sidebarForm/FormEditInput.jsx";

const ListOpersCustom = ({prodPlant, isLoading, setIsLoading}) => {
  const [opers,setOpers] = useState([])

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
      }
    };

    getData();
  }, [prodPlant]);


  return(
    <>

      <table className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-lg shadow-md border border-gray-300">
        <thead>
        <tr className="dark:bg-gray-100 bg-zinc-200 text-zinc-100 dark:text-zinc-800 sticky top-0 ">
          <th className="p-4 font-medium border border-gray-300 flex justify-between items-center text-zinc-800">
            <span>Nombre</span>
            <span>
              {
                isNewOperator ? (
                  <span className={"flex justify-between items-center"}>
                    <span className={"mr-2"}>
                       <FormEditInput
                         value={idOper}
                         setState={setIdOper}
                         valueDefault={""}
                         onKeyDown={()=> console.log("onkeydown")}
                       />
                    </span>

                   <span>
                      <FormEditInput
                        value={nameData}
                        setState={setNameData}
                        valueDefault={""}
                        onKeyDown={()=> console.log("onkeydown")}
                      />
                   </span>
                  </span>
                ) : (
                  <button onClick={()=> setIsNewOperator(true)}>
                    <FaPlusCircle color={"green"} size={23}/>
                  </button>
                )
              }

            </span>
          </th>
        </tr>
        </thead>
        <tbody>
        {
          isLoading ? (
            <>
              <div className="flex justify-center">
                <Spinner size={"lg"} color={"default"}/>
              </div>
            </>
          ) : (
            <>
              {
                opers.map((oper, i) => {
                  return (
                    <>
                      <tr key={i}>
                        <td className={"p-3 border border-gray-300 cursor-pointer  flex justify-between items-center"}>
                          <span className={"cursor-pointer"}>
                            {
                              oper.name
                            }
                          </span>
                          <FaDeleteLeft color={"red"} size={23}/>
                        </td>
                      </tr>
                    </>
                  )
                })
              }
            </>
          )
        }

        </tbody>
      </table>

    </>
  )
}

export default ListOpersCustom;