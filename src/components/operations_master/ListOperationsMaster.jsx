import React, { useEffect, useState } from 'react'
import { urlMain } from '../../infraestructure/data/const';
import { fetchGetData } from '../../infraestructure/call_api/crud';
import { AiFillExperiment } from 'react-icons/ai';
import TrOperationMaster from './TrOperationMaster';
import { CircularProgress, Spinner, Tooltip } from '@nextui-org/react';
import CustomPaginator from '../../ui/CustomPaginator';
import SearchManualProducts from '../orders/manual/SearchManualProducts';
import { FaPlus } from 'react-icons/fa';
import NewBtnOperationMaster from './NewBtnOperationMaster';
import { operationsArrayMaster } from '../../infraestructure/states/operation_master_state';
import { useRecoilState } from 'recoil';

const totalPaginate = [10, 20, 30, 40, 50];

const ListOperationsMaster = () => {

  const [masterOperations, setMasterOperations] = useRecoilState(operationsArrayMaster)

  const [isLoading, setIsLoading] = useState(false)


  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [totalPages, setTotalPages] = useState(1); // Total de páginas
  const [perPage, setPerPage] = useState(10); // Total de páginas

  const [searchData, setSearchData] = useState("");
  const [queryString, setQueryString] = useState("");

  

  useEffect(()=> {
    const queryParamsObject =  { 'q[operation_cont]' : queryString }
    
    const queryParams = new URLSearchParams(queryParamsObject);

    setIsLoading(true)
    const getData = async () => {
        try {
          const result = await fetchGetData(`${urlMain}operations_master?page=${currentPage}&per_page=${perPage}&${queryParams.toString()}`);
          
          setMasterOperations(result.orders)
          result.total_pages && setTotalPages(result.total_pages)
          result.current_page && setCurrentPage(result.current_page)
          
        } catch (error) {
          console.error('Error al obtener los datos:', error);
        } finally {
          setIsLoading(false)
        }
      };

    getData();
  },[currentPage, perPage, queryString])

  const handlePageChange = (page) => {
    setCurrentPage(page);
  
  };

  const handlePerPageChange = (page) => { 
    setPerPage(page);
  }

  return (
    <div>
      <div className="flex justify-between items-center bg-zinc-50 px-1 rounded-md shadow-sm py-1 mb-2">
        <div>
          <NewBtnOperationMaster/>
        </div>
        <div>
          <SearchManualProducts
            content="Buscar (ENTER)"
            searchData={searchData}
            setSearchData={setSearchData}
            setQueryString={setQueryString}
            placeholder="Buscar operación (ENTER)"
          />
        </div>
      </div>
      <div className="space-y-8">
        <div className="overflow-x-auto">
        <table className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-lg shadow-md border border-gray-300">
          <thead>
            <tr className="text-zinc-800">
                <th className="p-1 text-left font-medium uppercase">Operaciones</th>
                <th className="p-1 text-left font-medium uppercase">Máquina</th>
                <th className="p-1 text-left font-medium uppercase">Sam</th>
                <th className="p-1  font-medium">
                  <span className="flex justify-end">
                    <span className="flex space-x-2">
                      {totalPaginate.map((page, i) => (
                        <span
                          onClick={() => handlePerPageChange(page)}
                          className={`cursor-pointer  ${perPage === page && 'text-secondary_two'}`}
                          key={i}
                        >
                          {page}
                        </span>
                      ))}
                    </span>
                  </span>
                  
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
                masterOperations.map((operation) => (
                  <TrOperationMaster key={operation.id} operation={operation} />
                ))
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
              // key={JSON.stringify(orders)}
            />
          </div>  
    </div>
  )
}

export default ListOperationsMaster