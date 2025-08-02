import React, {useEffect,useState} from 'react'
import { useRecoilState } from 'recoil';
import { machinesList } from '../../infraestructure/states/states_machine';
import { fetchGetData } from '../../infraestructure/call_api/crud';
import { urlMain } from '../../infraestructure/data/const';
import CustomPaginator from '../../ui/CustomPaginator';
import SearchOpersMaster from '../opers_master/SearchOpersMaster';
import SearchMachinesMaster from './SearchMachinesMaster';
import NewButtonOperMaster from '../opers_master/new_oper/NewButtonOperMaster';
import NewButtonMachine from './NewButtonMachine';
import EditMachineForm from './EditMachineForm';
import { CircularProgress } from '@nextui-org/react';


const totalPaginate = [5, 10, 20, 50];

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
        <div className="flex justify-between items-center  bg-zinc-50 px-1 rounded-md shadow-sm py-1 mb-2">
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
        <table className=" w-full bg-zinc-100 dark:bg-zinc-800 rounded-lg shadow-md border border-gray-300">
          <thead>
            <tr className="dark:bg-gray-100 bg-zinc-800 text-zinc-100 dark:text-zinc-800">
            <th className="hidden md:table-cell p-1 text-left font-medium border border-gray-300">
              <span className="flex justify-between items-center">
                <span>
                  Máquina
                </span>
                <span className="flex justify-end space-x-4 mr-2"> {/* Alinea los elementos horizontalmente y agrega espacio */}
                  {totalPaginate.map((page, i) => (
                    <span
                      onClick={() => setPerPage(page)}
                      className={`cursor-pointer ${perPage === page && 'text-secondary_two'}`}
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
                <>
                  {
                    machines.map((machine,i)=> {
                      return(
                        <>
                          <tr 
                            key={i} 
                            className="hover:text-secondary_two group capitalize">
                          
                              <EditMachineForm
                                machine={machine}
                              />  
                      
                            
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


        </div>
        
          <div className="flex justify-start py-4">
            <CustomPaginator
              total={totalPages}
              initialPage={currentPage}
              onChange={handlePageChange}
            />
          </div> 
      </div>
      
    </div>
  )
}

export default ListMachinesMaster