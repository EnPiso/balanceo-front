import React from 'react'
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
		<div className="bg-zinc-800 text-zinc-900 h-screen px-4 fixed  w-64 border-r border-gray-300 dark:border-gray-600 dark:bg-zinc-900 dark:text-white z-50">
			<div className="flex justify-center mt-4">
				<button onClick={handleSideBar}>
					<img
						className="w-24 h-24 object-contain" // Ajusta 'w-8 h-8' al tamaño de ícono deseado
						src="/icon/icon.jpeg"
						alt="Icono de Balance" // Añade un texto alternativo descriptivo
					/>
					<span className="text-primary_two font-black text-lg">EnPiso</span> <br />
					<small className="text-secondary_two font-bold ml-2">BALANCEOS</small>
				</button>
			</div>
		
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
				<div className="bg-gray-100 dark:bg-zinc-800 p-4 rounded-lg shadow-md max-w-md mx-auto space-y-3 ">
					<OrderDashboardModal />
					<DashboardProducts />
					<DashboardOpers />
					<OperationsMaster />
					<OpersMaster />

					<div className="flex flex-col gap-2">
						<button 
								onClick={toggleSidebar}
								className="flex justify-center font-bold border-1 border-secondary_two px-1 py-1 rounded-md ">
								<FaEyeSlash className="text-secondary_one mr-2 mt-1" size={20}/>
								<span className="text-secondary_one mt-1">
									Ocultar
								</span>
						</button>

					</div>
					
				</div>
			)}
		</div>

	)
}

export default Sidebar