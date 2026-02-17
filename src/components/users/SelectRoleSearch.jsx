// SelectRoles.jsx
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import React from 'react';

const roles = [
  { id: 1, name: 'Administrador' },
  { id: 0, name: 'Supervisor' }
];

const SelectRoleSearch = ({ formData, setFormData }) => {
  const handleSelect = (selectedKey) => {
    setFormData(selectedKey || ""); // ahora guardamos solo el string del rol
  };

  return (
    <div className="pt-1 w-full">
      <Autocomplete
        className="w-full"
        defaultItems={roles}
        placeholder="Selecciona un rol"
        size="sm"
        selectedKey={formData}
        onSelectionChange={handleSelect}
      >
        {(item) => (
          <AutocompleteItem key={item.id}>
            {item.name}
          </AutocompleteItem>
        )}
      </Autocomplete>
    </div>
  );
};


export default SelectRoleSearch;
