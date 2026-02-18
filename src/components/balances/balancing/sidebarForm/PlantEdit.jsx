import React, { useState } from "react";
import FormEditInput from "./FormEditInput.jsx";
import { FaEdit } from "react-icons/fa";
import {updateData} from "../../../../infraestructure/call_api/crud.js";
import {urlMain} from "../../../../infraestructure/data/const.js";
import {useRecoilState} from "recoil";
import {productionPlants, selectProdPlant} from "../../../../infraestructure/states/opers_states.js";
import toast from "react-hot-toast";
import {toastMessageCustom} from "../../../../infraestructure/data/toastMessage.js";

const PlanEdit = ({ plant }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [objEdit, setObjEdit] = useState(null);

    const [plantName, setPlantName] = useState( ""); // Inicializa con el nombre de la planta
    const [listPlants, setListPlants] = useRecoilState(productionPlants)

    const [prodPlant, setProdPlant] = useRecoilState(selectProdPlant)


    const handleKeyDown = (event) => {
        event.stopPropagation()
        if (event.key === "Enter") {
            const data = {
                name: plantName
            }

            fetchUpdate(data,objEdit.id);
            setIsEdit(false); // Sale del modo edición
        } else if (event.key === "Escape") {
            setPlantName(plant.name); // Restablece el valor original
            setIsEdit(false); // Sale del modo edición
        }
    };

    const fetchUpdate = (data, id) => {

        const production_plant = {
            production_plant: data
        }
        const updatePlant = async (data) => {
            try {
                const result = await updateData(urlMain + `production_plants/${id}/update_plant/`, production_plant)
            
                const updatedItems = listPlants.map((item) =>
                    item.id === result.id ? result : item
                );

                setProdPlant({ ...prodPlant, plant: result })

                // setProdPlant()
                setListPlants(updatedItems)
                setPlantName('')
                toast.success(toastMessageCustom.updatePlant)
            } catch (error) {
                console.error('Error setting data', error);
            }
        };

        updatePlant(data);

    }

    return (
        <>
            {isEdit ? (
                <FormEditInput
                    onKeyDown={handleKeyDown}
                    value={plantName} // Estado controlado
                    setState={setPlantName} // Actualiza el estado
                />
            ) : (
                <div
                    onClick={() => {
                        if(prodPlant && prodPlant.plant.id === plant.id) {
                            setIsEdit(true)
                            setObjEdit(plant)
                        }

                    }}
                    className="flex justify-between items-center cursor-pointer"
                >
                    <h1
                        className={`text-lg font-semibold ${
                            prodPlant && prodPlant.plant.id === plant.id
                                ? "text-zinc-900"
                                : "text-gray-600"
                        }`}
                    >
                        {plant.name}
                    </h1>
                    {
                        prodPlant && prodPlant.plant.id === plant.id && <FaEdit />
                    }

                </div>
            )}
        </>
    );
};

export default PlanEdit;
