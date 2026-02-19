import React, { useEffect, useState } from 'react'
import { urlMain } from '../../infraestructure/data/const';
import { fetchGetData } from '../../infraestructure/call_api/crud';
import { AiFillExperiment } from 'react-icons/ai';
import TrOperationMaster from './TrOperationMaster';
import { CircularProgress, Spinner, Tooltip } from '@nextui-org/react';
import CustomPaginator from '../../ui/CustomPaginator';
import PerPageSelector from '../../ui/PerPageSelector';
import SearchManualProducts from '../orders/manual/SearchManualProducts';
import { FaPlus } from 'react-icons/fa';
import NewBtnOperationMaster from './NewBtnOperationMaster';
import { operationsArrayMaster } from '../../infraestructure/states/operation_master_state';
import { useRecoilState } from 'recoil';

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

  return (
    <div>
      <div className="flex justify-between items-center bg-zinc-50 dark:bg-zinc-800 px-1 rounded-md shadow-sm py-1 mb-2">
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
      <div className="overflow-x-auto">
        <table className="w-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-100 rounded-lg">
          <thead>
            <tr className="bg-transparent text-zinc-800 dark:text-zinc-400 border-b border-zinc-300 dark:border-zinc-600">
              <th className="p-2 text-left font-medium uppercase">Operaciones</th>
              <th className="p-2 text-left font-medium uppercase">Máquina</th>
              <th className="p-2 text-left font-medium uppercase">Sam</th>
              <th className="p-2"></th>
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
      <div className="flex justify-end items-center gap-3 px-2 py-4">
        <CustomPaginator
          total={totalPages}
          initialPage={currentPage}
          onChange={handlePageChange}
        />
        <PerPageSelector perPage={perPage} onChange={(p) => { setPerPage(p); setCurrentPage(1); }} />
      </div>
    </div>
  )
}

export default ListOperationsMaster