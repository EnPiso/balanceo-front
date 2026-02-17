import { Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

import {FaDeleteLeft} from "react-icons/fa6";

const SelectCategoryProducts = ({ setSearchModules, setIsModuleSearch }) => {
    const [query, setQuery] = useState(""); // Entrada del usuario
    const [debouncedQuery, setDebouncedQuery] = useState(""); // Entrada con retraso
    const [isFirstSearch, setIsFirstSearch] = useState(true); // Controla la primera ejecución



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

         console.log(debouncedQuery);
    }, [debouncedQuery]);

    const handleClear = () => {
        setQuery(""); // Limpia la entrada del usuario
        setDebouncedQuery(""); // Limpia la entrada retrasada
        //fetchResults(""); // Llama a la API para cargar toda la lista original
        // setProdPlant(prodPlantOriginal)

    };



    return (
        <div className="py-3 flex items-center space-x-2">
            <Input
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value)
                }} // Actualiza la entrada del usuario
                label="Buscar Categoría"
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

export default SelectCategoryProducts;
