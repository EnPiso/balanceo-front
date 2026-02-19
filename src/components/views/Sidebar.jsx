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
import { FaSearch } from 'react-icons/fa';
import { FaEyeSlash, FaUserGroup } from 'react-icons/fa6';
import OrdersManualCreate from '../orders/manual/OrdersManualCreate.jsx';
import DashboardVideoMain from '../balances/balancing/tableOperations/videoOperations/videoSidebarMain/DashboardVideoMain.jsx';
import { PolyvalencesDashboard } from '../polyvalencesTimes/PolyvalencesDashboard.jsx';
import { isOrderOrProduct } from '../../infraestructure/states/states_manual_order.js';
import { GiSewingMachine  } from 'react-icons/gi';
import MachinesMaster from '../machines/MachinesMaster.jsx';
import { currentUser, isLoadingUser } from '../../infraestructure/states/states_views.js';



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

	const [isOrderOr, setIsOrderOr] = useRecoilState(isOrderOrProduct);
	
	const toggleLightbox = () => setIsOpen(!isOpen);

	const [user, setUser] = useRecoilState(currentUser);
  const [isLoading, setIsLoading] = useRecoilState(isLoadingUser)

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
		<div className="bg-white dark:bg-zinc-900 text-slate-700 dark:text-slate-200 h-screen fixed w-[var(--sidebar-width)] border-r border-slate-200 dark:border-zinc-800 z-50">
			<div className="flex flex-col h-full">
				<div className="px-4 pt-2">
					<button onClick={handleSideBar} className="flex flex-col items-center text-center gap-2 w-full">
						<img
							className="w-16 h-16 object-contain"
							src="/icon/icon.jpeg"
							alt="Icono de Balance"
						/>
						<div className="leading-tight">
							<p className="text-primary_two font-[900] text-3xl m-0">
								<span className="text-secondary_two">En</span>Piso
							</p>
							<p className="text-slate-400 text-md tracking-wide uppercase mt-1">Balanceos</p>
						</div>
					</button>
				</div>

				<div className="flex-1 overflow-y-auto px-2 mt-4">
					{objBalancing ? (
						<div className='ml-4'>
							<InfoBoxBalancing />
							{isOrderOr && showOrder.order.image_url && (
								<div className="mt-2">
									<ImageLightbox
										thumbnailUrl={showOrder.order.image_url}
										fullSizeUrl={showOrder.order.image_url}
										alt={`medida ${showOrder.order.code}`}
										key={showOrder.order.code}
									/>
								</div>
							)}
						</div>
					) : (
						<div className="space-y-1">
							{user && (user.role === 'admin' || user.role === 'supervisor') && (
								<>
									<OrderDashboardModal />
									<DashboardProducts />
									<DashboardOpers />
									<OperationsMaster />
									<OpersMaster />
									<MachinesMaster />
								</>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default Sidebar