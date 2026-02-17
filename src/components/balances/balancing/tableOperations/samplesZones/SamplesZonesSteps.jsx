import { CircularProgress, Tooltip } from '@nextui-org/react'
import React from 'react'
import { FaSave } from 'react-icons/fa'
import { zoneOperSampleObj, zonesSamplesList } from '../../../../../infraestructure/states/states_samples_zones'
import { useRecoilState } from 'recoil'
import { postData, postDataToken } from '../../../../../infraestructure/call_api/crud'
import { urlMain } from '../../../../../infraestructure/data/const'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { tokenMemory } from '../../../../../infraestructure/states/states_views'

const SamplesZonesSteps = ({steps, setSteps, setCurrentStep}) => {
  const [zoneOperSample, setZoneOperSample] = useRecoilState(zoneOperSampleObj)
  const [zonesSamples, setZonesSamples] = useRecoilState(zonesSamplesList)
  const [isLoading, setIsLoading] = useState(false)

  const [token, setToken] = useRecoilState(tokenMemory);

  const handleSave = () => {
    const opers_balancing_id = zoneOperSample?.detailObj.detail.opers_balancing_id
    

    const data = {
      opers_balancing_id: opers_balancing_id,
      steps: JSON.stringify(steps)
    }

    const postDataSampleZone = async () => {
      setIsLoading(true)
      try {
        const result = await postDataToken(urlMain + "opers_zones/create_samples", data, token);
        
        const zonesUpdate = [...zonesSamples, ...result]
        setZonesSamples(zonesUpdate)
        setSteps([])
        setCurrentStep(0)
        toast.success("Se han guardado las muestras de tiempo exitosamente")
      } catch (error) {
        console.error("Error al guardar datos", error);
      } finally { 
        setIsLoading(false)
      }
    };

    postDataSampleZone();
  }

  return (
    <div>
      <div>  
        {
          isLoading ? (
            <>
              <div className="flex justify-end">
                <CircularProgress aria-label="Loading..." color="success" size="lg"/>
              </div>
            </>
          ) : (
            <div className='flex justify-end'>
              {
                steps.length >= 1 && 
                  <Tooltip content={`Guardar ${steps.length > 1 ? steps.length + " muestras" : "Una muestra"}`} placement='bottom'>
                    <button 
                      onClick={handleSave}>
                      <FaSave className="text-secondary_two" size={35}/>
                    </button>
                  
                  </Tooltip>
              }
              
            </div>
          )
        }
      </div>
    </div>
  )
}

export default SamplesZonesSteps