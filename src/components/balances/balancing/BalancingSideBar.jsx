import { useState, useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import { orderObjBalancing, productsNextLast, showOrderObj } from "../../../infraestructure/states/order_states";
import { detailOperOperations, goToUpdateBalance } from "../../../infraestructure/states/states_balancing";
import { FaBarcode, FaRightLong } from "react-icons/fa6";
import { allOperationsProduct, samSumOperation } from "../../../infraestructure/states/operation_states";
import { selectProduct } from "../../../infraestructure/states/states_product";
import { checkOperationsBalancing } from "../../../infraestructure/states/states_videos";
import { checkOpersPosition, selectProdPlantOriginal } from "../../../infraestructure/states/opers_states";
import { zonesMobile } from "../../../infraestructure/states/states_mobile";

export const BalancingSideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownTriggerRef = useRef(null);

  const [showOrder, setShowOrder] = useRecoilState(showOrderObj);
  const [productsSideBar, setProductsSideBar] = useRecoilState(productsNextLast);
  const [toUpdateBalance, setToUpdateBalance] = useRecoilState(goToUpdateBalance);
  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);


  

  const [operationsProduct, setOperationsProduct] = useRecoilState(allOperationsProduct)
  const [product, setProduct] = useRecoilState(selectProduct)
  const [samSum, setSamSum] = useRecoilState(samSumOperation);
  const [detailOperOpera, setDetailOperOpera] = useRecoilState(detailOperOperations);
  const [selOpeVideos, setSelOpeVideos] = useRecoilState(checkOperationsBalancing);
  const [prodPlantOriginal, setProdPlantOriginal] = useRecoilState(selectProdPlantOriginal)
  const [zonesOperUpdate, setZonesOperUpdate] = useRecoilState(zonesMobile);
  const [selectedOperDetails, setSelectedOperDetails] = useRecoilState(checkOpersPosition); // Array con los detalles de cada selección
  

  useEffect(() => {
    if (showOrder) {
      
      const products = showOrder.products.map(product => ({
        product: product.product,
        orderId: showOrder.order.id
      }));
      setProductsSideBar(products);
      
    }
  }, [showOrder, objBalancing, setProductsSideBar]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuMouseLeave = () => {
    // Opcional: Cierra el menú si el ratón sale de él
    // setIsOpen(false);
  };

  const handleProductClick = (product) => {

    setToUpdateBalance(product)
    handleReset()
  }
  

  const handleReset = () => {
    setObjBalancing(null)
    setSelectedOperDetails([])
    setOperationsProduct([])
    setProduct(null)
    setSamSum(0)
    setDetailOperOpera([])
    setSelOpeVideos(null)
    setZonesOperUpdate([])
  }

  return (
    <div className="fixed top-1/2 right-0 transform -translate-y-1/2 z-50">
      <div className="relative">
        <div
          ref={dropdownTriggerRef}
          className="cursor-pointer"
          onClick={toggleMenu}
        >
          {isOpen ? (
            <div className="bg-primary_one text-white rounded-l px-3 py-2 shadow-md flex items-center justify-center h-12">
              <button className="text-sm font-medium">
                <img className="w-8 h-8" src="./icon/icon.jpeg" alt="Icono de Balance" />
              </button>
            </div>
          ) : (
            <div
              className="h-12 w-1.5 bg-primary_one border-l border-white cursor-pointer"
              title="Mostrar panel"
            />
          )}
        </div>

        {isOpen && (
          <div
            className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            onMouseLeave={handleMenuMouseLeave}
          >
            <div className="py-1" role="none">
              
              {productsSideBar.map((product, index) => (
                <div
                  onClick={()=> {
                    !(objBalancing.product.id === product.product.id) &&
                      handleProductClick(product)
                  }}
                  key={index}
                  className={`flex justify-between items-center px-4 py-2 text-sm ${objBalancing.product.id === product.product.id ? 'text-secondary_two': 'font-bold text-zinc-600 hover:text-zinc-800  cursor-pointer'}`}
                  role="menuitem"
                >
            
                  {product?.product.name} { !(objBalancing.product.id === product.product.id) && <FaRightLong className="ml-2"/>}
                </div>
              ))}
              
              
            </div>
          </div>
        )}
      </div>
    </div>
  );
};