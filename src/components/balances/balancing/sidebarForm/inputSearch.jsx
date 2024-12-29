import { Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { fetchGetData } from "../../../../infraestructure/call_api/crud.js";
import { urlMain } from "../../../../infraestructure/data/const.js";
import { useRecoilState } from "recoil";
import {
    checkOpersPosition,
    productionPlants, selectOpers,
    selectProdPlant,
    selectProdPlantOriginal
} from "../../../../infraestructure/states/opers_states.js";
import {FaDeleteLeft} from "react-icons/fa6";

const InputSearch = ({ setSearchModules, setIsModuleSearch }) => {
    const [query, setQuery] = useState(""); // Entrada del usuario
    const [debouncedQuery, setDebouncedQuery] = useState(""); // Entrada con retraso
    const [isFirstSearch, setIsFirstSearch] = useState(true); // Controla la primera ejecución

    const [listPlants, setListPlants] = useRecoilState(productionPlants);
    const [prodPlant, setProdPlant] = useRecoilState(selectProdPlant);
    const [prodPlantOriginal, setProdPlantOriginal] = useRecoilState(selectProdPlantOriginal)

    const [opersSelect, setOpersSelect] = useRecoilState(selectOpers);
    const [selectedOperDetails, setSelectedOperDetails] = useRecoilState(checkOpersPosition); // Array con los detalles de cada selección

// opersSelect.size === 0 && selectedOperDetails.length === 0
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query.trim()); // Actualiza `debouncedQuery` después del retraso
        }, 500);

        return () => clearTimeout(timer); // Limpia el temporizador al desmontar o cambiar
    }, [query]);

    useEffect(() => {
        if (isFirstSearch && debouncedQuery === "") {
            setIsFirstSearch(false); // Marca que la primera búsqueda ya pasó
            return; // No ejecutar la búsqueda inicial
        }

        fetchResults(debouncedQuery);
    }, [debouncedQuery]);

    const handleClear = () => {
        setQuery(""); // Limpia la entrada del usuario
        setDebouncedQuery(""); // Limpia la entrada retrasada
        //fetchResults(""); // Llama a la API para cargar toda la lista original
        setProdPlant(prodPlantOriginal)

    };


    const fetchResults = async (searchTerm) => {
        try {
            const result = await fetchGetData(
                searchTerm
                    ? `${urlMain}production_plants?q[name_cont]=${encodeURIComponent(searchTerm)}`
                    : `${urlMain}production_plants`
            );

            if (result.error) {
                setListPlants(result.plants || []);
                setSearchModules([]);
                setIsModuleSearch(false);
                setProdPlant(prodPlantOriginal);
            } else if (result.modules) {
                setSearchModules(result.modules);
                if (result.modules.length === 1) {
                    const data = {
                        plant: {
                            name: result.modules[0].plant_name,
                            id: result.modules[0].production_plant_id,
                        },
                        module: result.modules[0],
                    };
                    setProdPlant(data);
                }
                setListPlants([]);
                setIsModuleSearch(true);
            } else {
                setListPlants(result.plants || []);
                setSearchModules([]);
                setIsModuleSearch(false);
                setProdPlant(prodPlantOriginal);
            }
        } catch (error) {
            console.error("Error al obtener los datos:", error);
            setIsModuleSearch(false);
        }
    };

    return (
        <div className="py-3 flex items-center space-x-2">
            <Input
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value)
                }} // Actualiza la entrada del usuario
                label="Buscar módulo o planta de trabajo"
                type="text"
                endContent={query && (
                    <button
                        className=" px-4 py-2 rounded text-2xl"
                        onClick={handleClear} // Restablece el estado y carga todos los datos
                    >
                        <FaDeleteLeft color="red"/>
                    </button>
                )}
            />

        </div>
    );
};

export default InputSearch;
