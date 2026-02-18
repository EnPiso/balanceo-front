import {useEffect, useState} from "react";
import {fetchGetData} from "../../../../infraestructure/call_api/crud.js";
import {urlMain} from "../../../../infraestructure/data/const.js";
import {assignColorsToArray} from "../../../../ui/utils.js";
import {useRecoilState} from "recoil";
import {
    checkOpersPosition,
    productionPlants, selectOpers,
    selectProdPlant,
    selectProdPlantOriginal
} from "../../../../infraestructure/states/opers_states.js";
import InputSearch from "./inputSearch.jsx";
import PlanEdit from "./PlantEdit.jsx";
import {FaAdjust, FaCheck, FaEdit, FaPlus} from "react-icons/fa";
import ModuleEdit from "./ModuleEdit.jsx";
import FormCreatePlant from "./FormCreatePlant.jsx";
import {AiOutlineMinus} from "react-icons/ai";
import toast from "react-hot-toast";
import {toastMessageCustom} from "../../../../infraestructure/data/toastMessage.js";


const   DashboardPlants = () => {
    const [opersSelect, setOpersSelect] = useRecoilState(selectOpers);
    const [selectedOperDetails, setSelectedOperDetails] = useRecoilState(checkOpersPosition); // Array con los detalles de cada selección

    // const isEmptyState = opersSelect.size === 0 && selectedOperDetails.length === 0;

    const [listPlants, setListPlants] = useRecoilState(productionPlants)
    const [prodPlant, setProdPlant] = useRecoilState(selectProdPlant)

    const [prodPlantOriginal, setProdPlantOriginal] = useRecoilState(selectProdPlantOriginal)


    const [searchModules, setSearchModules] = useState([]);
    const [isModuleSearch, setIsModuleSearch] = useState(false);

    const [isCreate, setIsCreate] = useState(false);

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
                //setLoading(false);
            }
        };
        getData();
    }, []);


    const handleModule = (plant,module) => {
        const data = {
            plant,
            module,
        }
        setProdPlant(data)
    }

    const handleModuleSelect = (module) => {
        const data = {
            plant: {
                name: module.plant_name,
                id: module.production_plant_id
            },
            module: module
        }

        setProdPlant(data)
    }


    return(
        <>
            <div>
                {
                    (opersSelect.size === 0 && selectedOperDetails.length === 0) && (
                        <InputSearch
                            setSearchModules={setSearchModules}
                            setIsModuleSearch={setIsModuleSearch}
                        />
                    )
                }


                {isModuleSearch ? (
                    // Renderizar lista de módulos encontrados
                    <div className="grid grid-cols-4 ">
                        {
                            searchModules.map((module, i) => (

                                <p
                                    onClick={() => handleModuleSelect(module)}
                                    className={`
                                    ${prodPlantOriginal && 
                                    prodPlantOriginal.module.id === module.id ? 
                                        "font-bold text-gray-800 uppercase underline" : 
                                        "text-gray-500 capitalize"} 
                                    ${prodPlant && prodPlant.module.id === module.id && 'underline'}
                                         mt-2 text-md font-black   mr-2 `}
                                    key={i}>
                                    <span className={`  hover:underline !cursor-pointer my-1 bg-zinc-100 `}>
                                        {module.name}
                                     </span>
                                </p>

                            ))
                        }
                    </div>
                ) : (
                    // Renderizar lista de plantas con sus módulos
                    <>
                        <h1 className="py-2 font-bold text-md"> - Plantas de confección</h1>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


                            {listPlants.map((plant, i) => (
                                <div
                                    key={i}
                                    className="flex flex-col bg-white border border-gray-300 shadow-lg rounded-lg p-4 hover:shadow-xl transition duration-300"
                                >
                                    {/* Título de la planta */}
                                    <PlanEdit
                                        prodPlant={prodPlant}
                                        plant={plant}
                                    />

                                    {/* Lista de módulos en línea separados por comas */}
                                    <p className="mt-2 text-xs text-gray-500">
                                        {plant.production_modules.map((module, j) => (
                                            <button
                                                onClick={() => {
                                                    if (opersSelect.size === 0 && selectedOperDetails.length === 0) {
                                                        handleModule(plant, module)
                                                    } else {
                                                        toast.error(toastMessageCustom.noSelectModule)
                                                    }
                                                }}
                                                key={j}
                                            >
                                        <span
                                            className={`font-bold hover:underline !cursor-pointer my-1 
                                            ${prodPlant && prodPlant.module.id === module.id && 'underline text-zinc-900'}
                                            ${prodPlantOriginal && prodPlantOriginal.module.id === module.id && "text-zinc-800 font-bold uppercase underline"}`}>
                                                {module.name}
                                            {j < plant.production_modules.length - 1 && ", "}
                                        </span>
                                            </button>
                                        ))}
                                    </p>
                                </div>
                            ))}

                            {
                                isCreate && <FormCreatePlant/>
                            }

                        </div>


                    </>
                )}


                <div className="py-2 flex justify-end">
                    <button onClick={() => setIsCreate(!isCreate)}>
                        {
                            isCreate ? <AiOutlineMinus size={30}/> : <FaPlus size={30}/>
                        }

                    </button>
                </div>
            </div>


            {
                prodPlant && (
                    <div>
                        <div className="bg-zinc-50 py-4 px-2">
                            <div className="grid grid-cols-6 gap-4">
                                <div className="col-start-1 col-end-3 ">

                                    <h1 className="text-left col-span-8 flex justify-start">
                                        <FaCheck color="green"/>   <span className="font-bold ml-3">  {prodPlant.plant.name}</span>
                                    </h1>

                                </div>
                                <div className="col-end-7 col-span-2 ">
                                    <ModuleEdit
                                        prodPlant={prodPlant}
                                    />
                                </div>


                            </div>
                        </div>
                    </div>
                )
            }

        </>
    )
}

export default DashboardPlants;