import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, RadioGroup, Radio, Spinner, CircularProgress} from "@nextui-org/react";
import React, {useState} from "react";
import ExcelImageLoader from "./import/ExcelImageLoader.jsx";
import CustomButton from "../../ui/CustomButton.jsx";
import {FaEraser, FaFileExcel} from "react-icons/fa6";
import {FaBackward, FaChevronRight, FaRegFileExcel, FaSave} from "react-icons/fa";
import InputOrder from "./import/InputOrder.jsx";
import listenEffect from "./import/listenEffect.jsx";
import OrderSubmit from "./OrderSubmit.jsx";
import SpinnerLoaderCustom from "../../ui/SpinnerLoaderCustom.jsx";
import toast from "react-hot-toast";
import {toastMessageCustom} from "../../infraestructure/data/toastMessage.js";
import ExcelImagesLoaders from "./import/ExcelImagesLoaders.jsx";
import OrderSubmitMultiple from "./OrderSubmitMultiple.jsx";
import { BsFileExcel } from "react-icons/bs";
import { RiFileExcelLine } from "react-icons/ri";


const OrderDashboardModal = () => {
  const [images, setImages] = useState([]);
  const [operationsData, setOperationsData] = useState([]);
  const [orderProOpe, setOrderProOpe] = useState(null);

  const [isMultipleExcel, setIsMultipleExcel] = useState(false);
  const [fileMultiple, setFileMultiple] = useState(null);
  const [filesData, setFilesData] = useState([]);
  const [processData, setProcessData] = useState([]);
  const [isLoadingMulti, setIsLoadingMulti] = useState(false);
  const [valueLoading, setValueLoading] = useState(0);

  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const [scrollBehavior, setScrollBehavior] = useState("inside");

  const listen = listenEffect(operationsData,setOrderProOpe,images)
  
  const eraseData = () => {
    toast(toastMessageCustom.erase_data_modal)
    setImages([])
    setOperationsData([])
    setOrderProOpe(null)

  }

  const eraseDataSubmit = () => {
    setImages([])
    setOperationsData([])
    setOrderProOpe(null)

  }
  const handleOpen = () => {
    //setSize(size)
    onOpen();
  }

 
  const handleMultipleFile = (files) => {
    setIsMultipleExcel(true)
    setFileMultiple(files)
  }


  const handleCloseMulti = (onClose) => {
    setIsMultipleExcel(false)
    setFileMultiple(null)
    setFilesData([])
    setProcessData([])
    onClose()
  }


  
  return (
    <div className="flex flex-col">
        <button onClick={onOpen} className="w-full">
            <span className="flex items-center justify-between w-full px-3 py-2 rounded-md text-slate-600 hover:bg-slate-100">
              <span className="flex items-center gap-3">
                <FaFileExcel className="text-slate-500" size={18} />
                <span className="text-sm font-medium">Balanceos</span>
              </span>
              <FaChevronRight className="text-slate-400" size={12} />
            </span>
        </button>

     
     
      <Modal
        placement="center"
        size="full"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col justify-start items-start gap-3">
                <span className="flex items-center gap-3">
                  <img
                    className="w-10 h-10 object-contain"
                    src="/icon/icon.jpeg"
                    alt="Icono de Balance"
                  />
                  <div className="leading-tight">
                    <p className="text-primary_two font-[900] text-lg m-0">
                      <span className="text-secondary_two">En</span>Piso
                    </p>
                    <p className="text-slate-400 text-sm tracking-wide uppercase">Balanceos</p>
                  </div>
                </span>

                <span className="text-lg font-semibold text-zinc-600 dark:text-zinc-100">
                  {isMultipleExcel
                    ? "Ordenes de producción"
                    : operationsData.length < 1
                      ? "Carga la orden de producción"
                      : orderProOpe
                        ? `Orden de producción: ${orderProOpe.order}`
                        : ""
                  }
                </span>
              </ModalHeader>
              <ModalBody>
                <div className="mt-2">

                  
                {
                  isMultipleExcel ? (
                    <ExcelImagesLoaders
                      setProcessData={setProcessData}
                      filesData={filesData}
                      setFilesData={setFilesData}
                      fileMultiple={fileMultiple}
                      setFileMultiple={setFileMultiple}
                    
                    />
                  ) : (
                    <ExcelImageLoader
                      images={images}
                      setImages={setImages}
                      operationsData={operationsData}
                      setOperationsData={setOperationsData}
                      orderProOpe={orderProOpe}
                      handleMultipleFile={handleMultipleFile}
                    />
                  )
                }
                  

                </div>

              </ModalBody>
              <ModalFooter>
                <div className="flex justify-end">

                  

                  {

                    isMultipleExcel ? (
                      <>
                        {
                          fileMultiple && (
                              <>
                              {
                                isLoadingMulti ?
                                  <div className="mr-3">
                                    <CircularProgress
                                      color="success"
                                      showValueLabel={true}
                                      size="lg"
                                      value={valueLoading}
                                    />
                                  </div> : 
                                  <OrderSubmitMultiple
                                    filesData={filesData}  
                                    processData={processData}
                                    onClose={()=> handleCloseMulti(onClose)}
                                    setIsLoadingMulti={setIsLoadingMulti}
                                    setValueLoading={setValueLoading}
                                  />
                              }



                                <CustomButton
                                  color="default"
                                  variant="bordered"
                                  startContent={<FaEraser color="red"/>}
                                  onClick={()=> {
                                    setFileMultiple(null)
                                    setIsMultipleExcel(false)
                                  }}
                                  title="Borrar"
                              />
                            </>
                          )
                        }
                      </>
                    ) : (
                      <>
                        {
                          operationsData.length >= 1 && (
                            <>

                              <OrderSubmit
                                operationsData={operationsData}
                                orderProOpe={orderProOpe}
                                images={images}
                                onClose={onClose}
                                eraseData={eraseDataSubmit}
                              />

                              <CustomButton
                                color="default"
                                variant="bordered"
                                startContent={<FaEraser color="red"/>}
                                onClick={eraseData}
                                title="Borrar"
                              />
                            </>
                          )
                        }
                      </>
                    )
                  }
                  

                  


                  <CustomButton
                    color="default"
                    variant="bordered"
                    startContent={<FaBackward />}
                    onClick={onClose}
                    title="Regresar"
                  />

                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default OrderDashboardModal;