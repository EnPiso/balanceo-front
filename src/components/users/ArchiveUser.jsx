import React, { useState } from 'react'
import { FaFileArchive } from 'react-icons/fa'
import { useRecoilState } from 'recoil';
import { allUsers, tokenMemory } from '../../infraestructure/states/states_views';
import { ConfirmOpen } from '../balances/balancing/sidebarForm/ConfirmOpers';
import ConfirmDeleteVideo from '../balances/balancing/tableOperations/videoOperations/ConfirmDeleteVideo';
import toast from 'react-hot-toast';
import { postData, updateData, updateDataToken } from '../../infraestructure/call_api/crud';
import { urlMain } from '../../infraestructure/data/const';
import { CircularProgress, Tooltip } from '@nextui-org/react';

const ArchiveUser = ({user}) => {

  const [users, setUsers] = useRecoilState(allUsers);

  const [isDelete, setIsDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [token, setToken] = useRecoilState(tokenMemory);

  const handleDelete = () => {
    console.log(user)

    const deleteUser = async () => {
      setIsLoading(true)
      const user_id = user.id

      const data = {
        user: {
          activate: user.activate ? false : true,
        }
      }

      try {
        const result = await updateDataToken(urlMain + `users/${user_id}`, data, token);
        // console.log(result)
        const updatedUsers = users.filter(u => u.id !== user_id);
        setUsers(updatedUsers);
        
        {
          result.user.activate ?
            toast.success("Se activó correctamente el usuario") :
            toast.error("Se archivó correctamente el usuario")
        }
        
      } catch (error) {
        console.error('Error setting data', error);
      } finally {
        setIsLoading(false)
      }
    };

    deleteUser();
  }

  return (
    <div>
      
      {
        user.id !== 1 && (
          <Tooltip content={!user.activate ? 'Activar usuario' : 'Archivar usuario'} placement="top">
            <button
              onClick={() => setIsDelete(!isDelete)}
              className="mr-2">
              
              <FaFileArchive
                className={`!cursor-pointer ${user && user.activate ? 'text-red-500' : 'text-secondary_two'}`}
                size={20}
              />
            </button>  
          </Tooltip>   
        )
      }
      
      {
        isDelete &&
          <ConfirmDeleteVideo
            isOpen={isDelete}
            setIsOpen={setIsDelete}
            handleSave={() => handleDelete()}
            title={!user.activate ? '¿Quieres activar el usuario?' : '¿Quieres eliminar el usuario?'}
            description={user.name}
            isLoading={isLoading}
          />
      }
      
    </div>
  )
}

export default ArchiveUser