import React, { useState } from 'react';
import WatchChrono from '../../../../samples/WatchChrono';
import { FaTrash } from 'react-icons/fa6';

import SamplesGlobalDetail from './SamplesGlobalDetail';
import SamplesGlobalSave from './SamplesGlobalSave';
import SamplesGlobalList from './SamplesGlobalList';
import { Accordion, AccordionItem } from '@nextui-org/react';
import { useRecoilState } from 'recoil';
import { samplingsCircleList } from '../../../../../infraestructure/states/states_mobile';

const SamplesGlobalChrono = () => {
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedKeys, setExpandedKeys] = useState(new Set([""])); // Estado para controlar el accordion

  const [samplingsCircle, setSamplingsCircle] = useRecoilState(samplingsCircleList);

  // Función para manejar la expansión del accordion
  const handleAccordionChange = (keys) => {
    setExpandedKeys(keys);
  };

  // Función para guardar el tiempo del paso actual
  const handleSaveTime = (time, setIsLoading) => {
    const newSteps = [...steps];
    newSteps[currentStep] = time;
    setSteps(newSteps);
    
    if (isEditing) {
      handleBackEdit()
    } else {
      setCurrentStep(currentStep + 1);
    }
    setIsLoading(false)
  };

  const handleBackEdit = () => {
    setIsEditing(false);
    setCurrentStep(steps.length);
  }

  const handleDelete = (indexToDelete) => {
    const newSteps = steps.filter((_, index) => index !== indexToDelete);
    setSteps(newSteps);
    setCurrentStep(newSteps.length);
    if (isEditing && currentStep === indexToDelete) {
      handleBackEdit();
    } 
  };
  
  const isAccordionOpen = expandedKeys.has("1");

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      
      <div className="py-2 mb-2">
        <WatchChrono 
          key={JSON.stringify(samplingsCircle)}
          onSaveTime={handleSaveTime} />
      </div>
      
      {steps.map((time, index) => (
        <div
            key={index}
            className={`flex justify-between items-center p-2 border rounded mb-2`}
        >
          <span className={`${
            isEditing && index === currentStep ? 'text-green-600 font-bold' : ''
          }`}>
              {index + 1} - {time}               
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleDelete(index)}
              className="flex items-center text-red-500 ml-2">
              <FaTrash size={20}/>
            </button>
          </div>
        </div>
      ))}
      
      <SamplesGlobalSave
        isLoading={isLoading}
        steps={steps}
        setSteps={setSteps}
        setCurrentStep={setCurrentStep}
      />
      
      <Accordion 
        selectedKeys={expandedKeys}
        onSelectionChange={handleAccordionChange}
      >
        <AccordionItem
          key="1"
          aria-label={isAccordionOpen ? "Menos Detalles del producto" : "Más Detalles del producto"}
          subtitle={isAccordionOpen ? "Click para colapsar" : "Click para expandir"}
          title={`${isAccordionOpen ? "Ocultar" : "Ver"} detalles del producto `}
        >
          <SamplesGlobalDetail/>
        </AccordionItem>
      </Accordion>
      <SamplesGlobalList/>
      
    </div>
  );
};

export default SamplesGlobalChrono;