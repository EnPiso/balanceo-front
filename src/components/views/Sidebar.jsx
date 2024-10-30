import React from 'react'
import {sidebarData} from "../../infraestructure/data/sidebar.jsx";
import {useRecoilState} from "recoil";
import {sideBarNav} from "../../infraestructure/states/states_navigation.js";
import InfoBoxBalancing from "../balances/balancing/sidebarForm/InfoBoxBalancing.jsx";


const Sidebar = () => {
	const [sideArray,setSideArray] = useRecoilState(sideBarNav)


	return (
		<div className="bg-gray-100 text-zinc-900 h-screen px-4 fixed w-16 md:w-64 border-r border-gray-300 dark:border-gray-600 dark:bg-zinc-900 dark:text-white">
			<h1 className='text-2xl font-bold hidden md:block mt-4 text-center uppercase '>
				<span className="underline dark:text-zinc-300 text-zinc-700">
					Balanceos
				</span>
				<span className="  bg-zinc-800 text-zinc-200 black:text-zinc-800 px-2 py-2 rounded-3xl">
					app
				</span>
			</h1>
			<InfoBoxBalancing/>
		</div>
	)
}

export default Sidebar