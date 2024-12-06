import React, { useEffect, useState } from "react";
import CloneCustom from "../CloneCustom.jsx";
import OperationListDrag from "./OperationListDrag.jsx";
import { useRecoilState } from "recoil";
import {orderObjBalancing, showOrderObj} from "../../../../../infraestructure/states/order_states.js";
import SearchCustom from "../SearchCustom.jsx";
import {FaArrowRightLong} from "react-icons/fa6";
import {FaArrowAltCircleRight, FaArrowCircleRight, FaSave} from "react-icons/fa";
import CustomButton from "../../../../../ui/CustomButton.jsx";
import {checkOpersPosition, selectOpers} from "../../../../../infraestructure/states/opers_states.js";
import {balancingData, detailOperOperations} from "../../../../../infraestructure/states/states_balancing.js";
import {postData} from "../../../../../infraestructure/call_api/crud.js";
import {urlMain} from "../../../../../infraestructure/data/const.js";
import {assignColorsToArray} from "../../../../../ui/utils.js";
import {samSumOperation} from "../../../../../infraestructure/states/operation_states.js";
import toast from "react-hot-toast";
import {toastMessageCustom} from "../../../../../infraestructure/data/toastMessage.js";
import {Spinner} from "@nextui-org/react";

const DragAndDropApp = ({onClose}) => {
  const [operations, setOperations] = useState([]); // Operaciones de la segunda tabla
  const [operationsCreate, setOperationsCreate] = useState([]); // Operaciones de la segunda tabla


  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);

  const [selectedOperDetails, setSelectedOperDetails] = useRecoilState(checkOpersPosition); // Array con los detalles de cada selección

  const [balancing, setBalancing] = useRecoilState(balancingData);

  const [showOrder, setShowOrder] = useRecoilState(showOrderObj);

  const [opersSelect, setOpersSelect] = useRecoilState(selectOpers)

  const [samSum, setSamSum] = useRecoilState(samSumOperation);

  const [detailOperOpera, setDetailOperOpera] = useRecoilState(detailOperOperations);


  const [BalancingTemporal, setBalancingTemporal] = useState([]);
  const [sumSamTemporal, setSumSamTemporal] = useState(0);

  const [isLoading, setIsLoading] = useState(false);



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

  useEffect(() => {
    console.log(selectedOperDetails)

  }, [selectedOperDetails]);

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

    const data = {
      operations_balancings: {
        operations: JSON.stringify(operations),
        operations_create: JSON.stringify(operationsCreate),
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
        //console.log(objBalancing)

        setSamSum(total_sam)

        // console.log(objBalancing)
        // console.log(balancing)
        // console.log(samSum)
        // console.log(detailOperOpera)

        const detail = assignColorsToArray(details)

        setDetailOperOpera(detail)

        setObjBalancing((prevState) => ({
          ...prevState, // Copia el objeto actual
          operations: updated_operations, // Copia el array actual y agrega el nuevo elemento
          total_sam: total_sam
        }));

        onClose()
        toast.success(toastMessageCustom.operationsDragCloneUpdate)
        setIsLoading(false)
      } catch (error) {
        console.error('Error setting data', error);
      }
    };
    postDataClone(data);


  }








  return (
    <div>
      <div className="py-1">
        <SearchCustom />
      </div>
      <div className="flex space-x-6">
        <div className="w-1/2">
          <h2 className="text-xl uppercase text-right font-bold">Tabla de Clonación </h2>
          <CloneCustom addOperation={addOperation} />
        </div>
        <div className="w-1/2">
          <h2 className="text-xl uppercase text-right font-bold">Tabla de Operaciones</h2>
          <OperationListDrag
            operationsCreate={operationsCreate}
            setOperationsCreate={setOperationsCreate}
            setOperations={setOperations}
            operations={operations} />
        </div>
      </div>
      <div className="py-3 px-1 flex justify-end">

        {
          isLoading ? <Spinner
            color="default"
            size="lg" /> : (
              <>
                {
                  operationsCreate.length >= 1 && (
                    <CustomButton
                      color="default"
                      variant="bordered"
                      startContent={<FaSave color="green"/>}
                      onClick={handleSave}
                      title="Actualizar operaciones"
                    />
                  )
                }

              </>
          )
        }

      </div>
    </div>
  );
};

export default DragAndDropApp;
