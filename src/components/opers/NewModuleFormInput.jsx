import { Textarea, Tooltip } from '@nextui-org/react';
import React,{useState} from 'react'
import CustomButton from '../../ui/CustomButton';
import { FaBackward, FaLess, FaPlus, FaSave } from 'react-icons/fa';
import { postData, updateData } from '../../infraestructure/call_api/crud';
import { urlMain } from '../../infraestructure/data/const';
import toast from 'react-hot-toast';

const NewModuleFormInput = ({ plant, listPlants, setListPlants }) => {

  const [isNewModule,setIsNewModule] = useState(false)
    
  const [modulesText, setModulesText] = useState(""); // Captura el texto del Textarea
    
  const handleSave = () => {
    
        const data = {
            production_module:{
                modules: modulesText,
                plant_id: plant.id
            }
        }

       // delete_operation_balancing
       const updateModules = async () => {
  
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
                        placeholder="Agrega módulos separados por coma (,)"
                        value={modulesText} // Valor del Textarea
                        onChange={(e) => setModulesText(e.target.value)} // Captura el valor sin afectar el formato final
                    />

                    <div className="mt-2">
                        {
                            modulesText.length >= 2 &&  <CustomButton
                                color="default"
                                variant="bordered"
                                startContent={<FaSave color="green"/>}
                                onClick={handleSave} // Guarda los datos
                                title="Guardar"
                            />
                        }

                    </div>  
                </>
            )
        }
           

            <div className="flex justify-end">
                <Tooltip content={`${isNewModule ? 'Cancelar' :' Agregar módulo en ' + plant.name} `}>
                  <button onClick={()=> setIsNewModule(!isNewModule)}>
                    {
                        isNewModule ? 
                            <FaBackward size={20}/> :
                            <FaPlus size={24} color="green"/> 
                            
                    }
                   
                  </button>
                </Tooltip>
            </div>
        
    </div>
  )
}

export default NewModuleFormInput