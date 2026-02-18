import { Input, Textarea } from "@nextui-org/input";
import { FaPlus, FaSave } from "react-icons/fa";

import React, { useState } from "react";
import {AiOutlineBlock, AiOutlineBulb} from "react-icons/ai";

import toast from "react-hot-toast";
import {postData} from "../../infraestructure/call_api/crud.js";
import {urlMain} from "../../infraestructure/data/const.js";
import CustomButton from "../../ui/CustomButton.jsx";


const FormNewPlantModules = ({listPlants, setListPlants}) => {
  const [plantName, setPlantName] = useState(""); // Captura el valor del Input
  const [modulesText, setModulesText] = useState(""); // Captura el texto del Textarea

  const [plantAndModules, setPlantAndModules] = useState(null); // Estado final para guardar los datos

  // Manejador de guardar
  const handleSave = () => {
    const modulesArray = modulesText.split(",").map((module) => module.trim()); // Convierte a array
    const data = {
      name_plant: plantName,
      modules: JSON.stringify(modulesArray.filter((module) => module)), // Filtra valores vacíos
    };
    setPlantAndModules(data);
    fetchApi(data);
  };


  const fetchApi = (data) => {
    const postDataOrder = async (data) => {
      try {
        const result = await postData(urlMain + "/production_plants/create_plants_and_modules", data)

        setListPlants([...listPlants, result])
        setPlantName("")
        setModulesText("")
        setPlantAndModules(null)
        toast.success("Se ha creado la planta y los módulos con éxito")
      } catch (error) {
        console.error('Error setting data', error);
      }
    };

    postDataOrder(data);
  }

  return (
    <>
      <div
        className="flex flex-col bg-zinc-200 border border-gray-300 shadow-lg rounded-lg p-4 hover:shadow-xl transition duration-300"
      >
        <div className="">
          <h1 className="font-bold flex justify-between items-center">
            <span>Agregar planta</span>
            <AiOutlineBulb/>
          </h1>
          <Input
            placeholder="Nueva planta de producción"
            type="text"
            className="mt-2"
            value={plantName} // Valor del Input
            onChange={(e) => setPlantName(e.target.value)} // Captura el valor sin afectar el formato final
          />
          <h1 className="font-bold flex justify-between items-center mt-2">
            <span>Agregar módulos</span>
            <AiOutlineBlock/>
          </h1>
          <Textarea
            className="w-full mt-2"
            labelPlacement="outside"
            placeholder="Agrega módulos separados por coma (,)"
            value={modulesText} // Valor del Textarea
            onChange={(e) => setModulesText(e.target.value)} // Captura el valor sin afectar el formato final
          />

          <div className="mt-2">
            {
              plantName.length >= 2 &&
              modulesText.length >= 2 &&  <CustomButton
                color="default"
                variant="bordered"
                startContent={<FaSave color="green"/>}
                onClick={handleSave} // Guarda los datos
                title="Guardar"
              />
            }

          </div>
        </div>
      </div>
    </>
  );
};

export default FormNewPlantModules;
