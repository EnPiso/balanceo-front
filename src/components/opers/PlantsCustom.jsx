import React, {useEffect, useState} from "react";
import {fetchGetData} from "../../infraestructure/call_api/crud.js";
import {urlMain} from "../../infraestructure/data/const.js";
import PlanEdit from "../balances/balancing/sidebarForm/PlantEdit.jsx";
import toast from "react-hot-toast";
import {toastMessageCustom} from "../../infraestructure/data/toastMessage.js";
import PlantEditCustom from "./PlantEditCustom.jsx";
import FormEditInput from "../balances/balancing/sidebarForm/FormEditInput.jsx";
import InputFieldModule from "./InputFieldModule.jsx";
import {AiOutlineMinus} from "react-icons/ai";
import {FaCheck, FaPlus} from "react-icons/fa";
import FormCreatePlant from "../balances/balancing/sidebarForm/FormCreatePlant.jsx";
import FormNewPlantModules from "./FormNewPlantModules.jsx";
import ModuleEdit from "../balances/balancing/sidebarForm/ModuleEdit.jsx";
import ModuleEditCustom from "./ModuleEditCustom.jsx";
import ListOpersCustom from "./ListOpersCustom.jsx";
import {Spinner, Tooltip} from "@nextui-org/react";
import NewModuleFormInput from "./NewModuleFormInput.jsx";

const PlantsCustom = () => {

  const [listPlants, setListPlants] = useState([])

  const [prodPlant, setProdPlant] = useState(null)
  const [updateModule, setUpdateModule] = useState( ""); // Inicializa con el nombre de la planta
  const [isCreate, setIsCreate] = useState(false);

  const [isLoading,setIsLoading] = useState(false)
  const [isLoadingPlants,setIsLoadingPlants] = useState(true)

  const [isNewModule,setIsNewModule] = useState(false)


  useEffect(() => {

    const getData = async () => {
      try {
        //setLoading(true);
        const result = await fetchGetData(`${urlMain}production_plants`);

        if(result.error){
          setListPlants(result.plants)
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      } finally {
        setIsLoadingPlants(false);
      }
    };
    getData();
  }, []);

  const handleKeyDown = () => {

  }

  return(
    <>

      {
        isCreate && <FormNewPlantModules
          listPlants={listPlants}
          setListPlants={setListPlants}
        />
      }


      <div className="py-2 flex justify-end">
      <Tooltip content={`${isCreate ? 'Cancelar' : 'Agregar nueva planta y sus módulos'}`}>
        <button onClick={() => setIsCreate(!isCreate)}>
            {
              isCreate ? <AiOutlineMinus size={30}/> : (
                <>
                <FaPlus size={30} color="green"/>
                </>
              ) 
            }
        </button>
      </Tooltip>
       
      </div>


      {
        isLoadingPlants ? (
          <div className={"flex justify-center"}>
            <Spinner color={"default"} size={"lg"}/>
          </div>
        ) : (
          <>
          
            <div className="bg-gray-50 p-4 rounded-md shadow-md">
              <table className="min-w-full border-collapse text-small">
                <thead className="bg-gradient-to-r from-zinc-700 to-zinc-900 text-white sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-2 text-left font-bold flex justify-between items-center text-secondary_two">
                    Plantas
                  </th>
                  <th className="px-4 py-2 text-left font-bold text-secondary_two">
                    Módulos
                  </th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {
                    listPlants.map((plant, i)=> {
                      return(
                        <tr key={i} className={`hover:bg-zinc-100 dark:hover:bg-zinc-700 `}>
                          <td className={`px-4 py-2 border border-gray-300 `}>
                            <PlantEditCustom
                              plant={plant}
                              listPlants={listPlants}
                              setListPlants={setListPlants}
                              setProdPlant={setProdPlant}
                              prodPlant={prodPlant}
                            />
                          </td>
                          <td className="px-4 py-2 border border-gray-300">
                            <p className="mt-2 text-medium text-gray-500">
                              {plant.production_modules.map((module, j) => (
                                <>
                                  <button
                                    onClick={() => {
                                      setProdPlant(
                                        {
                                          plant: plant,
                                          module: module
                                        }
                                      )
                                      setIsLoading(true)
                                    }}
                                    key={j}>
                                    <span
                                      className={`font-bold hover:underline !cursor-pointer my-1 mr-1 ${prodPlant && (prodPlant.module.id === module.id) && 'text-secondary_two' }`}>
                                      {module.name}
                                      {j < plant.production_modules.length - 1 && ", "}
                                    </span>
                                  </button>
                                </>
                              ))}
                            </p>
                            <NewModuleFormInput
                              listPlants={listPlants}
                              setListPlants={setListPlants}
                              plant={plant}/>

                            {
                              prodPlant && prodPlant.plant.id ===  plant.id && (
                                <>
                                  <div>
                                    <div className="bg-zinc-50 py-4 ">
                                      <div>
                                      
                                        <div>
                                          <ModuleEditCustom
                                            listPlants={listPlants}
                                            setListPlants={setListPlants}
                                            prodPlant={prodPlant}
                                            setProdPlant={setProdPlant}
                                          />
                                        </div>


                                      </div>
                                    </div>

                                  </div>
                                </>
                              )
                            }

                            {
                              prodPlant && prodPlant.plant.id ===  plant.id &&  <ListOpersCustom
                                isLoading={isLoading}
                                setIsLoading={setIsLoading}
                                prodPlant={prodPlant}
                              />
                            }

                              
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>


          </>
        )
      }




    </>
  )
}

export default PlantsCustom;