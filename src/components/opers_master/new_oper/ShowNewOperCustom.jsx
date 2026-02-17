import { Avatar } from '@nextui-org/react'
import React from 'react'
import JoinMasterPolyvalence from '../JoinMasterPolyvalence';
import ModalOperModule from '../ModalOperModule';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { opersListModules } from '../../../infraestructure/states/opers_states';

const ShowNewOperCustom = ({ newObjOper }) => {

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModule, setIsOpenModule] = useState(false);
  const [opersModules, setOpersModules] = useRecoilState(opersListModules);

  return (
    <div className="mt-8 flex flex-col items-center  rounded-lg p-8 max-w-md mx-auto">
      {newObjOper.avatar && (
        <Avatar
          className="w-40 h-40 mb-6 shadow"
          src={newObjOper.avatar}
        />
      )}

      <div className="w-full text-center">
        <p className="text-lg font-semibold text-gray-700 mb-2">
          Cédula: <span className="font-normal">{newObjOper.id_oper}</span>
        </p>
        <p className="text-lg font-semibold text-gray-700">
          Nombre: <span className="font-normal">{newObjOper.name}</span>
        </p>
      </div>
      
      <div className='mt-4'>
        <small className='text-secondary_two font-bold'>
          Agregar módulo de producción
        </small>
      </div>
        
        <JoinMasterPolyvalence 
          oper={newObjOper} 
          setIsOpen={setIsOpenModule}
          setOpersModules={setOpersModules}
        />
        {
          isOpenModule && 
            <ModalOperModule
              isOpen={isOpenModule} 
              setIsOpen={setIsOpenModule}
            />
        }
    </div>
  )
}

export default ShowNewOperCustom