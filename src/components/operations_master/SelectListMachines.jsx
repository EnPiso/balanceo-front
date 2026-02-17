// SelectListMachines.jsx
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import React from 'react';
import { useRecoilState } from 'recoil';
import { selectAllMachines } from '../../infraestructure/states/states_machine';

const SelectListMachines = ({ operation, setOperation }) => {
  const [allMachines] = useRecoilState(selectAllMachines);

  const handleSelect = (selectedKey) => {
    const selectedMachine = allMachines.find((m) => String(m.id) === selectedKey);

    if (selectedMachine) {
      setOperation({
        ...operation,
        machine_id: selectedMachine.id,
        machine_name: selectedMachine.machine, // o el campo adecuado según tu API
      });
    }
  };

  return (
    <div className={`pt-1 ${operation && operation.machine && 'pb-1'} w-full`}>
      {
        operation &&
          operation.machine ? 
            <small>Máquina</small> :
            <div className='h-3'></div>
      }
      <Autocomplete
      
        className="w-full"
        defaultItems={allMachines}
        placeholder="Selecciona una máquina"
        size="sm"
        onSelectionChange={handleSelect}
      >
        {(item) => (
          <AutocompleteItem key={item.id}>
            {item.machine}
          </AutocompleteItem>
        )}
      </Autocomplete>
    </div>
    
  );
};

export default SelectListMachines;
