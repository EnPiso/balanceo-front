import {Card, CardHeader, CardBody, Image, Button, Spinner} from "@nextui-org/react";
import { useRecoilState } from "recoil";
import { orderObjBalancing, showOrderObj } from "../../../infraestructure/states/order_states.js";
import ProductCard from "./ProductCard.jsx";
import React, { useState, useEffect } from "react";
import ImageLightbox from "../import/ImageLightBox.jsx";
import { FaCalendar, FaDownLong, FaUpLong } from "react-icons/fa6";
import { BalancingDashboard } from "../../balances/balancing/BalancingDashboard.jsx";
import {FaBackward} from "react-icons/fa";
import SaveBalance from "./SaveBalance.jsx";
import BalanceProduct from "./BalanceProduct.jsx";
import {
  checkOpersPosition,
  selectOpers,
  selectProdPlantOriginal
} from "../../../infraestructure/states/opers_states.js";
import {allOperationsProduct, samSumOperation} from "../../../infraestructure/states/operation_states.js";
import {selectProduct} from "../../../infraestructure/states/states_product.js";
import {detailOperOperations} from "../../../infraestructure/states/states_balancing.js";
import {checkOperationsBalancing} from "../../../infraestructure/states/states_videos.js";
import ModalCustomProduct from "../../balances/balancing/customProduct/ModalCustomProduct.jsx";
import {hourMinuteSecond, monthDayYear} from "../../../infraestructure/utils/dateFormat.js";
import GoToBalanceProduct from "../../operations_master/GoToBalanceProduct.jsx";
import MyCustomButton from "../../../ui/MyCustomButton.jsx";
import { zonesMobile } from "../../../infraestructure/states/states_mobile.js";

