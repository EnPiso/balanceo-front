import { Input } from "@nextui-org/react";
import React, { useEffect, useState, useRef } from "react";
import {FaDeleteLeft} from "react-icons/fa6";

const InputFormCategory = ({ isEdit, setIsEdit, label, valueDefault, obj, handleFetchApi}) => {
    const [query, setQuery] = useState(""); // Entrada del usuario
    const [debouncedQuery, setDebouncedQuery] = useState(""); // Entrada con retraso
    const [isFirstSearch, setIsFirstSearch] = useState(true); // Controla la primera ejecución
    const inputRef = useRef(null); // Referencia al input


    useEffect(() => {
        // Llevar el foco al input cuando el componente se monta
        if (inputRef.current) {
            inputRef.current.focus();
        }
        setQuery(valueDefault)
    }, []);


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

    }, [debouncedQuery]);

    const handleClear = () => {
        setQuery(""); // Limpia la entrada del usuario
        setDebouncedQuery(""); // Limpia la entrada retrasada
        //fetchResults(""); // Llama a la API para cargar toda la lista original

    };


    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleFetchApi(query, obj);
            // Aquí puedes agregar la lógica para manejar Enter
        }
        if (e.key === "Escape") {
            console.log("Escape pressed");
            handleClear(); // Limpia el campo de entrada al presionar Escape
            setIsEdit(false)
        }
    };


    return (
        <div className="py-3 flex items-center space-x-2">
            <Input
                ref={inputRef} // Asigna la referencia al input
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value)
                }} // Actualiza la entrada del usuario
                onKeyDown={handleKeyDown} // Detección de teclas
                label={label}
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

export default InputFormCategory;
