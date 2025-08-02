import React, {useEffect,useState} from 'react'
import { fetchGetData } from '../../infraestructure/call_api/crud';
import { urlMain } from '../../infraestructure/data/const';
import { useRecoilState } from 'recoil';
import { masterOpersList } from '../../infraestructure/states/opers_states';
import { MyOperationsPoly, OpersPolyvalences, percentZonesOpers, setOperPolyvalence } from '../../infraestructure/states/states_polyvalence';
import SearchOpersMaster from '../opers_master/SearchOpersMaster';
import CustomPaginator from '../../ui/CustomPaginator';
import { CircularProgress } from '@nextui-org/react';
import TrObjPolyvalence from './TrObjPolyvalence';
import CardPolyvalence from './CardPolyvalence';
import toast from 'react-hot-toast';
import { useIsLargeScreen } from './useIsLargeScreen';
import NewButtonOperMaster from '../opers_master/new_oper/NewButtonOperMaster';

const totalPaginate = [5, 10, 20, 50];

const ListUserPolyvalences = ({opers, setOpers}) => {


  const [opersList, setOpersList] = useRecoilState(OpersPolyvalences)
  

  const [isLoading, setIsLoading] = useState(false)

  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [totalPages, setTotalPages] = useState(1); // Total de páginas
  const [perPage, setPerPage] = useState(10); // Total de páginas

  const [searchData, setSearchData] = useState("");
  const [queryString, setQueryString] = useState("");
  
  const [operPoly, setOperPoly] = useRecoilState(setOperPolyvalence)
  const [allMachines, setAllMachines] = useState([])
  const [ machineSelect,setMachineSelect ] = useState('')
  
  const [ operationsPoly, setOperationsPoly ] = useRecoilState(MyOperationsPoly)
  
  const [isLoadingObj, setIsLoadingObj] = useState(false)
  
  const [isShowCard, setIsShowCard] = useState(0)

  const [ percentZones, setPercentZones ] = useRecoilState(percentZonesOpers)
  


  const isLargeScreen = useIsLargeScreen();

  useEffect(()=> {
    if(isLargeScreen){
      setIsShowCard(0)
    }
  },[isLargeScreen])


  useEffect(()=> {
    setIsLoading(true)
    const getData = async () => {
        try {
          const result = await fetchGetData(`${urlMain}polyvalences_times?page=${currentPage}&per_page=${perPage}&q[name_or_id_oper_cont]=${encodeURIComponent(queryString)}`);
          
          setOpersList(result.opers)
          result.total_pages && setTotalPages(result.total_pages)
          result.current_page && setCurrentPage(result.current_page)
          
        } catch (error) {
          console.error('Error al obtener los datos:', error);
        } finally {
          setIsLoading(false)
        }
      };

    getData();
  },[currentPage,queryString,perPage])

  const handlePageChange = (page) => {
    setCurrentPage(page);
  
  };

  const handleMachine = (oper, setIsLoadingPol) => {
    const oper_id = oper.id
    setIsLoadingPol(true)
    setOperationsPoly([])
    setMachineSelect('')
    const getData = async () => {
      try {
        const result = await fetchGetData(`${urlMain}polyvalences_times/update_unique_machines?oper_id=${oper_id}`);
        // console.log(result);
        
        setOperPoly(oper)
        setAllMachines(result.samplings)
        
        if(result.percent_zones_opers === 0){
          setPercentZones(0)
        }else{
          setPercentZones(result.percent_zones_opers)
        }
        
        if(result.samplings?.length < 1){
          toast.error(`${oper.name}, no tiene tomas de tiempos`)
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setIsLoadingPol(false)
      }
    };

    getData();
  }

  

  return (
    <div>
      <div className="space-y-8">
        <div className="flex justify-between items-center  bg-zinc-50 px-1 rounded-md shadow-sm py-1 mb-2">
          <div>
            <NewButtonOperMaster
              opers={opers}
              setOpers={setOpers}
            />
          </div>
          <div>
            {
              isShowCard === 0 && 
                <SearchOpersMaster
                  searchData={searchData}
                  setSearchData={setSearchData}
                  setQueryString={setQueryString}
                />
            } 
          </div>
        </div>
        
        
        
        <div className="overflow-x-auto">
        <table className=" w-full bg-zinc-100 dark:bg-zinc-800 rounded-lg shadow-md border border-gray-300">
          <thead>
            <tr className="dark:bg-gray-100 bg-zinc-800 text-zinc-100 dark:text-zinc-800">
                <th className="hidden md:table-cell p-1 text-left font-medium border border-gray-300">Nombre</th>
                <th className="hidden md:table-cell p-1 text-left font-medium border border-gray-300">Cédula</th>
                {
                  isShowCard === 0 && 
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
                }
                

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
                  opersList.map((oper, i)=> {
                    return(
                      <TrObjPolyvalence
                        isShowCard={isShowCard}
                        setIsShowCard={setIsShowCard}
                        isLoading={isLoadingObj}
                        setIsLoading={setIsLoadingObj}
                        oper={oper} 
                        setOperPoly={setOperPoly}
                        setAllMachines={setAllMachines}
                        operPoly={operPoly}
                        allMachines={allMachines}
                        machineSelect={machineSelect}
                        setMachineSelect={setMachineSelect}
                        key={i}/>
                    )
                  })
                }
                </>
              )
            }
          </tbody>
        </table> 

        {/* Cards para mobile */}
        <div className="block md:hidden">
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <CircularProgress size="lg" color="default" />
            </div>
          ) : (
            <>

              {isShowCard
                ? (
                  opersList
                    .filter(oper => oper.id === isShowCard)
                    .map((oper, i) => (
                      <CardPolyvalence
                        oper={oper}
                        setOperPoly={setOperPoly}
                        setAllMachines={setAllMachines}
                        operPoly={operPoly}
                        allMachines={allMachines}
                        isLoading={isLoading}
                        machineSelect={machineSelect}
                        setMachineSelect={setMachineSelect}
                        operationsPoly={operationsPoly}
                        key={i}
                        handleMachine={handleMachine}
                        setIsShowCard={setIsShowCard}
                        isShowCard={isShowCard}
                      />
                    ))
                )
                : (
                  opersList.map((oper, i) => (
                    <CardPolyvalence
                      oper={oper}
                      setOperPoly={setOperPoly}
                      setAllMachines={setAllMachines}
                      operPoly={operPoly}
                      allMachines={allMachines}
                      isLoading={isLoading}
                      machineSelect={machineSelect}
                      setMachineSelect={setMachineSelect}
                      operationsPoly={operationsPoly}
                      key={i}
                      handleMachine={handleMachine}
                      setIsShowCard={setIsShowCard}
                      isShowCard={isShowCard}
                    />
                  ))
                )
              }
            
            </>
          )}
        </div> 

        </div>
        
          
      </div>
      <div style={{ display: !isShowCard ? 'block' : 'none' }} className="flex justify-start py-4">
        <CustomPaginator
          total={totalPages}
          initialPage={currentPage}
          onChange={handlePageChange}
        />
      </div>  
    </div>
  )
}

export default ListUserPolyvalences