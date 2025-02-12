import React, { useEffect, useState } from 'react'
import { urlMain } from '../../infraestructure/data/const';
import { fetchGetData } from '../../infraestructure/call_api/crud';
import { AiFillExperiment } from 'react-icons/ai';
import TrOperationMaster from './TrOperationMaster';


const ListOperationsMaster = () => {

  const [masterOperations, setMasterOperations] = useState([])

  useEffect(()=> {
    const getData = async () => {
            try {
              const result = await fetchGetData(`${urlMain}/operations_master`);
              //console.log(result)
              
              setMasterOperations(result)
              
            } catch (error) {
              console.error('Error al obtener los datos:', error);
            }
          };
    
          getData();
  },[])

  return (
    <div>
      <div className="space-y-8">
        <div className="overflow-x-auto">
        <table className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-lg shadow-md border border-gray-300">
          <thead>
            <tr className="dark:bg-gray-100 bg-zinc-800 text-zinc-100 dark:text-zinc-800">
                <th className="p-1 text-left font-medium border border-gray-300">Operaciones</th>
                <th className="p-1 text-left font-medium border border-gray-300">Máquina</th>
                <th className="p-1 text-left font-medium border border-gray-300">Sam</th>
                <th className="p-1 text-left font-medium border border-gray-300"></th>
            </tr>
          </thead>
            <tbody>
            {
                masterOperations.map((operation) => {
                    return (
                      <>
                        <TrOperationMaster
                          operation={operation}
                        />
                         
                      </>
                    )
                })
            }
            </tbody>
          </table>    
        </div>
      </div>
           
    </div>
  )
}

export default ListOperationsMaster