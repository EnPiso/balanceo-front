import { Checkbox, Slider } from '@nextui-org/react';
import React from 'react';

const LiQuesResponse = ({ idx, q, value, onChange }) => {
  return (
    <li className="bg-zinc-50 rounded px-3 py-2 border-l-4 border-secondary_two">
      <div className="flex items-center justify-between gap-2">
        <div className="flex-1 min-w-0">
          <span className="font-bold text-secondary_two mr-2">{idx + 1}.</span>
          <span className="text-gray-700 cursor-pointer w-full">
            ¿{q.content}?
          </span>
        </div>

        <div className="flex-shrink-0 ml-2 flex items-center">
          {q.question_type === "boolean" ? (
            <Checkbox
              color="default"
              isSelected={!!value}
              onValueChange={onChange}
              className="ml-2"
            />
          ) : (
            <div className="flex items-center gap-2 min-w-[120px]">
              <Slider
                color="foreground"
                size="sm"
                step={1}
                minValue={0}
                maxValue={100}
                value={value || 0}
                onChange={onChange}
                className="w-24"
                aria-label="Valor numérico"
              />
              <span className="text-xs text-primary_one font-bold">{value || 0}</span>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default LiQuesResponse;
