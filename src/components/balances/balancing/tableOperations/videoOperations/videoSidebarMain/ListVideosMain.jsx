import React, { useEffect, useState } from 'react'
import { fetchGetData } from '../../../../../../infraestructure/call_api/crud';
import { urlMain } from '../../../../../../infraestructure/data/const';
import { FaPlay } from 'react-icons/fa';
import VideoObjMain from './VideoObjMain';
import { CircularProgress } from '@nextui-org/react';
import DashboardSearch from './DashboardSearch';
import CustomPaginator from '../../../../../../ui/CustomPaginator';

const totalPaginate = [10, 20, 30, 40, 50];

const ListVideosMain = () => {

  const [operationsVideos,setOperationsVideos] = useState([])
  const [operationTemp, setOperationTemp] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isFavorite, setIsFavorite] = useState(true);
  
  const [searchData, setSearchData] = useState("");
  const [queryString, setQueryString] = useState("");

  const [dataSearchList,setDataSearchList] = useState(null)
  
 

  const [totalPages, setTotalPages] = useState(1); // Total de páginas
  const [perPage, setPerPage] = useState(10); // Total de páginas
  const [currentPage, setCurrentPage] = useState(1);
  

  useEffect(() => {
    const getData = async () => {
      const queryParamsObject = {
        ...(dataSearchList && dataSearchList.operation && { 'q[operation_cont]' : dataSearchList.operation }),
        ...(dataSearchList && dataSearchList.favorite
          ? { 'q[favorite_eq]': true }
          : { 'q[favorite_eq]': false }),
        page: currentPage,      // <-- Agrega el número de página
        per_page: perPage       // <-- Agrega la cantidad por página
      };

      const queryParams = new URLSearchParams(queryParamsObject);

      setIsLoading(true);
      try {
        const result = await fetchGetData(`${urlMain}videos/index_videos?${queryParams.toString()}`);
       
        setOperationsVideos(result.operations)
        setTotalPages(result.total_pages)
        setCurrentPage(result.current_page)
        setIsLoading(false)
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    getData();
  }, [dataSearchList, currentPage, perPage]) // <-- Agrega las dependencias


  const handlePerPageChange = (page) => { 

    setPerPage(page);
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);

  };

  return (
  
    <div className="space-y-8">
      <div className="overflow-x-auto">

      <DashboardSearch
        isFavorite={isFavorite}
        setIsFavorite={setIsFavorite}
        searchData={searchData}
        setSearchData={setSearchData}
        queryString={queryString}
        setQueryString={setQueryString}
        dataSearchList={dataSearchList}
        setDataSearchList={setDataSearchList}
      />

    {
      isLoading ? 
        <span className="flex justify-center items-center h-30">
          <CircularProgress size="lg" color="success" />
        </span> :
        <table className="min-w-full border-collapse">
          <thead className="text-zinc-800 sticky top-0 z-10">
          <tr>
            <th 
              className="px-4 py-2 text-left dark:text-zinc-700 flex justify-between items-center uppercase">
              Operación
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
            </th>
              
          </tr>
          
          </thead>
          <tbody>
          
            {operationsVideos.map((operation, i) => {
    
              return (
                <VideoObjMain 
                  isFavorite={isFavorite}
                  operationTemp={operationTemp}
                  setOperationTemp={setOperationTemp}
                  operation={operation} 
                  key={i}/>
              );
            })}
          
          </tbody>
        </table>
    }

      <div className="flex justify-start py-4">
        <CustomPaginator
          total={totalPages}
          initialPage={currentPage}
          onChange={handlePageChange}
          // key={JSON.stringify(orders)}
        />
      </div>
       
      </div>
    </div>
  )
}

export default ListVideosMain