const OrderDetail = () => {
  const [showOrder, setShowOrder] = useRecoilState(showOrderObj);

  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);
  const [selectedOperDetails, setSelectedOperDetails] = useRecoilState(checkOpersPosition); // Array con los detalles de cada selección

  // Estado para controlar la expansión de cada producto
  const [expandedProductIndices, setExpandedProductIndices] = useState([]);

  const [isLoading, setIsLoading] = useState(false);



  const [operationsProduct, setOperationsProduct] = useRecoilState(allOperationsProduct)
  const [product, setProduct] = useRecoilState(selectProduct)

  const [samSum, setSamSum] = useRecoilState(samSumOperation);

  const [detailOperOpera, setDetailOperOpera] = useRecoilState(detailOperOperations);
  const [selOpeVideos, setSelOpeVideos] = useRecoilState(checkOperationsBalancing);

  const [prodPlantOriginal, setProdPlantOriginal] = useRecoilState(selectProdPlantOriginal)
  const [zonesOperUpdate, setZonesOperUpdate] = useRecoilState(zonesMobile);



  // Abre todas las secciones por defecto al cargar
  useEffect(() => {
    if (showOrder) {
      // Inicializa el array con todos los índices de productos
      setExpandedProductIndices(showOrder.products.map((_, index) => index));
    }
  }, [showOrder]);

  const toggleCollapse = (index) => {
    if (expandedProductIndices.includes(index)) {
      // Si el índice ya está en el array, lo elimina para colapsar la sección
      setExpandedProductIndices(expandedProductIndices.filter((i) => i !== index));
    } else {
      // Si el índice no está en el array, lo añade para expandir la sección
      setExpandedProductIndices([...expandedProductIndices, index]);
    }
  };


  const backward = () => {
    // console.log(showOrder.products)
    const showOrderProducts = showOrder.products
    // console.log(objBalancing.operations)
    // console.log(product)
    // console.log(samSum)

    const data = {
      operations: objBalancing.operations,
      product: product,
      total_sam: samSum
    }

    const product_id = product.id

    const productsUpdate = showOrderProducts.map(item => {
      // Compara el `product.id` del objeto actual con `product_id`
      if (item.product.id === product_id) {
        // Reemplaza el objeto completo con `data` si coincide
        return { ...data };
      }
      // Si no coincide, devuelve el objeto original
      return item;
    });

    const dataUpdate = {
      order: showOrder.order,
      products: productsUpdate
    }
    setShowOrder(dataUpdate)

    setObjBalancing(null)
    setSelectedOperDetails([])
    setOperationsProduct([])
    setProduct(null)
    setSamSum(0)
    setDetailOperOpera([])
    setSelOpeVideos(null)
    setZonesOperUpdate([])
  }


  if (!showOrder) return <p>Loading...</p>;

  return (
    <div className="space-y-8 ">
      {objBalancing ? (
        <>


          <div className="">
            <div className="ml-2">

              <div className="hidden lg:block">
                  <div className="mt-4  flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-1 lg:space-y-0">
                    {prodPlantOriginal && (
                      <>
                        <div>
                          <h1 className="font-bold uppercase text-secondary_two text-xl lg:text-2xl">
                            <span className="bg-primary_one px-1">
                              {prodPlantOriginal["plant"].name}
                            </span>
                          </h1>
                          <h2 className="font-bold uppercase text-zinc-800 text-sm lg:text-md">
                            <span className="bg-zinc-300 px-1">
                              {prodPlantOriginal["module"].name}
                            </span>
                            
                          </h2>
                        </div>
                      </>
                    )}

                    <h3 className="font-bold uppercase text-zinc-500 text-sm lg:text-md">
                      {"  " + objBalancing.product.name}
                    </h3>
                    <h3 className="font-bold uppercase text-zinc-500 text-sm lg:text-md">
                      Operarios {"  " + selectedOperDetails.length}
                    </h3>
                    <h3 className="font-bold uppercase text-zinc-500 text-sm lg:text-md">
                      Operaciones {"  " + operationsProduct.length}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="block lg:hidden">
                <div className="flex justify-between items-center">
                  <div className=" mt-4 flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-1 lg:space-y-0">
                      {prodPlantOriginal && (
                        <>
                          <div>
                            <h1 className="font-bold uppercase text-secondary_two text-xl lg:text-2xl">
                              <span className="bg-primary_one px-1">
                                {prodPlantOriginal["plant"].name}
                              </span>
                            </h1>
                            <h2 className="font-bold uppercase text-zinc-800 text-sm lg:text-md">
                              <span className="bg-zinc-300 px-1">
                                {prodPlantOriginal["module"].name}
                              </span>
                              
                            </h2>
                          </div>
                        </>
                      )}

                      <h3 className="font-bold uppercase text-zinc-500 text-sm lg:text-md">
                        {"  " + objBalancing.product.name}
                      </h3>
                      <h3 className="font-bold uppercase text-zinc-500 text-sm lg:text-md">
                        Operarios {"  " + selectedOperDetails.length}
                      </h3>
                      <h3 className="font-bold uppercase text-zinc-500 text-sm lg:text-md">
                        Operaciones {"  " + operationsProduct.length}
                      </h3>
                    </div>
                  <div>
                    <ImageLightbox
                      thumbnailUrl={showOrder.order.image_url}
                      fullSizeUrl={showOrder.order.image_url}
                      alt={`medida ${showOrder.order.code}`}
                      key={showOrder.order.code}
                    />
                  </div>

                </div>
                  
            </div>
            
            
          </div>
          

          {
            isLoading ? (
              <Spinner label="Cargando" color="default" labelColor="foreground"/>
            ) : 
              <BalancingDashboard 
                backward={backward}
                showOrder={showOrder}
              />
          }

        </>
      ) : (
          <>
          <div className="block lg:hidden">
            <div className="pr-6 pb-2 flex justify-end fixed bottom-0 w-full z-50">
              <MyCustomButton
                icon={<FaBackward className=" mt-1 mr-3 "/>}
                title={"Regresar"}
                handleClick={setShowOrder}
                value={null}
                bgButton={"bg-zinc-800"}
                textButton={"text-secondary_two"}
              />
             
            </div>
          </div>
          
          <div className="hidden lg:block">
            <div className="flex justify-end fixed bottom-4 right-3 z-50">
              <MyCustomButton
                icon={<FaBackward className=" mt-1 mr-3 "/>}
                title={"Regresar"}
                handleClick={setShowOrder}
                value={null}
                bgButton={"bg-zinc-800"}
                textButton={"text-secondary_two"}
              />
            </div>
              
          </div>
           
            

            <div className="flex justify-between items-center">
              <div className="flex justify-between items-center text-xl lg:text-2xl">
                <h1 className=" font-semibold  uppercase text-secondary_one">
                  Orden 
                  
                </h1>
                <span className="text-secondary_two font-bold  ml-2">{`${showOrder.order.code}`}</span>
              </div>
           
             
            <span className="text-zinc-800 bg-zinc-200 p-2 rounded-lg font-bold">
                  {
                      showOrder.order.created_at && monthDayYear(showOrder.order.created_at)
                  }
              <span className="ml-2  text-secondary_one text-sm">
                {
                    showOrder.order.created_at && hourMinuteSecond(showOrder.order.created_at)
                }
              </span>
            </span>

            </div>

            <div className="mt-2">

              {
                showOrder.order.image_url ? (
                    <ImageLightbox
                        thumbnailUrl={showOrder.order.image_url}
                        fullSizeUrl={showOrder.order.image_url}
                        alt={`medida ${showOrder.order.code}`}
                        key={showOrder.order.code}
                    />
                ) : (
                    <div className="flex gap-4">
                      <Spinner
                          color="default"
                          size="lg"
                      />
                    </div>
                )
              }


            </div>

            {/* Vista de Tabla para Pantallas Grandes hidden lg:block */}
            <div className="">

              {showOrder.products.map((product, index) => (
                  <div key={index} className="mb-8">
                    <div className="flex justify-end py-2">
                      <BalanceProduct
                          setObjBalancing={setObjBalancing}
                          product={product}
                      />
                    </div>
                    <h1 className="uppercase">
                      <span className="font-black">{product.product.category_product_name} </span>
                    </h1>

                    {/* Botón para expandir/colapsar el producto */}
                    <button
                        onClick={() => toggleCollapse(index)}
                        className="w-full flex justify-between items-center text-left p-4 bg-zinc-100 dark:bg-zinc-700 rounded-t-lg focus:outline-none text-zinc-800 dark:text-zinc-100"
                    >
                      <span className="uppercase font-black">
                        {product.product.name} <span className=" text-secondary_two">{product.product.reference} </span>
                      </span>
                          <span className={`text-2xl animate-pulse ${product.product.has_opers_balancing && "text-secondary_two"}`}>
                        {expandedProductIndices.includes(index) ? <FaUpLong/> : <FaDownLong/>}
                      </span>
                    </button>


                    {/* Tabla de operaciones, visible solo si el índice está en expandedProductIndices */}
                    {expandedProductIndices.includes(index) && (
                        <table
                            className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-b-lg shadow-md border border-gray-300">
                          <thead>
                          <tr className="bg-zinc-800 dark:bg-zinc-100 text-secondary_two dark:text-zinc-800">
                            <th className="p-4 text-left font-medium border border-gray-300">Operación</th>
                            <th className="p-4 text-left font-medium border border-gray-300">Máquina</th>
                            <th className="p-4 text-left font-medium border border-gray-300">Sam</th>
                          </tr>
                          </thead>
                          <tbody>
                          {product.operations.map((operationData, opIndex) => (
                              <tr key={opIndex}>
                                <td className="p-1 border border-gray-300">{operationData.name || operationData.operation}</td>
                                <td className="p-1 border border-gray-300">{operationData.machine}</td>
                                <td className="p-1 border border-gray-300">{operationData.sam}</td>
                              </tr>
                          ))}
                          </tbody>
                        </table>
                    )}

                  </div>
              ))}
            </div>

            {/* Vista de Tarjetas para Pantallas Pequeñas */}
            <div className="h-10 w-full">

             </div>
          </>
      )}
    </div>
  );
};

export default OrderDetail;
