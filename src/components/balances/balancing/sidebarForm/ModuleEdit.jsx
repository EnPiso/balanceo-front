import {useEffect, useState} from "react";
import FormEditInput from "./FormEditInput.jsx";
import {FaAngleDoubleRight, FaEdit} from "react-icons/fa";
import {Tooltip} from "@nextui-org/react";
import {useRecoilState} from "recoil";
import {productionPlants, selectProdPlant} from "../../../../infraestructure/states/opers_states.js";
import {updateData} from "../../../../infraestructure/call_api/crud.js";
import {urlMain} from "../../../../infraestructure/data/const.js";
import toast from "react-hot-toast";
import {toastMessageCustom} from "../../../../infraestructure/data/toastMessage.js";


const ModuleEdit = () => {
    const [isEdit, setIsEdit] = useState(false)
    const [objEdit, setObjEdit] = useState(null);
    const [moduleName, setModuleName] = useState('')

    const [prodPlant, setProdPlant] = useRecoilState(selectProdPlant)
    const [listPlants, setListPlants] = useRecoilState(productionPlants)


    useEffect(() => {
        setIsEdit(false)
    }, [prodPlant]);


    const handleKeyDown = (event) => {
        event.stopPropagation()
        if (event.key === "Enter") {

            const data = {
                name: moduleName
            }
            fetchUpdate(data, objEdit.id);


        }else if ((event.key === "Escape")){
            setIsEdit(false)
        }
    };



    const fetchUpdate = (data, id) => {
        const production_module = {
            production_module: data
        }

        const updatePlant = async (data) => {
            try {
                const result = await updateData(urlMain + `production_modules/${id}/update_module/`, production_module)

                // const updatedData = updateNestedItem(listPlants, prodPlant.plant.id, result.id, result);
                const update_module = listPlants.map((plant) => {
                    if (plant.id === prodPlant.plant.id) {
                        return {
                            ...plant,
                            production_modules: plant.production_modules.map((module) =>
                                module.id === result.id ? result : module
                            ),
                        };
                    }
                    return plant;
                });

                
                setListPlants(update_module)

                setProdPlant({ ...prodPlant, module: result })

                setIsEdit(false); // Sale del modo edición

                toast.success(toastMessageCustom.updateModule)
            } catch (error) {
                console.error('Error setting data', error);
            }
        };

        updatePlant(data);

    }



    return(
        <>

            {
                isEdit ?
                    <div className=" py-2 px-2 rounded">
                        <FormEditInput
                            onKeyDown={handleKeyDown}
                            valueDefault={prodPlant && prodPlant.module.name}
                            value={moduleName}
                            setState={setModuleName}/>
                    </div> :
                    <div onClick={() => {
                        setIsEdit(true)
                        setObjEdit(prodPlant.module)
                    }} className="flex justify-between items-center cursor-pointer">
                        <h1 className="font-bold text-sm capitalizetext-zinc-500 mr-5">
                            {prodPlant.module.name}
                        </h1>
                        <FaEdit/>
                    </div>
            }

        </>
    )
}

export default ModuleEdit;