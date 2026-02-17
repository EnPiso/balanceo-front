import React, { useEffect, useState } from 'react'
import { fetchGetData } from '../../../infraestructure/call_api/crud';
import { urlMain } from '../../../infraestructure/data/const';
import { Autocomplete, AutocompleteItem, CircularProgress } from '@nextui-org/react';

const SelectModuleCustom = ({setIdModule}) => {
  const [modules, setModules] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(()=> {
    const getData = async () => {
      setIsLoading(true);
      try {
        const result = await fetchGetData(`${urlMain}opers/production_modules`);
        setModules(result);
        
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      } finally {
        setIsLoading(false)
      }
    };

    getData();
  },[])

  return (
    <div>
      {
        isLoading ? 
          <CircularProgress size="sm" color="default" /> :
          <Autocomplete
            key={'default modules'}
            className="w-full"
            defaultItems={modules}
            label="Cambiar módulo"
            size="sm"
            // defaultSelectedKey={defaultModule ? String(defaultModule.id) : ''}
            onSelectionChange={(selectedKey) => {
              setIdModule(selectedKey);
            }}
          >
            {(item) => <AutocompleteItem key={item.id}>{item.full_name}</AutocompleteItem>}
          </Autocomplete>
        
        
      }
      
    </div>
  )
}

export default SelectModuleCustom