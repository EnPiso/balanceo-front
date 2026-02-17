import React from 'react'
import Card from './Card'
import { FaBox, FaCog, FaShoppingCart, FaUsers } from 'react-icons/fa'
import DashboardTable from "./table/DashboardTable.jsx";
import {useRecoilState} from "recoil";
import {sideBarNav} from "../../infraestructure/states/states_navigation.js";
import BalanceDashboard from "../balances/BalanceDashboard.jsx";
import {BalancingDashboard} from "../balances/balancing/BalancingDashboard.jsx";
import CreateBalancing from "../balances/create_balance/CreateBalancing.jsx";


const Dashboard = () => {
  const [sideArray,setSideArray] = useRecoilState(sideBarNav)

  return (
    <div className='grow p-8'>
      {
        sideArray === 1 && <BalancingDashboard/> ||
        sideArray === 2 && <CreateBalancing/>
      }
    </div>
  )
}

export default Dashboard