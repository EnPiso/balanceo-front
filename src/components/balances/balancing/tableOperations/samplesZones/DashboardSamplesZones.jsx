import React,{useState} from 'react'
import { useRecoilState } from 'recoil'
import { zoneOperSampleObj, zonesSamplesList } from '../../../../../infraestructure/states/states_samples_zones'
import WatchChrono from '../../../../samples/WatchChrono'
import { FaTrash } from 'react-icons/fa6'
import SamplesGlobalSave from '../samplesByOper/SamplesGlobalSave'
import SamplesZonesSteps from './SamplesZonesSteps'
import SamplesZonesList from './SamplesZonesList'
import SamplesZonesDetails from './SamplesZonesDetails'
import SamplesZonesFooter from './SamplesZonesFooter'
import { Accordion, AccordionItem } from '@nextui-org/react'

const DashboardSamplesZones = () => {
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [zoneOperSample, setZoneOperSample] = useRecoilState(zoneOperSampleObj)
  const [zonesSamples, setZonesSamples] = useRecoilState(zonesSamplesList)

  const [expandedKeys, setExpandedKeys] = useState(new Set([""])); // Estado para controlar el accordion
  // Función para manejar la expansión del accordion
   const handleAccordionChange = (keys) => {
     setExpandedKeys(keys);
   };
 

  const handleSaveTime = (time, setIsLoading) => {
    const newSteps = [...steps];
    newSteps[currentStep] = time;
    setSteps(newSteps);
    setCurrentStep(currentStep + 1);
    setIsLoading(false)
  };

  const handleDelete = (indexToDelete) => {
    const newSteps = steps.filter((_, index) => index !== indexToDelete);
    setSteps(newSteps);
    setCurrentStep(newSteps.length);
    // if (isEditing && currentStep === indexToDelete) {
    //   handleBackEdit();
    // } 
  };

  const isAccordionOpen = expandedKeys.has("1");


  return (
    <div>
      <h1 className="text-zinc-800 font-bold uppercase">
        {zoneOperSample?.operator.name}
      </h1>
      <div className="mt-4">
        <WatchChrono
            onSaveTime={handleSaveTime}
          />
      </div>
      <div className="py-6">
        {steps.map((time, index) => (
          <div
              key={index}
              className={`flex justify-between items-center p-2 border rounded mb-2`}
          >
            <span className={`font-bold text-zinc-800`}>
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

      <div className="py-2">
        <SamplesZonesSteps
          isLoading={isLoading}
          steps={steps}
          setSteps={setSteps}
          setCurrentStep={setCurrentStep}
        />
      </div>

      <Accordion
        selectedKeys={expandedKeys}
        onSelectionChange={handleAccordionChange}
      >
        <AccordionItem
          key="1"
          aria-label={isAccordionOpen ? "Menos detalles de la zona" : "Más detalles de la zona"}
          subtitle={isAccordionOpen ? "Click para colapsar" : "Click para expandir"}
          title={`${isAccordionOpen ? "Ocultar" : "Ver"} detalles de la zona`}
        >
          <SamplesZonesDetails/>
        </AccordionItem>
      </Accordion>

      <SamplesZonesList/>
      
      </div>
      {
        zonesSamples.length >= 1 &&
          <SamplesZonesFooter/>
      }
      
    </div>
  )
}

export default DashboardSamplesZones