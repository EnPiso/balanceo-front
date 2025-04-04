import { CircularProgress, Tooltip } from '@nextui-org/react'
import React from 'react'
import { FaSave } from 'react-icons/fa'
import { useRecoilState } from 'recoil'
import { orderObjBalancing } from '../../../../../infraestructure/states/order_states'
import { postData } from '../../../../../infraestructure/call_api/crud'
import { urlMain } from '../../../../../infraestructure/data/const'
import { clockGlobalModal, samplingsCircleList, samplingsCircleObj } from '../../../../../infraestructure/states/states_mobile'
import toast from 'react-hot-toast'
import { samplesGlobalShared } from '../../../../../infraestructure/utils/samplesGlobal'
import { selectOpers } from '../../../../../infraestructure/states/opers_states'

const SamplesGlobalSave = ({isLoading,steps,setSteps,setCurrentStep}) => {

  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);
  
  const [samplingsCircle, setSamplingsCircle] = useRecoilState(samplingsCircleList);

  const [opersSelect] = useRecoilState(selectOpers);

  const [samplingsGlobal, setSamplingsGlobal] = useRecoilState(samplingsCircleObj)
  

  const handleSave = () => {
    const data = {
      steps: steps,
      balancing_id: objBalancing.balancing_id
    }
    
    const postDataSamplings = async () => {
          try {
            const result = await postData(urlMain + "samplings_cycles", data);
            const updateSamplings = [...samplingsCircle, ...result]
            setSamplingsCircle(updateSamplings);
            
            const objUpdate = samplesGlobalShared(updateSamplings, opersSelect, objBalancing.total_sam)
            
            setSamplingsGlobal(objUpdate)
            setSteps([])
            setCurrentStep(0)
            if(result.length > 1){
              toast.success("Se han creado exitosamente las muestras de tiempo")
            }else{
              toast.success("Se ha creado exitosamente la muestra de tiempo")
            }
          } catch (error) {
            console.error("Error al guardar datos", error);
          }
        };
    
    postDataSamplings();
  }

  return (
    <div>  
      {
            isLoading ? (
              <>
                <div className="">
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
  )
}

export default SamplesGlobalSave