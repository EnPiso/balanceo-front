import React from "react";
import { FaFile } from "react-icons/fa6";
import { FaFileArchive } from "react-icons/fa";

const OrdersBreadcrumb = ({ isArchive, setIsArchive }) => {
  return (
    <div className="hidden lg:block ml-2">
      <div className="flex items-center gap-2 text-md font-medium py-3 text-slate-500 dark:text-slate-400">
        <button
          onClick={() => setIsArchive(false)}
          className={`${!isArchive ? "text-slate-800 dark:text-slate-100" : "text-slate-500 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-300"} inline-flex items-center gap-1`}
        >
          <FaFile className="text-slate-400 dark:text-slate-500" size={12} />
          <span>Ordenes de produccion</span>
        </button>
        <span className="text-slate-300 dark:text-slate-600">/</span>
        <button
          onClick={() => setIsArchive(true)}
          className={`${isArchive ? "text-slate-800 dark:text-slate-100" : "text-slate-500 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-300"} inline-flex items-center gap-1`}
        >
          <FaFileArchive className="text-red-500" size={12} />
          <span>Archivadas</span>
        </button>
      </div>
    </div>
  );
};

export default OrdersBreadcrumb;
