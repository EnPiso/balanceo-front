import React, { useEffect, useState } from 'react'
import { fetchGetData } from '../../../../../../infraestructure/call_api/crud';
import { urlMain } from '../../../../../../infraestructure/data/const';
import { FaPlay } from 'react-icons/fa';
import VideoObjMain from './VideoObjMain';
import { CircularProgress } from '@nextui-org/react';
import DashboardSearch from './DashboardSearch';
import CustomPaginator from '../../../../../../ui/CustomPaginator';
import PerPageSelector from '../../../../../../ui/PerPageSelector';

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


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
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

      {isLoading ? (
        <span className="flex justify-center items-center h-30">
          <CircularProgress size="lg" color="default" />
        </span>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-100">
            <thead className="sticky top-0 z-10 bg-white dark:bg-zinc-800">
              <tr className="bg-transparent text-zinc-800 dark:text-zinc-400 border-b border-zinc-300 dark:border-zinc-600">
                <th className="px-4 py-2 text-left font-medium uppercase">Operación</th>
              </tr>
            </thead>
            <tbody>
              {operationsVideos.map((operation, i) => (
                <VideoObjMain
                  isFavorite={isFavorite}
                  operationTemp={operationTemp}
                  setOperationTemp={setOperationTemp}
                  operation={operation}
                  key={i}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

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

export default ListVideosMain