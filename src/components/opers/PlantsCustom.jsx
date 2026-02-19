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
import {CircularProgress, Progress, Spinner, Tooltip} from "@nextui-org/react";
import NewModuleFormInput from "./NewModuleFormInput.jsx";
import { plantsArray } from "../../infraestructure/states/plants_modules_states.js";
import { useRecoilState } from "recoil";

const PlantsCustom = ({topView}) => {

  const [listPlants, setListPlants] = useRecoilState(plantsArray)

  const [prodPlant, setProdPlant] = useState(null)
  const [updateModule, setUpdateModule] = useState( ""); // Inicializa con el nombre de la planta
  const [isCreate, setIsCreate] = useState(false);

  const [isLoading,setIsLoading] = useState(false)
  const [isLoadingPlants,setIsLoadingPlants] = useState(true)

  const [isNewModule,setIsNewModule] = useState(false)

  const [isLoadingModules,setIsLoadingModules] = useState(null)

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
          
            <div className="bg-gray-50 dark:bg-zinc-800 p-4 rounded-md shadow-md">
              <table className="min-w-full border-collapse text-small">
                <thead className="bg-gray-50 dark:bg-zinc-800 sticky top-0 z-10">
                  <tr className="border-b border-zinc-300 dark:border-zinc-600">
                    <th className="px-4 py-2 text-left font-medium uppercase text-secondary_two">
                      Plantas
                    </th>
                    <th className="px-4 py-2 text-left font-medium uppercase text-secondary_two">
                      Módulos
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    listPlants.map((plant, i)=> {
                      return(
                        <tr key={i} className="hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors">
                          <td className="px-4 py-2 border border-gray-100 dark:border-zinc-700">
                            <PlantEditCustom
                              plant={plant}
                              listPlants={listPlants}
                              setListPlants={setListPlants}
                              setProdPlant={setProdPlant}
                              prodPlant={prodPlant}
                            />
                          </td>
                          <td className="px-4 py-2 border border-gray-100 dark:border-zinc-700">
                            <p className="mt-2 text-medium text-gray-500 dark:text-zinc-400">
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
                                      setIsLoadingModules(module.id)
                                    }}
                                    key={j}>
                                    <span
                                      className={`inline-flex items-center font-bold hover:underline !cursor-pointer my-1 mr-1 ${
                                        prodPlant && prodPlant.module.id === module.id ? "text-secondary_two" : ""
                                      }`}
                                    >
                                      {module.id === isLoadingModules ? (
                                        <Progress
                                          color="default"
                                          isIndeterminate
                                          aria-label="Loading..."
                                          size="sm"
                                          className="w-16" // dale ancho fijo
                                        />
                                      ) : (
                                        <>
                                          {module.name}
                                          {j < plant.production_modules.length - 1 && ", "}
                                        </>
                                      )}
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
                                    <div className="bg-zinc-50 dark:bg-zinc-700 py-4">
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
                                setIsLoadingModules={setIsLoadingModules}
                                isLoadingModules={isLoadingModules}
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