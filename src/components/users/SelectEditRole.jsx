import React, { useState } from 'react'
import { Autocomplete, AutocompleteItem, CircularProgress, Tooltip } from '@nextui-org/react';
import { FaHardHat } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { updateDataToken } from '../../infraestructure/call_api/crud';
import { urlMain } from '../../infraestructure/data/const';
import { useRecoilState } from 'recoil';
import { allUsers, tokenMemory } from '../../infraestructure/states/states_views';
import { FaBackward, FaDeleteLeft } from 'react-icons/fa6';

const roles = [
  { id: 'admin', name: 'Administrador' },
  { id: 'supervisor', name: 'Supervisor' }
];


const SelectEditRole = ({user}) => {

  const [isEdit ,setIsEdit] = useState(false)

  const [token, setToken] = useRecoilState(tokenMemory);

  const [users, setUsers] = useRecoilState(allUsers);
  
  const [isLoading ,setIsLoading] = useState(false)


  const handleEdit = () => {
    console.log(user)
    setIsEdit(true)
  }

  const handleSelect = (id) => {
    console.log(id)
    const user_id = user.id

    const data = {
      user: {
        role: id
      }
    }
    handleApi(data, user_id)
  }

  const handleApi = (data, user_id) => {
    const updatePassword = async () => {
      setIsLoading(true)
      try {
        const result = await updateDataToken(urlMain + `users/${user_id}`, data, token)
        
        const new_user = result.user
        const updateUsers = users.map(item =>
          item.id === new_user.id ? new_user : item
        );
        setUsers(updateUsers)
        toast.success( `Se actualizó el rol de ${result.user.name} correctamente`)
      } catch (error) {
        console.error('Error setting data', error);
      } finally {
        setIsEdit(false)
        setIsLoading(false)
      }
    };

    updatePassword();
  }

  return (
    <>
    {
      isLoading ? 
        <CircularProgress color='default' size='20'/> :
        <>
          {
            user.id !== 1 && user.activate ? 
            <>
              {
                isEdit ? 
                  <>
                    <Autocomplete
                      className="w-full"
                      defaultItems={roles}
                      placeholder="Selecciona un rol"
                      size="sm"
                      defaultSelectedKey={user.role}
                      onSelectionChange={handleSelect}
                    >
                      {(item) => (
                        <AutocompleteItem key={item.id}>
                          {item.name}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                    <button className='ml-1' onClick={()=> setIsEdit(false)}>
                      <FaDeleteLeft className='text-red-500'/>
                    </button>
                  </>
                  :
                  <Tooltip content="Cambiar rol" placement="left">
                    <button onClick={handleEdit} className="cursor-pointer font-bold flex justify-between items-center hover:text-secondary_two capitalize">
                      {user.role === "admin" ? "administrador" : user.role}

                      {
                        user.role === "admin" &&
                          <FaHardHat className="text-zinc-700 ml-2" size={20} /> 
                      }
                    </button>
                  </Tooltip>

              }
            
            </> : 
            <>
              <span className="flex justify-between items-center font-bold capitalize">
                {user.role === "admin" ? "administrador" : user.role}

                {
                  user.role === "admin" &&
                    <FaHardHat className="text-secondary_two ml-2" size={20} /> 
                }
              </span>
            </>
          }
        </>
    }
      
    
    </>
  )
}

export default SelectEditRole
