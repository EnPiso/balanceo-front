import {Button} from "@nextui-org/react";
import {FaFileExcel} from "react-icons/fa6";
import React, {useState} from "react";
import {AiTwotoneFolderOpen} from "react-icons/ai";
import ModalProducts from "./ModalProducts.jsx";
 const DashboardProducts = () => {

     const [isOpen, setIsOpen] = useState(false);


     const handleClose = () => setIsOpen(false);
     const handleOpen = () => setIsOpen(true);
     return (
        <div className="flex flex-col gap-2">
            
                <button 
                    onClick={handleOpen}
                    className="flex justify-center font-bold border-1 border-secondary_two px-1 py-1 rounded-md ">
                    <AiTwotoneFolderOpen className="text-secondary_one mr-2 mt-1" size={20}/>
                    <span className="text-secondary_one mt-1">
                        Productos
                    </span>
                </button>
       
            {
                isOpen && <ModalProducts
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    handleClose={handleClose}
                    handleOpen={handleOpen}
                />
            }


        </div>
    )
}

export default DashboardProducts;