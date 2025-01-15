import React, {useEffect, useState} from "react";
import { FaEdit } from "react-icons/fa";

import {useRecoilState} from "recoil";
import toast from "react-hot-toast";
import {updateData} from "../../infraestructure/call_api/crud.js";
import {urlMain} from "../../infraestructure/data/const.js";
import {toastMessageCustom} from "../../infraestructure/data/toastMessage.js";
import FormEditInput from "../balances/balancing/sidebarForm/FormEditInput.jsx";
import {Spinner} from "@nextui-org/react";


const PlanEditCustom = ({ plant, listPlants, setListPlants,setProdPlant }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [objEdit, setObjEdit] = useState(null);

  const [plantName, setPlantName] = useState( ""); // Inicializa con el nombre de la planta

  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {
    setPlantName(plant.name)
  }, []);



  const handleKeyDown = (event) => {
    if (event.key === "Enter") {

      console.log(objEdit.id); // Aquí puedes manejar la lógica para guardar
      setIsLoading(true)
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
    console.log(data)

    const production_plant = {
      production_plant: data
    }
    const updatePlant = async (data) => {
      try {
        const result = await updateData(urlMain + `production_plants/${id}/update_plant/`, production_plant)
        // console.log(result)
        // console.log(result)
        const updatedItems = listPlants.map((item) =>
          item.id === result.id ? result : item
        );


        // setProdPlant()
        setListPlants(updatedItems)
        setPlantName('')
        setProdPlant(null)
        toast.success(toastMessageCustom.updatePlant)

      } catch (error) {
        console.error('Error setting data', error);
      } finally {
        setIsLoading(false)
      }
    };

    updatePlant(data);

  }

  const handleClick = (plant) => {
    setObjEdit(plant)
    setIsEdit(true)
  }

  return (
    <>

      {
        isLoading ? (
          <div className={"flex justify-start"}>
            <Spinner size={"lg"} color={"default"}/>
          </div>
        ) : (
          <>
            {isEdit ? (
              <FormEditInput
                onKeyDown={handleKeyDown}
                value={plantName} // Estado controlado
                setState={setPlantName} // Actualiza el estado
              />
            ) : (
              <div
                onClick={()=> {
                  handleClick(plant)
                }}
                className="flex justify-between items-center cursor-pointer" >
                <h1 className={`text-lg font-semibold flex justify-between items-center`} >
                  {plant.name}
                  <FaEdit color={"green"} className={"ml-2"}/>
                </h1>

              </div>
            )}
          </>
        )
      }


    </>
  );
};

export default PlanEditCustom;
