import React,{useState} from 'react'
import { FaSave } from 'react-icons/fa'
import CustomButton from '../../ui/CustomButton'
import { postData } from '../../infraestructure/call_api/crud'
import { urlMain } from '../../infraestructure/data/const'
import { useRecoilState } from 'recoil'
import { newSamples, stepsSamples } from '../../infraestructure/states/states_samples'
import toast from 'react-hot-toast'
import { CircularProgress, Tooltip } from '@nextui-org/react'

const SaveStep = ({steps, Obj}) => {
  const [samples, setSamples] = useRecoilState(stepsSamples)
  const [isNewSamples, setIsNewSamples] = useRecoilState(newSamples);
  
  const [isLoading, setIsLoading] = useState(false);
  

  const handleSaveTime = () => {
   
    const data = {
      operation_balancing_id: Obj.operation_balancing_id,
      oper_id: Obj.oper_id,
      steps: JSON.stringify(steps)
    }


    const postDataSampling = async (data) => {
      setIsLoading(true)
      try {
          const result = await postData(urlMain + "samplings/create_multiple", data)
          console.log(result)
          setSamples([...samples, ...result.samples])
          setIsNewSamples(false)
          toast.success("Las muestras se han guardado correctamente")
          
      } catch (error) {
          console.error('Error setting data', error);
      } finally{
        setIsLoading(false)
      }
  };

  postDataSampling(data);

  }

  return (
    <div>
      {
        steps.length > 0 && (
          <>

          {
            isLoading ? (
              <>
                <div className="">
                  <CircularProgress aria-label="Loading..." color="success" size="lg"/>
                </div>
              </>
            ) : (
              <Tooltip content={`Guardar ${steps.length > 1 ? steps.length + " muestras" : "Una muestra"}`} placement='bottom'>
                <span>
                  <CustomButton
                        color="default"
                        variant="bordered"
                        startContent={<FaSave color="green"/>}
                        onClick={handleSaveTime} // Guarda los datos
                        title={`Guardar ${steps.length > 1 ? steps.length + " muestras" : "Una muestra"}`}
                        
                      />
                </span>
              </Tooltip>
            )
          }

          
            
          </>
        )
      }
    </div>
  )
}

export default SaveStep