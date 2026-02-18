import React, { useEffect, useState } from "react";
import CloneCustom from "../CloneCustom.jsx";
import OperationListDrag from "./OperationListDrag.jsx";
import { useRecoilState } from "recoil";
import {orderObjBalancing, showOrderObj} from "../../../../../infraestructure/states/order_states.js";
import SearchCustom from "../SearchCustom.jsx";
import {FaArrowDownUpAcrossLine, FaArrowRightLong} from "react-icons/fa6";
import {FaArrowAltCircleRight, FaArrowCircleRight, FaSave} from "react-icons/fa";
import CustomButton from "../../../../../ui/CustomButton.jsx";
import MyCustomButton from "../../../../../ui/MyCustomButton.jsx"
import {checkOpersPosition, selectOpers} from "../../../../../infraestructure/states/opers_states.js";
import {balancingData, detailOperOperations} from "../../../../../infraestructure/states/states_balancing.js";
import {postData} from "../../../../../infraestructure/call_api/crud.js";
import {urlMain} from "../../../../../infraestructure/data/const.js";
import {assignColorsToArray} from "../../../../../ui/utils.js";
import {samSumOperation, searchOperations} from "../../../../../infraestructure/states/operation_states.js";
import toast from "react-hot-toast";
import {toastMessageCustom} from "../../../../../infraestructure/data/toastMessage.js";
import {Spinner, Tooltip} from "@nextui-org/react";
import {dataObjClone, isOperationClone} from "../../../../../infraestructure/states/states_navigation.js";
import ProductCardCustom from "../ProductCardCustom.jsx";
import FormOperationCustom from "../FormOperationCustom.jsx";
import {imageTableBalancing} from "../../../../../infraestructure/states/states_product.js";
import {nameImageDateNow} from "../../../../../infraestructure/utils/imagesFormat.js";

