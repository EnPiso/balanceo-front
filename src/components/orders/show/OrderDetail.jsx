import {Spinner} from "@nextui-org/react";
import { useRecoilState } from "recoil";
import { orderObjBalancing, showOrderObj } from "../../../infraestructure/states/order_states.js";
import React, { useState, useEffect } from "react";
import ImageLightbox from "../import/ImageLightBox.jsx";
import { FaDownLong, FaUpLong } from "react-icons/fa6";
import { BalancingDashboard } from "../../balances/balancing/BalancingDashboard.jsx";
import { FaBackward } from "react-icons/fa";
import BalanceProduct from "./BalanceProduct.jsx";
import MyCustomButton from "../../../ui/MyCustomButton.jsx";
import {
  checkOpersPosition,
  selectProdPlant,
  selectProdPlantOriginal
} from "../../../infraestructure/states/opers_states.js";
import {allOperationsProduct, samSumOperation} from "../../../infraestructure/states/operation_states.js";
import {selectProduct} from "../../../infraestructure/states/states_product.js";
import {detailOperOperations, pendingExitConfirm} from "../../../infraestructure/states/states_balancing.js";
import {checkOperationsBalancing} from "../../../infraestructure/states/states_videos.js";
import {hourMinuteSecond, monthDayYear} from "../../../infraestructure/utils/dateFormat.js";
import { zonesMobile } from "../../../infraestructure/states/states_mobile.js";
import { isOrderOrProduct } from "../../../infraestructure/states/states_manual_order.js";
import { useNavigate, useParams } from 'react-router-dom';
import { useLoadBalancing } from '../../../hooks/balances/useLoadBalancing.jsx';

