// SelectListMachines.jsx
import { Autocomplete, AutocompleteItem, CircularProgress } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { selectAllMachines } from '../../infraestructure/states/states_machine';
import { fetchGetData, updateData } from '../../infraestructure/call_api/crud';
import { urlMain } from '../../infraestructure/data/const';
import toast from 'react-hot-toast';
import { operationsProduct } from '../../infraestructure/states/operation_states';



const SelectListEditMachine = ({ operation, setShowMachine }) => {
  const [allMachines, setAllMachines] = useRecoilState(selectAllMachines);

  const [operations, setOperations] = useRecoilState(operationsProduct)
  
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=> {
    const getData = async () => {
      setIsLoading(true)
      try {
        const result = await fetchGetData(`${urlMain}machines/all_machines`);
        console.log(result);
        
        setAllMachines(result)
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setIsLoading(false)
      }
    };
    allMachines.length < 1 && getData();
    
  }, [])


  const handleSelect = (selectedKey) => {
    const operation_id = operation.id
    const machine_id = parseInt(selectedKey)
    const updateObj = allMachines.find(m => m.id === machine_id);

    const data = {
      operation : {
        machine_id: machine_id,
        machine_name: updateObj.machine
      }
    }
    
    const updateOperation = async () => {
      setIsLoading(true)
      try {
        const result = await updateData(`${urlMain}operations/${operation_id}`, data)
        console.log(result)
        console.log(operations)

        const upOperations = operations.operations

        const newArr = upOperations.map(item =>
          item.id === result.id ? result : item
        );

        const dataOperations = {
          operations: newArr,
          product: operations.product
        }
        setOperations(dataOperations) 
        setShowMachine(false)
        toast.success("Se ha actualizado la operación correctamente")
        setIsLoading(false)
      } catch (error) {
        console.error('Error setting data', error);
      }
    };

    updateOperation();

  };

  const valueDefault = operation.machine_id?.toString()
  return (
    <div className={`pt-1 ${operation && operation.machine && 'pb-1'} w-full`}>

      {
        isLoading ? 
          <CircularProgress color='default'/> : 
          <>
            {
              operation &&
                operation.machine ? 
                  <small>Máquina</small> :
                  <div className='h-3'></div>
            }

            <Autocomplete
              className="w-full"
              defaultItems={allMachines}
              label="Selecciona una máquina"
              size="sm"
              onSelectionChange={handleSelect}
              defaultSelectedKey={valueDefault} // 👈 clave aquí
            >
              {(item) => (
                <AutocompleteItem key={item.id.toString()}>
                  {item.machine}
                </AutocompleteItem>
              )}
            </Autocomplete>

          </>
      }

    </div>
    
  );
};

export default SelectListEditMachine;
