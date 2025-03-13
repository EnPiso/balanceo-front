import React, { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { FaClock } from 'react-icons/fa6'
import { useRecoilState } from 'recoil'
import { isSampleObj, operationsSamples } from '../../../../../infraestructure/states/states_samples'
import ObjOperationSample from './ObjOperationSample'

const ListOperationsSamples = () => {


  const [isSample, setIsSample] = useRecoilState(isSampleObj)

  const [samplesClock, setSamplesClock] = useState([])
  

  const [samplesOperations, setSamplesOperations] = useRecoilState(operationsSamples)
  
  useEffect(()=> {
    console.log(samplesOperations)
    debugger
  }, [])

  const handleSample = (sample) => {
    setIsSample(sample)
    console.log(sample)
  }


  return (

    <>
 
      {
        samplesOperations.map((sampleOperation, i)=> {
            return  (
              <ObjOperationSample
                samplesClock={samplesClock}
                setSamplesClock={setSamplesClock}
                isSample={isSample}
                setIsSample={setIsSample}
                sampleOperation={sampleOperation}
                key={i}
              />
            )
          })
      }
    </>

    

  )
}

export default ListOperationsSamples