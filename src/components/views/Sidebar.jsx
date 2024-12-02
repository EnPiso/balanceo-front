import React from 'react'
import {sidebarData} from "../../infraestructure/data/sidebar.jsx";
import {useRecoilState} from "recoil";
import {sideBarNav} from "../../infraestructure/states/states_navigation.js";
import InfoBoxBalancing from "../balances/balancing/sidebarForm/InfoBoxBalancing.jsx";
import ModalDashboardOrder from "../orders/ModalDashboardOrder.jsx";
import OrderDashboardModal from "../orders/OrderDashboardModal.jsx";
import {orderObjBalancing, showOrderObj} from "../../infraestructure/states/order_states.js";
import ImageLightbox from "../orders/import/ImageLightBox.jsx";


const Sidebar = () => {
	const [sideArray,setSideArray] = useRecoilState(sideBarNav)
	const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);
	const [showOrder, setShowOrder] = useRecoilState(showOrderObj);


	return (
		<div className="bg-gray-100 text-zinc-900 h-screen px-4 fixed w-16 md:w-64 border-r border-gray-300 dark:border-gray-600 dark:bg-zinc-900 dark:text-white">
			<h1 className='text-2xl font-bold hidden md:block mt-4 text-center uppercase '>
				<span className="underline dark:text-zinc-300 text-zinc-700">
					Balance
				</span>
				<span className="  bg-zinc-800 text-zinc-200 black:text-zinc-800 px-2 py-2 rounded-3xl">
					app
				</span>
			</h1>
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

					<div className="bg-gray-100 dark:bg-zinc-800 p-4 rounded-lg shadow-md max-w-md mx-auto space-y-3 mt-4">

						<OrderDashboardModal/>

					</div>
				)
			}

		</div>
	)
}

export default Sidebar