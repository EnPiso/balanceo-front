import React, {useEffect} from 'react'
import {useRecoilState} from "recoil";
import {balancingData, listRedistributions} from "../../../../infraestructure/states/states_balancing.js";
import {fetchGetData} from "../../../../infraestructure/call_api/crud.js";
import {urlMain} from "../../../../infraestructure/data/const.js";
import {orderObjBalancing} from "../../../../infraestructure/states/order_states.js";

const TableRedistribution = () => {
  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);


  const [redistributions, setRedistributions] = useRecoilState(listRedistributions)

  useEffect(() => {
    // operations_balancings/list_redistributions
    const balancing_id = objBalancing.balancing_id
    const getData = async () => {
      try {
        const result = await fetchGetData(`${urlMain}operations_balancings/list_redistributions?balancing_id=${balancing_id}`);
        setRedistributions(result.redistribution)

      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    getData();
  }, []);


  return (
    <>
      <div className="py-2">
        <hr/>
        <h1 className="font-bold uppercase mt-4">
          Redistribuir operaciones
        </h1>
        <table className="min-w-full border-collapse border border-gray-200 table-hover-columns">
          <thead className="dark:bg-zinc-100 bg-zinc-500">
          <tr>
            <th className="px-4 py-2 border border-gray-300 text-left dark:text-zinc-700 text-zinc-100">Operación</th>
            <th className="px-4 py-2 border border-gray-300 text-left dark:text-zinc-700 text-zinc-100">Sam</th>
          </tr>
          </thead>
          <tbody>
          {
            redistributions.map((operation, i)=> {
              return(
                <tr className="border border-zinc-50" key={i}>
                  <td>{operation.operation}</td>
                  <td>{operation.sam}</td>
                </tr>
              )
            })
          }

          </tbody>
        </table>
      </div>


    </>


  )
}
export default TableRedistribution
