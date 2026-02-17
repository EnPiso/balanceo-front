import { Input } from '@nextui-org/react'
import React, { useState } from 'react'
import { FaBorderAll, FaLayerGroup, FaPlus } from 'react-icons/fa'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { useRecoilState } from 'recoil'
import { newManualObj } from '../../../infraestructure/states/operation_master_state'
import { useEffect } from 'react'

const InputOrderManual = () => {
  const [order, setOrder] = useState("");

  const [newManual, setNewManual] = useRecoilState(newManualObj);

  useEffect(() => {
    if (newManual && newManual.order) {
      setOrder(newManual.order);
    }
  }, []);

  const handleOrderChange = (e) => {
    const newOrder = e.target.value;
    setOrder(newOrder);

    // Actualizar el estado global de newManual
    setNewManual((prevState) => ({
      ...prevState,
      order: newOrder,
    }));
  };

 

  return (
    <div>
      <Input
        size="lg"
        value={order}
        onChange={handleOrderChange} // Manejar el cambio de entrada
        variant="bordered"
        placeholder="Orden de producción"
        className="w-full md:w-64 bg-white rounded-full"
        endContent={
            <FaLayerGroup className="text-secondary_two" /> 
        }
      />
    </div>
  );
};

export default InputOrderManual