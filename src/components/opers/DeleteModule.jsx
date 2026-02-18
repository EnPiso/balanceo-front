import React, { useState } from 'react'
import { FaDeleteLeft } from 'react-icons/fa6'
import { ConfirmDeleteOper } from './ConfirmDeleteOper'
import { ModalDeleteGlobal } from './ModalDeleteGlobal'
import { plantsArray } from '../../infraestructure/states/plants_modules_states'
import { useRecoilState } from 'recoil'
import { tokenMemory } from '../../infraestructure/states/states_views'
import { postDataToken, updateDataToken } from '../../infraestructure/call_api/crud'
import { urlMain } from '../../infraestructure/data/const'
import toast from 'react-hot-toast'
import { listOpersCustom } from '../../infraestructure/states/opers_states'

const DeleteModule = ({module, prodPlant, setProdPlant}) => {

  const [isOpen,setIsOpen] = useState(false)
  const [isLoading,setIsLoading] = useState(false)

  const [listPlants, setListPlants] = useRecoilState(plantsArray)
  const [token, setToken] = useRecoilState(tokenMemory);

  const [opers,setOpers] = useRecoilState(listOpersCustom)
  
  const handleDelete = () => {
    const module_id = module.id

    const data = {
      production_module: {
        activate: false
      }
    }

    handleApi(data)
  }

  const handleApi = (data) => {
    const module_id = module.id
    const updateModules = async () => {
      setIsLoading(true)
      try {
        const result = await updateDataToken(urlMain + `production_modules/${module_id}`, data, token)


        const removeModuleById = (plants, moduleId) => {
          return plants.map(plant => ({
            ...plant,
            production_modules: plant.production_modules.filter(
              mod => mod.id !== moduleId
            )
          }));
        };
        const updatedPlants = removeModuleById(listPlants, result.id);
        setProdPlant(null)
        setListPlants(updatedPlants)
        
        
        toast("Se ha eliminado el módulo correctamente")
      
      } catch (error) {
        console.error('Error setting data', error);
        
      } finally {
        setIsOpen(false)
        setIsLoading(false)
      }
    };

    updateModules();
  }

  return (
    <div>
      
      {
        opers.length < 1 &&
          <button
            onClick={()=> setIsOpen(true)}
            className="flex items-center text-red-500 hover:text-red-700 cursor-pointer"
          >
            <FaDeleteLeft size={20} />
          </button>
      }

      
      {
        isOpen && <ModalDeleteGlobal
          isLoading={isLoading}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          handleSave={() => handleDelete(module)}
          title={`¿Quieres Eliminar?`}
          description={`${module.name}`}
        />
      }
    </div>
  )
}

export default DeleteModule