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


const Sidebar = () => {
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
		<div className="bg-gray-100 text-zinc-900 h-screen px-4 fixed w-16 md:w-64 border-r border-gray-300 dark:border-gray-600 dark:bg-zinc-900 dark:text-white">
			
			<button onClick={handleSideBar}>
				<h1 className='text-2xl font-bold hidden md:block mt-4 text-center uppercase '>
					<span className="underline dark:text-zinc-300 text-zinc-700">
						Balance
					</span>
					<span className="bg-zinc-800 text-zinc-200 black:text-zinc-800 px-2 py-2 rounded-3xl">
						app
					</span>
				</h1>
			</button>
			
			{
				objBalancing ? (
					<>
						<InfoBoxBalancing/>
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
					<>
						<div
							className="bg-gray-100 dark:bg-zinc-800 p-4 rounded-lg shadow-md max-w-md mx-auto space-y-3 mt-4">

							<OrderDashboardModal/>

							<DashboardProducts/>
							<DashboardOpers/>
							<OperationsMaster/>
							<OpersMaster/>

						</div>



					</>

				)
			}

		</div>
	)
}

export default Sidebar