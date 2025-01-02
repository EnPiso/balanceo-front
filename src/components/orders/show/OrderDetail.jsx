import {Card, CardHeader, CardBody, Image, Button, Spinner} from "@nextui-org/react";
import { useRecoilState } from "recoil";
import { orderObjBalancing, showOrderObj } from "../../../infraestructure/states/order_states.js";
import ProductCard from "./ProductCard.jsx";
import React, { useState, useEffect } from "react";
import ImageLightbox from "../import/ImageLightBox.jsx";
import { FaCalendar } from "react-icons/fa6";
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

  }


  if (!showOrder) return <p>Loading...</p>;

  return (
    <div className="p-8 space-y-8">
      {objBalancing ? (
        <>
          <div className="mt-4 flex justify-between items-center">


            {
                prodPlantOriginal && (
                    <>
                      <h1 className="font-bold uppercase text-zinc-700 text-2xl">
                        {prodPlantOriginal && prodPlantOriginal["plant"].name}
                      </h1>
                      <h2 className="font-bold uppercase text-zinc-500 text-md">
                        {prodPlantOriginal && prodPlantOriginal["module"].name}
                      </h2>
                    </>
                )
            }

            <h3 className="font-bold uppercase text-zinc-500 text-md">

              {
                  "  " + objBalancing.product.name

              }
            </h3>
            <h3 className="font-bold uppercase text-zinc-500 text-md">
              Operarios
              {
                  "  " + selectedOperDetails.length
              }
            </h3>

            <h3 className="font-bold uppercase text-zinc-500 text-md">
              Operaciones
              {
                  "  " + operationsProduct.length

              }
            </h3>


          </div>


          <Button
              className="mt-2 font-bold uppercase"
              onClick={backward}
              color="default"
              startContent={<FaBackward color="gray"/>}
          >
            Regresar a {showOrder.order.code}
          </Button>


          {
            isLoading ? (
              <Spinner label="Cargando" color="default" labelColor="foreground"/>
            ) : <BalancingDashboard />
          }

        </>
      ) : (
        <>
          <Button
            className="mt-2"
            onClick={() =>setShowOrder(null)}
            color="default"
            startContent={<FaBackward/>}
          >
            Regresar
          </Button>

          <h2 className="text-2xl font-bold uppercase">{`${showOrder.order.code}`}</h2>
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

          {/* Vista de Tabla para Pantallas Grandes */}
          <div className="hidden lg:block">

            {showOrder.products.map((product, index) => (
              <div key={index} className="mb-8">
                <div className="flex justify-end py-2">
                  <BalanceProduct
                    setObjBalancing={setObjBalancing}
                    product={product}
                  />
                </div>
                {/* Botón para expandir/colapsar el producto */}
                <button
                  onClick={() => toggleCollapse(index)}
                  className="w-full text-left p-4 bg-zinc-200 dark:bg-zinc-700 rounded-t-lg focus:outline-none text-zinc-800 dark:text-zinc-100"
                >
                  <span className="uppercase">
                    {product.product.name} <span className="font-black">{product.product.reference} </span>
                  </span>
                  <span className={`float-right ${product.product.has_opers_balancing && "text-green-600"}`}>
                    {expandedProductIndices.includes(index) ? '▲' : '▼'}
                  </span>
                </button>


                {/* Tabla de operaciones, visible solo si el índice está en expandedProductIndices */}
                {expandedProductIndices.includes(index) && (
                  <table className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-b-lg shadow-md border border-gray-300">
                    <thead>
                    <tr className="bg-zinc-800 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-800">
                      <th className="p-4 text-left font-medium border border-gray-300">Operación</th>
                      <th className="p-4 text-left font-medium border border-gray-300">Máquina</th>
                      <th className="p-4 text-left font-medium border border-gray-300">Sam</th>
                    </tr>
                    </thead>
                    <tbody>
                    {product.operations.map((operationData, opIndex) => (
                      <tr key={opIndex}>
                        <td className="p-4 border border-gray-300">{operationData.operation}</td>
                        <td className="p-4 border border-gray-300">{operationData.machine}</td>
                        <td className="p-4 border border-gray-300">{operationData.sam}</td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                )}

              </div>
            ))}
          </div>

          {/* Vista de Tarjetas para Pantallas Pequeñas */}
          <div className="lg:hidden space-y-4">
            <h3 className="text-xl font-semibold">Products</h3>
            {showOrder.products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default OrderDetail;
