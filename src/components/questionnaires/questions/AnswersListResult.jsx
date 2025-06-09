import { CircularProgress } from '@nextui-org/react'
import React from 'react'
import LiQuestion from './LiQuestion'
import LiAnswer from './LiAnswer'

export const AnswersListResult = ({answers}) => {
  return (
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">
            Preguntas
          </h2>
          <h2 className="text-lg font-semibold mb-2 text-gray-700">
            Tipos 
          </h2>
        </div>
        
        
        <ul className="space-y-3">
          {answers.length === 0 ? (
            <li className="text-gray-400 italic">No hay preguntas registradas.</li>
          ) : (
            answers.map((answer, idx) => (
              <LiAnswer
                answer={answer}
                idx={idx}
              />
            ))
          )}
        </ul>
        
      </div>
  )
}
