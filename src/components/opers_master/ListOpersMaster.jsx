import React, { useEffect, useState } from 'react'
import { urlMain } from '../../infraestructure/data/const';
import { fetchGetData } from '../../infraestructure/call_api/crud';

import { CircularProgress, Spinner } from '@nextui-org/react';
import CustomPaginator from '../../ui/CustomPaginator';
import TrOperMaster from './TrOperMaster';
import { masterOpersList } from '../../infraestructure/states/opers_states';
import { useRecoilState } from 'recoil';
import SearchOpersMaster from './SearchOpersMaster';
import { TabLoadingBlock } from '../../infraestructure/states/states_questionnaires';


const totalPaginate = [5, 10, 20, 50];



const ListOpersMaster = () => {

  const [masterOpers, setMasterOpers] = useRecoilState(masterOpersList)
  const [tabLoading, setTabLoading] = useRecoilState(TabLoadingBlock)
  

  const [isLoading, setIsLoading] = useState(false)

  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [totalPages, setTotalPages] = useState(1); // Total de páginas
  const [perPage, setPerPage] = useState(10); // Total de páginas

  const [searchData, setSearchData] = useState("");
  const [queryString, setQueryString] = useState("");

  useEffect(()=> {
    setIsLoading(true)
    const getData = async () => {
        setTabLoading(true)
        try {
          const result = await fetchGetData(`${urlMain}opers/index_all?page=${currentPage}&per_page=${perPage}&q[name_or_id_oper_cont]=${encodeURIComponent(queryString)}`);
          //console.log(result)
      
          setMasterOpers(result.opers)
          result.total_pages && setTotalPages(result.total_pages)
          result.current_page && setCurrentPage(result.current_page)
          
        } catch (error) {
          console.error('Error al obtener los datos:', error);
        } finally {
          setIsLoading(false)
          setTabLoading(false)
        }
      };

    getData();
  },[currentPage,queryString,perPage])

  const handlePageChange = (page) => {
    setCurrentPage(page);
  
  };

  

  return (
    <div>
      <div className="space-y-8">
        <SearchOpersMaster
          searchData={searchData}
          setSearchData={setSearchData}
          setQueryString={setQueryString}
        />
        <div className="overflow-x-auto">
        <table className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-lg shadow-md border border-gray-300">
          <thead>
            <tr className="dark:bg-gray-100 bg-zinc-800 text-zinc-100 dark:text-zinc-800">
                <th className="p-1 text-left font-medium border border-gray-300">Nombre</th>
                <th className="p-1 text-left font-medium border border-gray-300">Cédula</th>
                <th className="p-1 text-left font-medium border border-gray-300">
                  <div className="flex justify-end space-x-4 mr-2"> {/* Alinea los elementos horizontalmente y agrega espacio */}
                    {totalPaginate.map((page, i) => (
                      <span
                        onClick={() => setPerPage(page)}
                        className={`cursor-pointer ${perPage === page && 'text-secondary_two'}`}
                        key={i}
                      >
                        {page}
                      </span>
                    ))}
                  </div>
                </th>

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