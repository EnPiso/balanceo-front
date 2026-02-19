import React, {useEffect,useState} from 'react'
import { useRecoilState } from 'recoil';
import { machinesList } from '../../infraestructure/states/states_machine';
import { fetchGetData } from '../../infraestructure/call_api/crud';
import { urlMain } from '../../infraestructure/data/const';
import CustomPaginator from '../../ui/CustomPaginator';
import PerPageSelector from '../../ui/PerPageSelector';
import SearchMachinesMaster from './SearchMachinesMaster';
import NewButtonMachine from './NewButtonMachine';
import EditMachineForm from './EditMachineForm';
import { CircularProgress } from '@nextui-org/react';

const ListMachinesMaster = () => {

  const [isLoading, setIsLoading] = useState(true)

  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [totalPages, setTotalPages] = useState(1); // Total de páginas
  const [perPage, setPerPage] = useState(10); // Total de páginas

  const [searchData, setSearchData] = useState("");
  const [queryString, setQueryString] = useState("");

  const [machines,setMachines] = useRecoilState(machinesList)

  useEffect(()=> {
    const getData = async () => {
      setIsLoading(true)
      try {
        const result = await fetchGetData(`${urlMain}machines?page=${currentPage}&per_page=${perPage}&q[machine_cont]=${encodeURIComponent(queryString)}`);
        setTotalPages(result.total_pages)
        setCurrentPage(result.current_page)
        setMachines(result.machines);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setIsLoading(false)
      }
    };
    
    getData();
  },[currentPage,perPage,queryString])

  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="space-y-8">
        <div className="flex justify-between items-center bg-zinc-50 dark:bg-zinc-800 px-1 rounded-md shadow-sm py-1 mb-2">
          <div>
            <NewButtonMachine/>
          </div>
          <div>
            <SearchMachinesMaster
              tooltip={"Buscar máquinas (ENTER)"}
              searchData={searchData}
              setSearchData={setSearchData}
              setQueryString={setQueryString}
            />
          </div>
        </div>
        
        
        
        <div className="overflow-x-auto">
        <table className="w-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-100 rounded-lg">
          <thead>
            <tr className="bg-transparent text-zinc-800 dark:text-zinc-400 border-b border-zinc-300 dark:border-zinc-600">
              <th className="p-2 text-left font-medium uppercase">Máquina</th>
            </tr>
          </thead>
          <tbody className='hidden md:table-row-group'>
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
                machines.map((machine, i) => (
                  <tr key={i} className="hover:bg-zinc-50 dark:hover:bg-zinc-600 transition-colors capitalize">
                    <EditMachineForm machine={machine} />
                  </tr>
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
      
    </div>
  )
}

export default ListMachinesMaster