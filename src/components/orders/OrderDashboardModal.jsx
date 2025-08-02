import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, RadioGroup, Radio, Spinner, CircularProgress} from "@nextui-org/react";
import React, {useState} from "react";
import ExcelImageLoader from "./import/ExcelImageLoader.jsx";
import CustomButton from "../../ui/CustomButton.jsx";
import {FaEraser, FaFileExcel} from "react-icons/fa6";
import {FaBackward, FaRegFileExcel, FaSave} from "react-icons/fa";
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

  const handleSubmit = () => {
    console.log({operationsData, orderProOpe, images})
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
    <div className="flex flex-col gap-2">
        <button onClick={onOpen} className="mb-4">
            <span className="text-secondary_two flex flex-col items-center justify-center text-sm">
              <FaFileExcel className="text-secondary_two items-center block lg:hidden" size={24} />
              <FaFileExcel className="text-secondary_two items-center hidden lg:block" size={40} />
            <span className="py-3 uppercase font-bold">Balanceos</span>
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
              <ModalHeader className="flex flex-col gap-1">
                {
                  isMultipleExcel ?  
                      <>
                        Ordenes de producción
                      </>
                    :
                    (
                      <>
                        {
                          operationsData.length < 1 && "Carga la orden de producción"
                        }
                        {
                          orderProOpe && `Orden de producción: ${orderProOpe.order}`
                        }
                      </>
                    )
                }
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