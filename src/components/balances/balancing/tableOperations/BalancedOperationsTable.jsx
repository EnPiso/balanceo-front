// components/BalancedOperationsTable.jsx
import React, {useEffect, useState, useRef} from 'react';
import { useRecoilState } from "recoil";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import {
  balancingData,
  detailOperOperations,
  listRedistributions,
  zonesOpers
} from "../../../../infraestructure/states/states_balancing.js";
import {checkOpersPosition, selectOpers} from "../../../../infraestructure/states/opers_states.js";
import {balanceOperations} from "../../../../infraestructure/utils/balanceOperations.js";
import TableHeaderOperations from "./TableHeaderOperations.jsx";
import TableRowOperations from "./TableRowOperations.jsx";
import TableFooterOperations from "./TableFooterOperations.jsx";
import OperatorDetailsOperations from "./OperatorDetailsOperations.jsx";
import {allOperationsProduct} from "../../../../infraestructure/states/operation_states.js";
import {postData, updateData} from "../../../../infraestructure/call_api/crud.js";
import {urlMain} from "../../../../infraestructure/data/const.js";
import SaveBalance from "../../../orders/show/SaveBalance.jsx";
import toast, { Toaster } from 'react-hot-toast';
import {toastMessageCustom} from "../../../../infraestructure/data/toastMessage.js";
import ModalVideoInput from "./videoOperations/ModalVideoInput.jsx";
import TrDinamycVideo from "./videoOperations/TrDinamycVideo.jsx";
import DraggableVideo from "./videoOperations/DraggableVideo.jsx";
import {assignColorsToArray} from "../../../../ui/utils.js";
import useGenerateZones from "../../../../hooks/balances/useGenerateZones.jsx";
import {
  imageBalancePdf,
  isPDFGenerate,
  orderObjBalancing,
  showOrderObj
} from "../../../../infraestructure/states/order_states.js";
import TableRedistribution from "./TableRedistribution.jsx";
import {FaClock, FaFilePdf} from "react-icons/fa6";
import PdfBalancing from "../PDFBalancing.jsx";
import {useScreenshot} from "use-react-screenshot";
import CommentBalancing from "../CommentBalancing.jsx";
import ImageUrlFormat from './ImageUrlFormat.jsx';
import { videoShow, modalInputAdd } from '../../../../infraestructure/states/states_videos.js';
import { automaticByOper, isOpenModalSample, isOpenModalSampleByOper, openByOper, openOperaClock, operByOper } from '../../../../infraestructure/states/states_samples.js';
import ModalSelectSamples from './samples/ModalSelectSamples.jsx';
import ModalByOrder from './samplesByOper/ModalByOrder.jsx';
import SimpleBalancedOperationsTable from './balancingMobile/SimpleBalancedOperationsTable .jsx';
import { clockGlobalModal, clockZoneByZoneModal, samplingsCircleList, samplingsCircleObj, zonesMobile } from '../../../../infraestructure/states/states_mobile.js';
import ZonesMobileDashboard from './balancingMobile/ZonesMobileDashboard.jsx';
import { ModalRecOutside } from './balancingMobile/ModalRecOutside.jsx';
import FooterCycles from './FooterCycles.jsx';
import { Tooltip } from '@nextui-org/react';
import { FaRegClock, FaUserClock } from 'react-icons/fa';
import SecuentialZoneDash from './balancingMobile/SecuentialZoneDash.jsx';
import { isLoadingTime, isLoadingTimeByZone, timeDataCyclesNum } from '../../../../infraestructure/states/operation_master_state.js';
import { isShowModalZoneSample } from '../../../../infraestructure/states/states_samples_zones.js';
import MachinesBalancing from './machinesBalancing/MachinesBalancing.jsx';