const DragAndDropApp = ({onClose}) => {
  const [operations, setOperations] = useState([]); // Operaciones de la segunda tabla
  const [operationsCreate, setOperationsCreate] = useState([]); // Operaciones de la segunda tabla
  const [query, setQuery] = useState(""); // Estado para el valor del input

  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);

  const [selectedOperDetails, setSelectedOperDetails] = useRecoilState(checkOpersPosition); // Array con los detalles de cada selección

  const [balancing, setBalancing] = useRecoilState(balancingData);

  const [showOrder, setShowOrder] = useRecoilState(showOrderObj);

  const [opersSelect, setOpersSelect] = useRecoilState(selectOpers)

  const [samSum, setSamSum] = useRecoilState(samSumOperation);

  const [detailOperOpera, setDetailOperOpera] = useRecoilState(detailOperOperations);

  const [operationCloneIs, setOperationCloneIs] = useRecoilState(isOperationClone);


  const [BalancingTemporal, setBalancingTemporal] = useState([]);
  const [sumSamTemporal, setSumSamTemporal] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const [cloneOperations, setCloneOperations] = useRecoilState(searchOperations);

  const [showFormNew, setShowFormNew] = useState(false);
  const [dataObj, setDataObjClone] = useRecoilState(dataObjClone);

  const [imageTable, setImageTable] = useRecoilState(imageTableBalancing)

  

  useEffect(() => {
    dataObj && setShowFormNew(true)
  }, [dataObj]);


  useEffect(()=> {
    setBalancingTemporal(balancing)
    setSumSamTemporal(samSum)
  },[balancing])


  // Inicializar operaciones desde `objBalancing`
  useEffect(() => {
    if (objBalancing?.operations) {
      setOperations(
        objBalancing.operations.map((op, index) => ({
          ...op,
          operation_position: index + 1,
        }))
      );
    }
  }, [objBalancing]);


  // Función para agregar nuevas operaciones desde `CloneCustom`
  const addOperation = (newOperation) => {
    setOperations((prevOperations) => {
      const updatedOperations = [...prevOperations, newOperation];
      return updatedOperations.map((op, idx) => ({
        ...op,
        operation_position: idx + 1, // Actualiza las posiciones
      }));
    });
  };

  const handleSave =  () => {

    

    const updateOperationsCreate = operationsCreate.map((operation)=> {
      const replacement = operations.find(obj => obj.id === operation.id);
      return replacement ? replacement : operation; 
    })
    const data = {
      operations_balancings: {
        operations: JSON.stringify(operations),
        operations_create: JSON.stringify(updateOperationsCreate),
        balancing_id: objBalancing.balancing_id,
        selected_oper_details: JSON.stringify(selectedOperDetails),
        gol_hour: balancing.gol_hour,
        product_id: objBalancing.product.id,
        order_id: showOrder.order.id
      }
    }
   
    
    
    const postDataClone = async (data) => {
      setIsLoading(true)
      try {
        const result = await postData(urlMain + "/operations_balancings/clone_list", data)
        //const detail = assignColorsToArray(result.detail_oper_operations)
        // const detail = assignColorsToArray(result.data_detail_end)
        const updated_operations = result.updated_operations
        const details = result.details
        const total_sam = result.total_sam
        setSamSum(total_sam)

        const detail = assignColorsToArray(details)

        setDetailOperOpera(detail)

        setObjBalancing((prevState) => ({
          ...prevState, // Copia el objeto actual
          operations: updated_operations, // Copia el array actual y agrega el nuevo elemento
          total_sam: total_sam
        }));

        // onClose()
        toast.success(toastMessageCustom.operationsDragCloneUpdate)
        setIsLoading(false)
        setShowFormNew(false)
        setCloneOperations([])
        setOperationsCreate([])
        setOperationCloneIs(false)
        setQuery("")
        setTimeout(()=> {
          setImageTable(nameImageDateNow)
        },1000)
      } catch (error) {
        console.error('Error setting data', error);
      }
    };
    postDataClone(data);


  }

  return (
    <div>

      <div>

        <div>
          <div className="flex justify-between items-center">
            <SearchCustom
              showFormNew={showFormNew}
              setShowFormNew={setShowFormNew}
              query={query}
              setQuery={setQuery}
            />
            
            {
              cloneOperations.length >= 1 &&
                <div>
                  <Tooltip
                    content="mueve los elementos de esta lista para la otra lista"
                    showArrow={true}>
                    <FaArrowDownUpAcrossLine size={28} className="text-secondary_two"/>
                  </Tooltip>
                </div>

            }

          </div>

          {
            showFormNew && 
              <FormOperationCustom/>
          }


          {
            cloneOperations.length >= 1 && 
              <CloneCustom 
                cloneOperations={cloneOperations}
                setCloneOperations={setCloneOperations}
                addOperation={addOperation} />
          }


          <div className="py-3 px-1 flex justify-end">

            {
              isLoading ? <Spinner
                color="default"
                size="lg" /> : (
                <>
                  {
                    operationsCreate.length >= 1 && (
                      <div className="sticky top-0 z-10">
                        <MyCustomButton
                          icon={<FaSave className=" mt-1 mr-3 "/>}
                          title={`Actualizar operaciones de ${objBalancing && objBalancing.operations.length} a ${operations.length}`}
                          handleClick={handleSave}
                          value={`Actualizar operaciones de ${objBalancing && objBalancing.operations.length} a ${operations.length}`}
                          bgButton={"bg-zinc-800"}
                          textButton={"text-secondary_two"}
                        />
                        
                      </div>

                    )
                  }
                  {

                  }
                </>
              )
            }

          </div>


          {
            operationCloneIs ?  
              <OperationListDrag
                operationsCreate={operationsCreate}
                setOperationsCreate={setOperationsCreate}
                setOperations={setOperations}
                operations={operations} /> : 
              <ProductCardCustom/>
          }


        </div>
      </div>

    </div>
  );
};

export default DragAndDropApp;
