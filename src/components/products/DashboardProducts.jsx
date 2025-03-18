import {Button} from "@nextui-org/react";
import {FaFileExcel} from "react-icons/fa6";
import React, {useState} from "react";
import {AiTwotoneFolderOpen} from "react-icons/ai";
import ModalProducts from "./ModalProducts.jsx";
import { FaFolder } from "react-icons/fa";
 const DashboardProducts = () => {

     const [isOpen, setIsOpen] = useState(false);


     const handleClose = () => setIsOpen(false);
     const handleOpen = () => setIsOpen(true);
     return (
        <div className="flex flex-col gap-2">
            <button onClick={handleOpen} className="mb-4">
                <span className="text-secondary_two flex flex-col items-center justify-center text-sm">
                    <span className="text-secondary_two flex flex-col items-center justify-center text-sm">
                        <FaFolder className="text-secondary_two items-center block lg:hidden" size={24} />
                        <FaFolder className="text-secondary_two items-center hidden lg:block" size={40} />
                        <span className="py-3 uppercase font-bold">Productos</span>
                    </span>
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