const BalancedOperationsTable = ({ data, samSum, componentPDF, imagePdfRef }) => {
  const componentRef = useRef();


  const [balancing] = useRecoilState(balancingData);
  const [opersSelect] = useRecoilState(selectOpers);
  const [operationsProduct, setOperationsProduct] = useRecoilState(allOperationsProduct)

  const [detailOperOpera, setDetailOperOpera] = useRecoilState(detailOperOperations);


  const { zones, operationMap } = balanceOperations(operationsProduct, opersSelect.size, balancing.gol_hour);

  const [selectedOperDetails, setSelectedOperDetails] = useRecoilState(checkOpersPosition); // Array con los detalles de cada selección

  const [isModalInput,setIsModalInput] = useRecoilState(modalInputAdd)

  const [showVideos, setShowVideos]  = useRecoilState(videoShow)

  const [zonesOpersData, setZonesOpersData] = useRecoilState(zonesOpers); // Array con los detalles de cada selección


  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);

  const [redistributions, setRedistributions] = useRecoilState(listRedistributions)

  const [isPDFMode, setIsPDFMode] = useRecoilState(isPDFGenerate);
  const [showOrder, setShowOrder] = useRecoilState(showOrderObj);

  const [image, takeScreenshot] = useScreenshot (); // Hook para capturar pantalla

  const [imageUrl, setImageUrl] = useRecoilState(imageBalancePdf); // Estado para almacenar la URL de la imagen

  // useGenerateZones({ opersSelect, balancing, zones });

  const [operaClock, setOperaClock] = useRecoilState(openOperaClock)
  const [isModalSample, setIsModalSample] = useRecoilState(isOpenModalSample)
  // isOpenModalSample

  const [zonesOperUpdate,setZonesOperUpdate] = useRecoilState(zonesMobile)


  const [clockGlobal, setClockGlobal]  = useRecoilState(clockGlobalModal)
  const [samplingsGlobal, setSamplingsGlobal] = useRecoilState(samplingsCircleObj)
  const [samplingsCircle, setSamplingsCircle] = useRecoilState(samplingsCircleList);


  const [numTimeDataCycles, setNumTimeDataCycles] = useRecoilState(timeDataCyclesNum)
  const [isLoadingTimeModal, setIsLoadingTimeModal] = useRecoilState(isLoadingTime)
  const [isLoadingByZone, setIsLoadingByZone] = useRecoilState(isLoadingTimeByZone)
  
  
  
  const [zoneByZoneModal, setZoneByZoneModal]  = useRecoilState(clockZoneByZoneModal)
  const [isShowModalZone, setIsShowModalZone] = useRecoilState(isShowModalZoneSample)
  const [openModalSampleByOper, setOpenModalSampleByOper] = useRecoilState(isOpenModalSampleByOper);
  const [isOpenModalByOper, setIsOpenModalByOper] = useRecoilState(openByOper)
    
  const [isComponentsLoaded, setIsComponentsLoaded] = useState(false); // Estado para rastrear si los componentes han cargado
  const [isFinalActionDone, setIsFinalActionDone] = useState(false); // Estado para rastrear si la acción final se ejecutó

  

  // Simula la carga de otros componentes
  useEffect(() => {
    const loadOtherComponents = async () => {
      // Simula la carga de otros componentes con un retraso
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simula 2 segundos de carga
      setIsComponentsLoaded(true); // Indica que los componentes han cargado
    };

    loadOtherComponents();
  }, []);

  // Ejecuta la acción final cuando todos los componentes hayan cargado
  useEffect(() => {
    if (isComponentsLoaded && !isFinalActionDone) {
      
      setIsLoadingTimeModal(true)
      setIsLoadingByZone(true)
    }
  }, [isComponentsLoaded, isFinalActionDone]);

  
  const handleGlobalClock = () => {
    setClockGlobal(!clockGlobal)
  }
  

  // Función centralizada para actualizar zonas**
  const updateZones = (callback) => {
    setZonesOpersData((prevData) => {
      const result = callback(prevData);
      return result; // Solo actualiza si el callback cambia algo
    });
  };

  useEffect(() => {
    const details = zones.map((zone, index) => {
      return zone.map((operation) => {
        const detailObj = detailOperOpera.find(
          (item) => item.oper_id === selectedOperDetails[index]?.id &&
                    item.detail.operations_balancing_id === operation.operation_balancing_id
        );
        const updatedOperation = operationsProduct.find(
          (op) => op.operation_balancing_id === operation.operation_balancing_id
        );
        return {
          operation: updatedOperation || operation,
          detailObj,
          operator: selectedOperDetails[index]
        };
      });
    });
    
    // Verificar si los detalles han cambiado antes de actualizar el estado
    if (JSON.stringify(details) !== JSON.stringify(zonesOperUpdate)) {
      setZonesOperUpdate(details);
      
    }
  }, [zones, detailOperOpera, selectedOperDetails, operationsProduct, zonesOperUpdate]);



  useEffect(()=> {
    const updateDetails = detailOperOpera.map((detail) => detail.detail);

    const mergeOperations = mergeOperationsWithColors(operationsProduct, updateDetails);

    // Compara el nuevo estado con el actual antes de actualizar
    if (JSON.stringify(mergeOperations) !== JSON.stringify(operationsProduct)) {
        setOperationsProduct(mergeOperations); /// aca
    }
  },[detailOperOpera, operationsProduct])

  const mergeOperationsWithColors = (operations, attributes) => {
    // Crear un mapa para agrupar colores por operation_id
    const colorMap = attributes.reduce((map, attr) => {
      if (!map[attr.operation_id]) {
        map[attr.operation_id] = [];
      }
      map[attr.operation_id].push(attr.color);
      return map;
    }, {});

    // Construir el nuevo array con los datos de operations
    return operations.map((operation) => {
      const operationColors = colorMap[operation.id] || []; // Colores asociados al id

      return {
        ...operation,
        is_repeat: Array.isArray(operationColors) && operationColors.length > 1, // Confirma que es un array y evalúa la longitud
        color: Array.isArray(operationColors)
          ? operationColors.length > 1
            ? operationColors // Si hay varios colores, los retorna como array
            : operationColors[0] || null // Si hay un solo color, retorna ese color
          : null, // Si no es un array, retorna null
      };
    });

  };





  const handleDragStart = (e, index) => {
    const draggedItem = operationsProduct[index]; // Obtén el objeto seleccionado
    e.dataTransfer.setData('application/json', JSON.stringify(draggedItem)); // Almacena como JSON
    e.target.classList.add('opacity-50'); // Indicador visual opcional

  };


  const handleDragOver = (e) => {
    e.preventDefault();

  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();

    // Recupera el objeto arrastrado desde dataTransfer
    const draggedItem = JSON.parse(e.dataTransfer.getData('application/json'));

      // Recupera el elemento en la posición de destino
    const operationBalancingBefore = operationsProduct[targetIndex].id;

    // Opcional: Intercambia elementos (si aplica a tu caso)
    const newItems = [...operationsProduct];
    const sourceIndex = newItems.findIndex((item) => item.id === draggedItem.id); // Encuentra el índice original
    if (sourceIndex !== -1) {
      const temp = newItems[sourceIndex];
      newItems[sourceIndex] = newItems[targetIndex];
      newItems[targetIndex] = temp;
    }

    // Actualiza el estado
    setOperationsProduct(newItems);

    const operationsBalancings = newItems.map((item, index) => ({
      id: item.id,
      position: index + 1, // Ajusta la posición
    }));


    handleApi(operationsBalancings, draggedItem.operation_balancing_id, detailOperOpera, operationBalancingBefore);
  };




  const handleApi = (operationsBalancings, operation_balancing_id, detailOperOpera, operationBalancingBefore) => {

    const data = {
      operationsBalancing: {
        operations: JSON.stringify(operationsBalancings),
        operation_balancing_id: operation_balancing_id,
        opers_select: JSON.stringify(detailOperOpera),
        operation_balancing_before: operationBalancingBefore,
        zones: JSON.stringify(zonesOpersData)
      }
    }

    const postDataOrder = async (data) => {
      try {
        const result = await updateData(urlMain + "/balancings/update_operations_balancing", data)
     
        setOperationsProduct(result.sorted_operations)
        const formatted_objects = assignColorsToArray(result.formatted_objects)

        setDetailOperOpera(formatted_objects)

        toast.success(toastMessageCustom.oper_drag)


      } catch (error) {
        console.error('Error setting data', error);
      }
    };

    postDataOrder(data);
  }


  const handleDragEnd = (e) => {
    e.target.classList.remove('opacity-50');

  };



  return (
    <div>
      <div
          style={{ minWidth: "800px", minHeight: "600px" }}
          ref={componentPDF}
          className={`pdf-capture bg-zinc-100 overflow-x-auto overflow-hidden hidden lg:block ${isPDFMode && 'text-1xl'}`}>
        {
            isPDFMode ? (
                <div>
                  <PdfBalancing/>
                  {
                      imageUrl && (
                      <>
                        <div> 
                        
                          <img
                            src={imageUrl}
                            alt="Imagen responsive"
                            className="w-full"
                          />
                        </div>
                      </>

          )

                  }
                </div>
            ) : (
                <div ref={imagePdfRef}>
                  
                  <table className="min-w-full border-collapse border border-gray-200 table-hover-columns mt-2">
                    <thead className="bg-zinc-100">
                      <TableHeaderOperations opersSelect={opersSelect} balancing={balancing}/>
                    </thead>
                    <tbody className="uppercase">

                    {operationsProduct.map((item, i) => (
                        <TableRowOperations
                            key={i}
                            draggable
                            onDragStart={(e) => handleDragStart(e, i)}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, i)}
                            onDragEnd={handleDragEnd}
                            item={item}
                            opersSelect={opersSelect}
                            balancing={balancing}
                            operatorTimes={operationMap.get(item.operation) || new Map()}
                            setIsModalInput={setIsModalInput}
                            showVideos={showVideos}
                            setShowVideos={setShowVideos}

                        />
                    ))}


                    <TableFooterOperations
                        samSum={samSum}
                        opersSelect={opersSelect}
                        balancing={balancing}
                        zones={zones}
                    />
                    </tbody>
                  </table>
                    
                  
               
                </div>
            )
        }

        {

          !isPDFMode && <>
            {
              selectedOperDetails.length > 0 && (
                <>
                  { samplingsGlobal ? 
                    <FooterCycles handleFunction={handleGlobalClock}/> :
                        <div className="py-4">
                          <Tooltip placement="right-end" content="Ciclos de producto">
                            <button
                              onClick={handleGlobalClock}
                              className='ml-2 mt-2 flex justify-between items-center'>
                                <span className="font-bold text-primary_one mr-2">
                                  Ciclos de producto 
                                </span>
                              <FaClock style={{
                                border: `6px solid #073034`, // Azul personalizado con 6px de grosor
                              }}
                              className="w-10 h-10 rounded-full object-cover text-primary_one"/>
                            </button>
                          </Tooltip>
                        </div>
                  }
                </>
              )
            }
          </>
          
        }

        {
          selectedOperDetails.length >= 1 && (
            <>
              <SecuentialZoneDash/>
              <div className={` ${isPDFMode && 'px-10 py-10'}`}>
                <CommentBalancing
                  isShow={isPDFMode}
                />
              </div>
              <MachinesBalancing/>
            </>
          )
        }
        

        {
            redistributions.length >= 1 && <TableRedistribution/>
        }

        

        {isPDFMode &&
          <>
            <ImageUrlFormat image_url={showOrder.order.image_url}/>
          
          </>  
        }

      </div>



      <div className="block lg:hidden">
        {
          zonesOperUpdate.length >= 1 && <ZonesMobileDashboard/>
        }
      </div>
        <ModalRecOutside/>
      <div className="h-10 w-full py-6 mt-6">

      </div>

      <ModalVideoInput
          isModalInput={isModalInput}
          setIsModalInput={setIsModalInput}
          item={showVideos}
      />
      <DraggableVideo/>

  

      {
        isModalSample && operaClock &&
          <ModalSelectSamples 
            itemAll={operaClock.itemAll}
            Obj={operaClock.obj}
            isOpen={isModalSample} 
            setIsOpen={setIsModalSample}/>
      }

      
    </div>
  );
};

export default BalancedOperationsTable;

