import React from 'react'
import {Pagination} from "@nextui-org/react"

const CustomPaginator = ({ total, initialPage, onChange }) => {
  return (
    <Pagination
      classNames={{
        wrapper: "gap-0 overflow-visible h-8 rounded border border-divider",
        item: "w-8 h-8 text-small rounded-none bg-transparent",
        cursor:
          "bg-gradient-to-b shadow-lg from-default-500 to-default-800 dark:from-default-300 dark:to-default-100 text-white font-bold",
      }}
      total={total}
      initialPage={initialPage}
      onChange={(page) => onChange(page)} // Llama a la función pasada por props
    />
  )
}
export default CustomPaginator


