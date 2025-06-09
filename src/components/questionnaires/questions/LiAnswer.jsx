import { Checkbox, CircularProgress, Input, Slider, Tooltip } from '@nextui-org/react'
import React, { useState } from 'react'
import { BsArrowDownRight, BsChatRight, BsCheck, BsCheckSquare, BsChevronBarUp, BsFastForward, BsFileEarmarkArrowDown, BsFileEarmarkArrowDownFill, BsFileExcel, BsFillArrowUpRightCircleFill, BsFillBagCheckFill, BsFillBagXFill, BsFillBarChartFill, BsFillCartCheckFill, BsFillChatRightFill, BsFillFileEarmarkArrowDownFill, BsFillPatchCheckFill, BsPieChart } from 'react-icons/bs'

import toast from 'react-hot-toast'
import { FaArrowRightArrowLeft, FaDeleteLeft } from 'react-icons/fa6'

const LiAnswer = ({ answer, idx }) => {
  const isBoolean = answer.boolean_value !== null
  const isInteger = answer.integer_value !== null

  return (
    <li className="bg-zinc-50 rounded px-3 py-2 border-l-4 border-secondary_two">
      <div className="flex items-center justify-between gap-2">
        <div className="flex-1 min-w-0">
          <span className="font-bold text-secondary_two mr-2">{idx + 1}.</span>
        
            <span
              className="text-gray-700 cursor-pointer w-full"
            >
              ¿{answer.question?.content}?
            </span>
        
        </div>
        
        <div className="flex-shrink-0 ml-2 flex justify-between items-center">
          {isInteger ? (
            <div className="flex flex-col items-end min-w-[120px]">
              <span className="text-sm font-semibold mb-1">{answer.integer_value} / 100</span>
              <div className="w-28 h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-secondary_two transition-all"
                  style={{
                    width: `${Math.min(100, Math.max(0, answer.integer_value))}%`
                  }}
                />
              </div>
            </div>
          ) : isBoolean ? (
            <span className={`text-sm font-semibold ${answer.boolean_value ? 'text-secondary_two' : 'text-red-500'}`}>
              {answer.boolean_value ? "Sí" : "No"}
            </span>
          ) : (
            <span className="text-xs text-gray-400">Sin respuesta</span>
          )}
          
        </div>
      </div>

      
    </li>
  )
}

export default LiAnswer