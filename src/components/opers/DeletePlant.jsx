import React, { useState } from 'react'
import { FaDeleteLeft } from 'react-icons/fa6'
import { ModalDeleteGlobal } from './ModalDeleteGlobal'
import { useRecoilState } from 'recoil'
import { tokenMemory } from '../../infraestructure/states/states_views'
import { updateDataToken } from '../../infraestructure/call_api/crud'
import { urlMain } from '../../infraestructure/data/const'
import toast from 'react-hot-toast'
import { plantsArray } from '../../infraestructure/states/plants_modules_states'

const DeletePlant = ({plant, setIsOpen, isOpen}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [token, setToken] = useRecoilState(tokenMemory);
  const [listPlants, setListPlants] = useRecoilState(plantsArray)
  

  const handleDelete = () => {
  
    const data = {
      production_plant: {
        activate: false
      }
    }

    handleApi(data)
  }

  const handleApi = (data) => {

    const deletePlant = async () => {
      setIsLoading(true)
      const plant_id = plant.id
      try {
        const result = await updateDataToken(urlMain + `production_plants/${plant_id}`, data, token)
        const updatePlants = listPlants.filter(item => item.id !== result.id);
        setListPlants(updatePlants)
        
        toast("Se ha eliminado la panta correctamente")
      
      } catch (error) {
        console.error('Error setting data', error);
        
      } finally {
        setIsLoading(false)
        setIsOpen(false)
      }
    };

    deletePlant();
  }
  
  return (
    <>
      {
        plant.production_modules.length < 1 &&
          <button
            onClick={()=> setIsOpen(true)}
            className="flex items-center text-red-500 hover:text-red-700 cursor-pointer ml-2"
          >
            <FaDeleteLeft size={20} />
          </button>
      }

      {
        isOpen && <ModalDeleteGlobal
          isLoading={isLoading}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          handleSave={handleDelete}
          title={`¿Quieres Eliminar?`}
          description={`${plant.name}`}
        />
      }
    </>
  )
}

export default DeletePlant