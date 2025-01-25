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
            {listPlants.map((plant, i) => (
              <div
                key={i}
                className="flex flex-col bg-white border border-gray-300 shadow-lg rounded-lg p-4 hover:shadow-xl transition duration-300">

                <PlantEditCustom
                  plant={plant}
                  listPlants={listPlants}
                  setListPlants={setListPlants}
                  setProdPlant={setProdPlant}
                />

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
                          className={`font-bold hover:underline !cursor-pointer my-1 mr-1`}>
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
             
              </div>
            ))}

           
          </>
        )
      }




      {
        prodPlant && (
          <>
            <div>
              <div className="bg-zinc-50 py-4 px-2">
                <div className="grid grid-cols-6 gap-4">
                  <div className="col-start-1 col-end-3 ">
                    <h1 className="text-left text-2xl col-span-8 flex justify-start">
                      <FaCheck color="green"/> <span className="font-bold ml-3">  {prodPlant.plant.name}</span>
                    </h1>
                  </div>
                  <div className="col-end-7 col-span-2 ">
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
        prodPlant &&  <ListOpersCustom
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          prodPlant={prodPlant}
        />
      }



    </>
  )
}

export default PlantsCustom;