const OrderDetail = () => {
  const navigate = useNavigate();
  const { orderId, productId } = useParams();
  const { loadBalancing } = useLoadBalancing();
  const [showOrder, setShowOrder] = useRecoilState(showOrderObj);

  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);
  const [selectedOperDetails, setSelectedOperDetails] = useRecoilState(checkOpersPosition);

  const [expandedProductIndices, setExpandedProductIndices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmExit, setConfirmExit] = useState(false);

  const [operationsProduct, setOperationsProduct] = useRecoilState(allOperationsProduct)
  const [product, setProduct] = useRecoilState(selectProduct)
  const [samSum, setSamSum] = useRecoilState(samSumOperation);
  const [detailOperOpera, setDetailOperOpera] = useRecoilState(detailOperOperations);
  const [isPendingExit, setIsPendingExit] = useRecoilState(pendingExitConfirm);
  const [selOpeVideos, setSelOpeVideos] = useRecoilState(checkOperationsBalancing);
  const [prodPlantOriginal, setProdPlantOriginal] = useRecoilState(selectProdPlantOriginal)
  const [zonesOperUpdate, setZonesOperUpdate] = useRecoilState(zonesMobile);
  const [isOrderOr, setIsOrderOr] = useRecoilState(isOrderOrProduct);
  const [prodPlant, setProdPlant] = useRecoilState(selectProdPlant)

  useEffect(() => {
    if (showOrder) {
      setExpandedProductIndices(showOrder.products.map((_, index) => index));
    }
  }, [showOrder]);

  // Hidratación: si se entra directo a /orders/:orderId/products/:productId
  useEffect(() => {
    if (productId && showOrder && !objBalancing) {
      const productItem = showOrder.products.find(
        p => String(p.product.id) === String(productId)
      );
      if (productItem) {
        loadBalancing(productItem, Number(orderId));
      }
    }
  }, [productId, showOrder]);

  const toggleCollapse = (index) => {
    if (expandedProductIndices.includes(index)) {
      setExpandedProductIndices(expandedProductIndices.filter((i) => i !== index));
    } else {
      setExpandedProductIndices([...expandedProductIndices, index]);
    }
  };

  // Mostrar confirm cuando OrdersTab detecta browser back desde el balanceo
  useEffect(() => {
    if (isPendingExit) {
      setConfirmExit(true);
      setIsPendingExit(false);
    }
  }, [isPendingExit]);

  const clearBalancingState = () => {
    const productsUpdate = showOrder.products.map(item =>
      item.product.id === product.id
        ? { operations: objBalancing.operations, product, total_sam: samSum }
        : item
    );
    setShowOrder({ order: showOrder.order, products: productsUpdate });
    setObjBalancing(null);
    setSelectedOperDetails([]);
    setOperationsProduct([]);
    setProduct(null);
    setSamSum(0);
    setDetailOperOpera([]);
    setSelOpeVideos(null);
    setZonesOperUpdate([]);
    setProdPlantOriginal(null);
    setProdPlant(null);
  };

  const handleBackward = () => setConfirmExit(true);

  const backward = () => {
    const orderId = showOrder.order.id;
    clearBalancingState();
    navigate(`/orders/${orderId}`, { state: { intentional: true } });
  };


  if (!showOrder) return <p>Loading...</p>;

  return (
    <div className="space-y-2">
      {objBalancing ? (
        <>
          {/* Header del balanceo - unificado desktop/mobile */}
          <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              {prodPlantOriginal && (
                <div>
                  <h1 className="font-bold uppercase text-secondary_two text-xl">
                    <span className="bg-primary_one px-1">{prodPlantOriginal["plant"].name}</span>
                  </h1>
                  <h2 className="font-bold uppercase text-zinc-800 dark:text-zinc-200 text-sm">
                    <span className="bg-zinc-300 dark:bg-zinc-600 px-1">{prodPlantOriginal["module"].name}</span>
                  </h2>
                </div>
              )}
              <h3 className="font-bold uppercase text-zinc-500 dark:text-zinc-400 text-sm">
                {objBalancing.product.name}
              </h3>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-zinc-500 dark:text-zinc-400 text-sm font-bold uppercase">
                Operarios <span className="text-secondary_two">{selectedOperDetails.length}</span>
              </span>
              <span className="text-zinc-500 dark:text-zinc-400 text-sm font-bold uppercase">
                Operaciones <span className="text-secondary_two">{operationsProduct.length}</span>
              </span>
              <div className="sm:hidden">
                <ImageLightbox
                  thumbnailUrl={showOrder.order.image_url}
                  fullSizeUrl={showOrder.order.image_url}
                  alt={`medida ${showOrder.order.code}`}
                  key={showOrder.order.code}
                />
              </div>
            </div>
          </div>

          {confirmExit && (
            <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
              <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-2xl p-6 max-w-sm w-full mx-4">
                <h3 className="text-zinc-800 dark:text-zinc-100 font-semibold text-base mb-2">
                  ¿Salir del balanceo?
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-5">
                  Los cambios que no hayas guardado se perderán.
                </p>
                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => setConfirmExit(false)}
                    className="px-4 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
                  >
                    Cancelar
                  </button>
                  <MyCustomButton
                    icon={<FaBackward className="mt-1 mr-3" />}
                    title={"Salir sin guardar"}
                    handleClick={() => { setConfirmExit(false); backward(); }}
                    value={null}
                    bgButton={"bg-zinc-800"}
                    textButton={"text-secondary_two"}
                  />
                </div>
              </div>
            </div>
          )}

          {isLoading ? (
            <Spinner label="Cargando" color="default" labelColor="foreground" />
          ) : (
            <BalancingDashboard backward={handleBackward} showOrder={showOrder} />
          )}
        </>
      ) : (
        <>
          {/* Botón regresar fijo abajo - mobile */}
          <div className="block lg:hidden">
            <div className="pr-6 pb-2 flex justify-end fixed bottom-0 w-full z-50">
              <MyCustomButton
                icon={<FaBackward className="mt-1 mr-3" />}
                title={"Regresar"}
                handleClick={() => { setShowOrder(null); navigate('/'); }}
                value={null}
                bgButton={"bg-zinc-800"}
                textButton={"text-secondary_two"}
              />
            </div>
          </div>

          {/* Botón regresar fijo abajo - desktop */}
          <div className="hidden lg:block">
            <div className="flex justify-end fixed bottom-4 right-3 z-50">
              <MyCustomButton
                icon={<FaBackward className="mt-1 mr-3" />}
                title={"Regresar"}
                handleClick={() => { setShowOrder(null); navigate('/'); }}
                value={null}
                bgButton={"bg-zinc-800"}
                textButton={"text-secondary_two"}
              />
            </div>
          </div>

          {/* Header: título + fecha a la izquierda, imagen a la derecha */}
          <div className="flex items-center justify-between gap-2 py-2">
            <div className="flex flex-col gap-0.5 min-w-0">
              <h1 className="font-semibold uppercase text-secondary_one text-lg lg:text-xl">
                {isOrderOr ? 'Orden' : 'Producto'}{" "}
                <span className="text-secondary_two font-bold">{showOrder.order.code}</span>
              </h1>
              <span className="text-zinc-800 dark:text-zinc-100 bg-zinc-200 dark:bg-zinc-700 px-2 py-1 rounded-lg text-sm font-bold w-fit">
                {showOrder.order.created_at && monthDayYear(showOrder.order.created_at)}
                <span className="ml-2 text-secondary_one dark:text-secondary_two text-xs">
                  {showOrder.order.created_at && hourMinuteSecond(showOrder.order.created_at)}
                </span>
              </span>
            </div>

            {isOrderOr && (
              <div className="flex-shrink-0">
                {showOrder.order.image_url
                  ? <ImageLightbox
                      thumbnailUrl={showOrder.order.image_url}
                      fullSizeUrl={showOrder.order.image_url}
                      alt={`medida ${showOrder.order.code}`}
                      key={showOrder.order.code}
                    />
                  : <Spinner color="default" size="sm" />
                }
              </div>
            )}
          </div>

          {/* Lista de productos */}
          <div>
            {showOrder.products.map((product, index) => (
              <div key={index} className="mb-4">
                {product.product.category_product_name && (
                  <p className="uppercase text-xs text-zinc-500 dark:text-zinc-400 font-semibold px-1 pt-2">
                    {product.product.category_product_name}
                  </p>
                )}

                {/* Colapso + BalanceProduct en la misma fila */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleCollapse(index)}
                    className="flex-1 flex justify-between items-center text-left px-3 py-3 bg-zinc-100 dark:bg-zinc-700 rounded-lg focus:outline-none text-zinc-800 dark:text-zinc-100"
                  >
                    <span className="uppercase font-black">
                      {product.product.name}
                      <span className="text-secondary_two ml-2">{product.product.reference}</span>
                    </span>
                    <span className={`text-xl ml-2 ${product.product.has_opers_balancing ? "text-secondary_two" : ""}`}>
                      {expandedProductIndices.includes(index) ? <FaUpLong /> : <FaDownLong />}
                    </span>
                  </button>
                  <BalanceProduct setObjBalancing={setObjBalancing} product={product} />
                </div>

                {expandedProductIndices.includes(index) && (
                  <table className="w-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-100 rounded-b-lg">
                    <thead>
                      <tr className="bg-transparent text-zinc-600 dark:text-zinc-400 border-b border-zinc-300 dark:border-zinc-600">
                        <th className="p-2 text-left font-medium uppercase">Operación</th>
                        <th className="p-2 text-left font-medium uppercase">Máquina</th>
                        <th className="p-2 text-left font-medium uppercase">Sam</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.operations.map((operationData, opIndex) => (
                        <tr key={opIndex} className="hover:bg-zinc-50 dark:hover:bg-zinc-600 transition-colors">
                          <td className="p-2 border border-gray-100 dark:border-transparent">{operationData.name || operationData.operation}</td>
                          <td className="p-2 border border-gray-100 dark:border-transparent">{operationData.machine_name}</td>
                          <td className="p-2 border border-gray-100 dark:border-transparent">{operationData.sam}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            ))}
          </div>

          <div className="h-10 w-full" />
        </>
      )}
    </div>
  );
};

export default OrderDetail;
