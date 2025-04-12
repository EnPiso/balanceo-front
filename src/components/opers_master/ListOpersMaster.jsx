import React, { useEffect, useState } from 'react'
import { urlMain } from '../../infraestructure/data/const';
import { fetchGetData } from '../../infraestructure/call_api/crud';

import { CircularProgress, Spinner } from '@nextui-org/react';
import CustomPaginator from '../../ui/CustomPaginator';
import TrOperMaster from './TrOperMaster';
import { masterOpersList } from '../../infraestructure/states/opers_states';
import { useRecoilState } from 'recoil';


const ListOpersMaster = () => {

  const [masterOpers, setMasterOpers] = useRecoilState(masterOpersList)

  const [isLoading, setIsLoading] = useState(false)


    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const [totalPages, setTotalPages] = useState(1); // Total de páginas
    const [perPage, setPerPage] = useState(10); // Total de páginas

  useEffect(()=> {
    setIsLoading(true)
    const getData = async () => {
        try {
          const result = await fetchGetData(`${urlMain}opers/index_all?page=${currentPage}&per_page=${perPage}`);
          //console.log(result)
      
          setMasterOpers(result.opers)
          result.total_pages && setTotalPages(result.total_pages)
          result.current_page && setCurrentPage(result.current_page)
          
        } catch (error) {
          console.error('Error al obtener los datos:', error);
        } finally {
          setIsLoading(false)
        }
      };

    getData();
  },[currentPage])

  const handlePageChange = (page) => {
    setCurrentPage(page);
  
  };

  

  return (
    <div>
      <div className="space-y-8">
        <div className="overflow-x-auto">
        <table className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-lg shadow-md border border-gray-300">
          <thead>
            <tr className="dark:bg-gray-100 bg-zinc-800 text-zinc-100 dark:text-zinc-800">
                <th className="p-1 text-left font-medium border border-gray-300">Nombre</th>
                <th className="p-1 text-left font-medium border border-gray-300">Cédula</th>
                <th className="p-1 text-left font-medium border border-gray-300"></th>

            </tr>
          </thead>
          <tbody>
            {
              isLoading ? (
                <tr>
                  <td colSpan="4" className="h-40 text-center">
                    <div className="flex justify-center items-center h-full">
                      <CircularProgress size="lg" color="default" />
                    </div>
                  </td>
                </tr>
              ) : (
                <>
                {
                  masterOpers.map((oper, i)=> {
                    return(
                      <TrOperMaster oper={oper} key={i} />
                    )
                  })
                }
                 
                </>
              )
            }
          </tbody>
        </table>  

        </div>
        
          
      </div>
      <div className="flex justify-start py-4">
        <CustomPaginator
          total={totalPages}
          initialPage={currentPage}
          onChange={handlePageChange}
        />
      </div>  
    </div>
  )
}

export default ListOpersMaster