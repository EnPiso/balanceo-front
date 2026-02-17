import { CircularProgress, Textarea, Tooltip } from '@nextui-org/react';
import React,{useState} from 'react'
import CustomButton from '../../ui/CustomButton';
import { FaArrowLeft, FaBackward, FaLess, FaPlus, FaSave } from 'react-icons/fa';
import { postData, updateData } from '../../infraestructure/call_api/crud';
import { urlMain } from '../../infraestructure/data/const';
import toast from 'react-hot-toast';
import { FaArrowDownUpAcrossLine } from 'react-icons/fa6';

const NewModuleFormInput = ({ plant, listPlants, setListPlants }) => {

  const [isNewModule,setIsNewModule] = useState(false)
    
  const [modulesText, setModulesText] = useState(""); // Captura el texto del Textarea

  const [isLoading,setIsLoading] = useState(false)
    
  const handleSave = () => {
    
        const data = {
            production_module:{
                modules: modulesText,
                plant_id: plant.id
            }
        }

       // delete_operation_balancing
       const updateModules = async () => {
        setIsLoading(true)
        try {
            const result = await updateData(urlMain + "production_modules/create_modules_in_plant", data)
       
            // Actualizar el objeto
            const updateObjects = listPlants.map(obj => {
                if (obj.id === plant.id) {
                return {
                    ...obj,
                    production_modules: [...obj.production_modules, ...result] // Combinar el array actual con el nuevo array
                };
                }
                return obj; // Dejar los demás objetos sin cambios
            });
            
            setListPlants(updateObjects)
            setModulesText('')
            setIsNewModule(false)
            toast.success("Se han creado los módulos con exito en " +  plant.name)
  
        } catch (error) {
          console.error('Error setting data', error);
        } finally {
            setIsLoading(false)
        }
      };
  
      updateModules();
  } 

  return (
    <div>
        {
            isNewModule && (
                <>
                    <Textarea
                        className="w-full mt-2"
                        labelPlacement="outside"
                        placeholder="Agrega módulos separados por coma (,) Enter para guardar , ESC para salir"
                        value={modulesText} // Valor del Textarea
                        onChange={(e) => setModulesText(e.target.value)} // Captura el valor sin afectar el formato final
                    />

                </>
            )
        }
        <div className="flex justify-end py-3">
            <Tooltip content={`${isNewModule ? 'Cancelar' :' Agregar módulo en ' + plant.name} `}>
                <CustomButton
                    color="default"
                    variant="bordered"
                    startContent={
                        isNewModule ? 
                            <FaBackward color='red'/> :
                            <FaPlus className="text-secondary_two"/> 
                    }
                    onClick={()=> setIsNewModule(!isNewModule)}
                    title={`${isNewModule ? 'Cancelar' :' Agregar módulo en ' + plant.name} `}
                    />
            </Tooltip>

            {
                isNewModule && (
                    <>
                        {
                            modulesText.length >= 2 &&  
                                <>
                                    {
                                        isLoading ?
                                            <CircularProgress color='default' /> :
                                            <CustomButton
                                                color="default"
                                                variant="bordered"
                                                startContent={<FaSave color="green"/>}
                                                onClick={handleSave} // Guarda los datos
                                                title="Guardar"
                                            />

                                    }
                                    
                                </>
                        }

                    </>
                )

            }
        </div>
        
    </div>
  )
}

export default NewModuleFormInput