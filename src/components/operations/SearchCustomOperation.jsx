import React,{useState,useEffect} from 'react'
import {CircularProgress, Input} from "@nextui-org/react";
import {FaClosedCaptioning, FaMagnifyingGlass} from "react-icons/fa6";
import {useRecoilState} from "recoil";
import {FaLess, FaPlus, FaWindowClose} from "react-icons/fa";
import {AiOutlineMinus} from "react-icons/ai";
import { dataObjClone } from '../../infraestructure/states/states_navigation';
import { cloneObjData, listOperationsClone, searchOperations } from '../../infraestructure/states/operation_states';
import { fetchGetData } from '../../infraestructure/call_api/crud';
import { urlMain } from '../../infraestructure/data/const';
import { selectAllMachines } from '../../infraestructure/states/states_machine';

const SearchCustomOperation = ({setShowFormNew,showFormNew,query,setQuery}) => {
  const [cloneOperations, setCloneOperations] = useRecoilState(listOperationsClone);
  const [dataObj, setDataObjClone] = useRecoilState(cloneObjData);
  const [debouncedQuery, setDebouncedQuery] = useState(""); // Estado para la búsqueda retrasada
  const [allMachines, setAllMachines] = useRecoilState(selectAllMachines);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Configurar un temporizador para retrasar la búsqueda
    const timer = setTimeout(() => {
      setDebouncedQuery(query); // Actualiza el estado solo después de un retraso
    }, 500); // Tiempo de retraso en milisegundos (500ms en este caso)

    return () => clearTimeout(timer); // Limpiar el temporizador al desmontar o cambiar
  }, [query]);

  useEffect(() => {
    if (debouncedQuery) {
      // Realizar la búsqueda en la API solo cuando el `debouncedQuery` cambie
      fetchResults(debouncedQuery);
    }
  }, [debouncedQuery]);


  const fetchResults = (debouncedQuery) => {
    const getData = async () => {
    
      try {
        const result = await fetchGetData(`${urlMain}operations?q[operation_cont]=${encodeURIComponent(debouncedQuery)}`);
        
        setCloneOperations(result);
        setShowFormNew(false)
        
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } 
    };

    getData();

  }

  const handlePlus = () => {
    
    if(!showFormNew === false){
      setDataObjClone(null)
      setShowFormNew(false)
    }else{
      handleMachine()
    }
  }


  const handleMachine = () => {
    const getData = async () => {
      setIsLoading(true)  
      try {
        const result = await fetchGetData(`${urlMain}machines/all_machines`);
      
        setAllMachines(result)
        
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setIsLoading(false)
        setShowFormNew(true)
      }
    };
    
    getData();
  }

  return (
    <div className=" flex justify-between items-center py-2">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        variant="bordered"
        placeholder="Buscar operación"
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            aria-label="toggle password visibility">
            <FaMagnifyingGlass className='text-secondary_two'/>
          </button>
        }
        className="max-w-xs mr-5"
      />

      {
        isLoading ? 
          <CircularProgress
            size={24}
            color={"default"}  
          /> : 
          <button onClick={handlePlus}>
            {
              showFormNew ? <FaWindowClose size={30}/> : <FaPlus className='text-secondary_two' size={30}/>
            }


          </button>
      }
      
    </div>
  )
}
export default SearchCustomOperation
