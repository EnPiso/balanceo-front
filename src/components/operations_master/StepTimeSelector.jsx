import React, { useState } from 'react';
import { FaBackward, FaForward, FaCheck, FaEdit, FaBackspace, FaSave, FaTrash } from 'react-icons/fa';
import { Button, Card } from '@nextui-org/react';
import WatchChrono from '../samples/WatchChrono';
import CustomButton from '../../ui/CustomButton';
import { useRecoilState } from 'recoil';
import { stepsSamples } from '../../infraestructure/states/states_samples';
import SaveStep from './SaveStep';

const   StepTimeSelector = ({Obj}) => {
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Función para guardar el tiempo del paso actual
  const handleSaveTime = (time, setIsLoading) => {
    const newSteps = [...steps];
    newSteps[currentStep] = time;
    setSteps(newSteps);
    
    if (isEditing) {
      // Si estamos editando, terminamos el modo edición y avanzamos al siguiente paso nuevo
      handleBackEdit()
    } else {
      // Si es un nuevo paso, avanzamos al siguiente
      setCurrentStep(currentStep + 1);
    }
    setIsLoading(false)
  };

  const handleBackEdit = () => {
    setIsEditing(false);
    setCurrentStep(steps.length);
  }

  // Función para eliminar un paso
  const handleDelete = (indexToDelete) => {
    // Filtrar el array para eliminar el paso seleccionado
    const newSteps = steps.filter((_, index) => index !== indexToDelete);
    setSteps(newSteps);
    
    setCurrentStep(newSteps.length );
    // Si estábamos editando este paso, cancelar la edición
    if (isEditing && currentStep === indexToDelete) {
      handleBackEdit();
    } 
  };

  // Función para navegar entre pasos
  const navigateStep = (direction) => {
    const newStep = currentStep + direction;
    if (newStep >= 0 && newStep <= steps.length) {
      setCurrentStep(newStep);
    }
  };

  // Función para finalizar el proceso
  const handleComplete = () => {
    setIsComplete(true);
  };

  // Función para editar un paso específico
  const handleEdit = (index) => {
    setCurrentStep(index);
    setIsEditing(true);
    setIsComplete(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <Card className="p-6">
        <div className="mb-4 text-center">
          <h2 className="text-xl font-bold">
            {isComplete 
               ? 'Resumen de Tiempos' 
               : isEditing 
                 ? `Editando muestra ${currentStep + 1}` 
                 : `Nueva muestra ${currentStep + 1}`
            }
          </h2>
        </div>
        
        <WatchChrono onSaveTime={handleSaveTime} />
        
        <div className="space-y-4 mt-4">
          {steps.map((time, index) => (
            <div
               key={index}
               className={`flex justify-between items-center p-2 border rounded`}
            >
              <span className={`${
                isEditing && index === currentStep ? 'text-green-600 font-bold' : ''
              }`}>
                 {index + 1} - {time}               
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(index)}
                  className="flex items-center"
                  disabled={isEditing && index === currentStep}
                >
                  <FaEdit size={23}/>
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="flex items-center text-red-500 ml-2"
                  title="Eliminar muestra"
                >
                  <FaTrash size={20}/>
                </button>
              </div>
            </div>
          ))}

          <div className="mt-4 flex justify-end">
            {
              isEditing ? (
                <button onClick={handleBackEdit}>
                  <span className="ml-2 text-red-600 font-bold">
                    Cancelar edición
                  </span>
                </button> ) : (
                  <SaveStep steps={steps} Obj={Obj} />
                )
            }
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StepTimeSelector;