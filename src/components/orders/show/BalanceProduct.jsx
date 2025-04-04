import React, {useState,useEffect} from 'react'
import {Button, Spinner} from "@nextui-org/react";
import {FaCalendar, FaDeleteLeft, FaFolderClosed, FaX} from "react-icons/fa6";
import {useRecoilState} from "recoil";
import {orderObjBalancing, showOrderObj} from "../../../infraestructure/states/order_states.js";
import {fetchGetData, postData} from "../../../infraestructure/call_api/crud.js";
import {urlMain} from "../../../infraestructure/data/const.js";
import {detailOperOperations} from "../../../infraestructure/states/states_balancing.js";
import {assignColorsToArray} from "../../../ui/utils.js";
import {selectProdPlant, selectProdPlantOriginal} from "../../../infraestructure/states/opers_states.js";
import { goToBalance } from '../../../infraestructure/states/operation_master_state.js';
import { useTime } from 'framer-motion';
import MyCustomButton from '../../../ui/MyCustomButton.jsx';
import toast from 'react-hot-toast';
import { FaDoorClosed, FaNotEqual } from 'react-icons/fa';
import { samplingsCircleObj } from '../../../infraestructure/states/states_mobile.js';

const BalanceProduct = ({product}) => {
  const [showOrder, setShowOrder] = useRecoilState(showOrderObj);
  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);
  const [detailOperOpera, setDetailOperOpera] = useRecoilState(detailOperOperations);
  const [prodPlant, setProdPlant] = useRecoilState(selectProdPlant)
  const [prodPlantOriginal, setProdPlantOriginal] = useRecoilState(selectProdPlantOriginal)

  const [isLoading, setIsLoading] = useState(false);


  const [goToBalanceObj, setBoToBalanceObj] = useRecoilState(goToBalance)

  const [samplingsGlobal, setSamplingsGlobal] = useRecoilState(samplingsCircleObj)
  

  useEffect(()=> {
    if(goToBalanceObj){
      const productObj = goToBalanceObj.product
      if( productObj.id === product.product.id){
      handleBalancing(product)
      setTimeout(()=> {
        setBoToBalanceObj(null)
      }, 1000)

      }
    } 
  }, [goToBalanceObj])
      


  const handleBalancing = (product) => {

    setIsLoading(true)
    // balancings/show_balance

    const order_id = showOrder.order.id
    const product_id =  product.product.id
    const prod = product
    const getData = async () => {
      try {
        //setLoading(true);
        const result = await fetchGetData(`${urlMain}/balancings/show_balance?order_id=${order_id}&product_id=${product_id}`);

        const data = {
          product: prod.product,
          total_sam: result.total_sam,
          operations: result.sorted_operations,
          balancing_id: result.balancing_id,
          balancing: result.balancing
        }

        

        const detail = assignColorsToArray(result.details_data)

        setDetailOperOpera(detail)
        setObjBalancing(data)
        
        if(result.data_plant){
          const dataPlant = {
            plant: {
              name: result.data_plant.production_plant.name,
              id: result.data_plant.production_plant.id
            },
            module: result.data_plant.production_module
          }
          setProdPlantOriginal(dataPlant)
        }
        
        if(result.samplings_cycles){
          setSamplingsGlobal(result.samplings_cycles)
        }
        

      } catch (error) {
        console.error('Error al obtener los datos:', error);

      } finally {
      setIsLoading(false);
      }
    };

    getData();


     //

  }

  return (
    <>
    
      {
        isLoading ? <Spinner color={"default"} size={"lg"}/> : (
          <>
          <div className="block lg:hidden">
            <MyCustomButton
                icon={
                  product.product.has_opers_balancing ? 
                    <FaCalendar className=" mt-1 mr-3 "/> : 
                    <FaX className=" mt-1 mr-3 text-red-500" />
                }
                title={ 
                  <div>
                    {product.product.has_opers_balancing && "Balancear"}
                     
                    <span className="uppercase">
                      {product.product.name}
                    </span> 
                    <span className="font-bold"> 
                      {product.product.reference} 
                    </span>
                  </div>
                }
                handleClick={()=> {
                  product.product.has_opers_balancing ?
                    handleBalancing(product) :
                    toast.error('No hay balanceo disponible')
                }}
                value={product}
                bgButton={product.product.has_opers_balancing ? "bg-zinc-800" : "bg-zinc-100"}
                textButton={product.product.has_opers_balancing ? "text-secondary_two" : "text-zinc-800"}
              />
          </div>
          <div className="hidden lg:block">
            <MyCustomButton
                icon={<FaCalendar className=" mt-1 mr-3 "/>}
                title={ 
                  <div>
                    Balancear {" "}
                    <span className="uppercase">
                      {product.product.name}
                    </span> 
                    <span className="font-bold"> 
                      {product.product.reference} 
                    </span>
                  </div>
                }
                handleClick={()=> handleBalancing(product)}
                value={product}
                bgButton={"bg-zinc-800"}
                textButton={"text-secondary_two"}
              />
          </div>
            
          </>
          
        )
      }

            
    </>
  )
}
export default BalanceProduct
