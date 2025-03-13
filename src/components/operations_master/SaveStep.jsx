import React,{useState} from 'react'
import { FaSave } from 'react-icons/fa'
import CustomButton from '../../ui/CustomButton'
import { postData } from '../../infraestructure/call_api/crud'
import { urlMain } from '../../infraestructure/data/const'
import { useRecoilState } from 'recoil'
import { newSamples, openOperaClock, stepsSamples } from '../../infraestructure/states/states_samples'
import toast from 'react-hot-toast'
import { CircularProgress, Tooltip } from '@nextui-org/react'
import { detailOperOperations } from '../../infraestructure/states/states_balancing'

const SaveStep = ({steps, Obj, setIsOpen, itemAll}) => {
  const [samples, setSamples] = useRecoilState(stepsSamples)
  const [isNewSamples, setIsNewSamples] = useRecoilState(newSamples);
  
  const [isLoading, setIsLoading] = useState(false);
  
  const [detailOperOpera, setDetailOperOpera] = useRecoilState(detailOperOperations);
  
  const [operaClock, setOperaClock] = useRecoilState(openOperaClock)
  

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
          console.log(result, detailOperOpera, data.operation_balancing_id)
          setSamples([...samples, ...result.samples])
          

          // ID que deseas actualizar
   
          
          const newSamplingsCount = result.samples.length;
          // console.log(operaClock)
          const detail_id = operaClock.obj.detail_id
          
          // Actualizar el `samplings_count` en el objeto correspondiente
          const updatedDetail = detailOperOpera.map(item => 
            item.detail.id === detail_id
              ? { ...item, detail: { ...item.detail, samplings_count: item.detail.samplings_count + newSamplingsCount } }
              : item
          );
          
        
          setDetailOperOpera(updatedDetail)
          setIsNewSamples(false)
          //setIsOpen(true)
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