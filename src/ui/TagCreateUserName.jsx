import { useState, useRef, useEffect } from "react";
import { FaPencilRuler, FaUserEdit } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

const TagCreateUserName = ({user_name}) => {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef(null);

  

  // Cierra el popover al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={popoverRef}>
      {/* Trigger */}
      <button 
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center"
      >
        <FaUserEdit size={20} className="text-secondary_two"/>
      </button>

      {/* Popover content */}
      {open && (
        <div
          className="absolute left-full top-1/2 -translate-y-1/2 ml-2 w-56 
          bg-white border border-gray-200 rounded-xl shadow-lg z-50"
        >
          <div className="p-4">
            <h3 className="font-semibold text-gray-800">Creador</h3>
            <p className="text-sm text-gray-600 mt-1">
              {user_name}
            </p>
          </div>
        </div>
      )}
    </div>

  );
}


export default TagCreateUserName