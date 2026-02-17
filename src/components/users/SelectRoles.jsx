// SelectRoles.jsx
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import React from 'react';

const roles = [
  { id: 'admin', name: 'Administrador' },
  { id: 'supervisor', name: 'Supervisor' }
];

const SelectRoles = ({ formData, setFormData }) => {
  const handleSelect = (selectedKey) => {
    const selectedRole = roles.find((role) => String(role.id) === selectedKey);

    if (selectedRole) {
      setFormData({
        ...formData,
        role: selectedRole.id
      });
    }
  };

  return (
    <div className="pt-1 w-full">
     
      <Autocomplete
        className="w-full"
        defaultItems={roles}
        placeholder="Selecciona un rol"
        size="sm"
        selectedKey={formData.role}
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

export default SelectRoles;
