import React, {useEffect} from 'react'
import Card from "../views/Card.jsx";
import {FaBox, FaCog, FaShoppingCart, FaUsers} from "react-icons/fa";
import TitleDashboard from "../../ui/TitleDashboard.jsx";


const BalanceDashboard = () => {


  return (
    <>
      <TitleDashboard
        title="Balanceos"
      />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
        <Card icon={<FaShoppingCart />} title="Orders" value="140"/>
        <Card icon={<FaBox />} title="Products" value="120"/>
        <Card icon={<FaUsers />} title="Users" value="30"/>
        <Card icon={<FaCog />} title="Settings" value="11"/>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <div className='bg-white p-4 dark:bg-zinc-800 rounded-lg shadow-md'>
          <h3 className='text-lg font-semibold mb-4'>Sales Data</h3>

        </div>
        <div className='bg-white p-4 dark:bg-zinc-800 rounded-lg shadow-md'>
          <h3 className='text-lg font-semibold mb-4'>Products Data</h3>

        </div>

      </div>
    </>
  )
}
export default BalanceDashboard
