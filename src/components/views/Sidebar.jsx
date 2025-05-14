import React, { useState } from 'react'
import {sidebarData} from "../../infraestructure/data/sidebar.jsx";
import {useRecoilState} from "recoil";
import {sideBarNav} from "../../infraestructure/states/states_navigation.js";
import InfoBoxBalancing from "../balances/balancing/sidebarForm/InfoBoxBalancing.jsx";
import ModalDashboardOrder from "../orders/ModalDashboardOrder.jsx";
import OrderDashboardModal from "../orders/OrderDashboardModal.jsx";
import {orderObjBalancing, showOrderObj} from "../../infraestructure/states/order_states.js";
import ImageLightbox from "../orders/import/ImageLightBox.jsx";
import DashboardProducts from "../products/DashboardProducts.jsx";
import DashboardOpers from "../opers/DashboardOpers.jsx";
import OperationsMaster from '../operations_master/OperationsMaster.jsx';
import { checkOpersPosition, selectProdPlantOriginal } from '../../infraestructure/states/opers_states.js';
import { allOperationsProduct, samSumOperation } from '../../infraestructure/states/operation_states.js';
import { selectProduct } from '../../infraestructure/states/states_product.js';
import { detailOperOperations } from '../../infraestructure/states/states_balancing.js';
import { checkOperationsBalancing } from '../../infraestructure/states/states_videos.js';
import OpersMaster from '../opers_master/OpersMaster.jsx';
import { Avatar } from '@nextui-org/react';
import { FaEyeSlash } from 'react-icons/fa6';
import OrdersManualCreate from '../orders/manual/OrdersManualCreate.jsx';
import DashboardVideoMain from '../balances/balancing/tableOperations/videoOperations/videoSidebarMain/DashboardVideoMain.jsx';


const Sidebar = ({toggleSidebar}) => {
	const [sideArray,setSideArray] = useRecoilState(sideBarNav)
	const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);
	const [showOrder, setShowOrder] = useRecoilState(showOrderObj);

		const [selectedOperDetails, setSelectedOperDetails] = useRecoilState(checkOpersPosition); // Array con los detalles de cada selección
	
		// Estado para controlar la expansión de cada producto
	
	
		const [operationsProduct, setOperationsProduct] = useRecoilState(allOperationsProduct)
		const [product, setProduct] = useRecoilState(selectProduct)
	
		const [samSum, setSamSum] = useRecoilState(samSumOperation);
	
		const [detailOperOpera, setDetailOperOpera] = useRecoilState(detailOperOperations);
		const [selOpeVideos, setSelOpeVideos] = useRecoilState(checkOperationsBalancing);
	
		const [prodPlantOriginal, setProdPlantOriginal] = useRecoilState(selectProdPlantOriginal)

		const [isOpen, setIsOpen] = useState(false);
		
			// Función para abrir y cerrar el lightbox
		const toggleLightbox = () => setIsOpen(!isOpen);
	


	const handleSideBar = () => {
		setObjBalancing(null)
    setSelectedOperDetails([])
    setOperationsProduct([])
    setProduct(null)
    setSamSum(0)
    setDetailOperOpera([])
    setSelOpeVideos(null)	
		setShowOrder(null)
	}


	return (
		
		<div className="bg-zinc-800 text-zinc-900 h-screen px-1 fixed w-40 dark:bg-zinc-900 dark:text-white z-50">
			<div className="flex flex-col items-center mt-4 mb-2">
        <button onClick={handleSideBar} className="flex flex-col items-center">
          <img
            className="w-36 h-36 object-contain mb-2" // Ajusta 'w-8 h-8' al tamaño de ícono deseado
            src="/icon/icon.jpeg"
            alt="Icono de Balance" // Añade un texto alternativo descriptivo
          />
          <p className="text-primary_two font-black text-4xl text-center m-0"> 
						<span>
							<span className='text-secondary_two'>
								En
							</span>
							<span className='text-primary_two'>
								Piso	
							</span>	
						</span> 
					</p>
				
          <p className="text-secondary_two  text-lg text-center m-0">BALANCEOS</p>

        </button>

				<div className='mt-5'>
					{objBalancing ? (
						<>
							<InfoBoxBalancing />
							<div className="mt-2">
								<ImageLightbox
									thumbnailUrl={showOrder.order.image_url}
									fullSizeUrl={showOrder.order.image_url}
									alt={`medida ${showOrder.order.code}`}
									key={showOrder.order.code}
								/>
							</div>
						</>
					) : (
						<div>
							<OrderDashboardModal />
							
							<DashboardProducts />
							<DashboardOpers />
							<OperationsMaster />
							<OpersMaster />
							<DashboardVideoMain/>
							
						</div>
					)}
				</div>

      </div>
			
			
		</div>

	)
}

export default Sidebar