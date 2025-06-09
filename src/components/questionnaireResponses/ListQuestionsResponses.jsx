import React from 'react';
import LiQuesResponse from './LiQuesResponse';
import ImagesImport from '../orders/import/ImagesImport';

const ListQuestionsResponses = ({
  questionsList,
  operQuestion,
  operQuestionnaire,
  responses,
  setResponses
}) => {

  const handleChange = (questionId, value) => {
    setResponses(prev =>
      prev.some(r => r.question_id === questionId)
        ? prev.map(r =>
            r.question_id === questionId ? { ...r, value } : r
          )
        : [...prev, { question_id: questionId, value }]
    );
  };

  return (
    <div>
      <div className="bg-white rounded-lg shadow p-4">
        <div className="mb-4 flex flex-col md:flex-row gap-4">
          <div className="flex-1 bg-zinc-100 rounded p-3 flex flex-col justify-center">
            <div className="text-gray-700 text-base">
              <div className="flex items-center gap-4">
                {operQuestion?.avatar && (
                  <ImagesImport imageUrl={operQuestion.avatar} />
                )}
                <div>
                  <div className="font-bold text-secondary_two text-lg">{operQuestion?.name}</div>
                  <div className="text-xs text-gray-500">CC: {operQuestion?.id_oper}</div>
                  <div className="text-xs text-gray-500">Cuestionario: {operQuestionnaire?.title}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-lg font-semibold mb-2 text-gray-700">Preguntas</h2>
        <ul className="space-y-3">
          {questionsList.length === 0 ? (
            <li className="text-gray-400 italic">No hay preguntas registradas.</li>
          ) : (
            questionsList.map((q, idx) => (
              <LiQuesResponse
                key={q.id}
                q={q}
                idx={idx}
                value={responses.find(r => r.question_id === q.id)?.value}
                onChange={val => handleChange(q.id, val)}
              />
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default ListQuestionsResponses;
