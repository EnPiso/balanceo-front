import React,{useState,useEffect} from 'react'
import {Input} from "@nextui-org/react";
import {FaClosedCaptioning, FaMagnifyingGlass} from "react-icons/fa6";
import {fetchGetData} from "../../../../infraestructure/call_api/crud.js";
import {urlMain} from "../../../../infraestructure/data/const.js";
import {useRecoilState} from "recoil";
import {searchOperations} from "../../../../infraestructure/states/operation_states.js";
import {FaLess, FaPlus, FaWindowClose} from "react-icons/fa";
import {AiOutlineMinus} from "react-icons/ai";
import {dataObjClone} from "../../../../infraestructure/states/states_navigation.js";

const SearchCustom = ({setShowFormNew,showFormNew}) => {
  const [cloneOperations, setCloneOperations] = useRecoilState(searchOperations);
  const [dataObj, setDataObjClone] = useRecoilState(dataObjClone);



  const [query, setQuery] = useState(""); // Estado para el valor del input
  const [debouncedQuery, setDebouncedQuery] = useState(""); // Estado para la búsqueda retrasada

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
        // console.log(result);
        setCloneOperations(result);
        setShowFormNew(false)
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    getData();

  }

  const handlePlus = () => {
    setShowFormNew(!showFormNew)
    if(!showFormNew === false){
      setDataObjClone(null)
    }
    console.log(!showFormNew)
  }

  return (
    <div className="ml-4 flex justify-between items-center">
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
            <FaMagnifyingGlass/>
          </button>
        }
        className="max-w-xs mr-5"
      />
      <button onClick={handlePlus}>
        {
          showFormNew ? <FaWindowClose/> : <FaPlus/>
        }


      </button>

    </div>
  )
}
export default SearchCustom
