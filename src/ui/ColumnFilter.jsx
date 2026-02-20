import React, { useState, useRef, useEffect } from 'react';
import { BsFilter } from 'react-icons/bs';

const OPERATORS = [
  { label: 'Contiene', value: 'cont' },
  { label: 'Igual a', value: 'eq' },
  { label: 'Comienza con', value: 'start' },
  { label: 'No contiene', value: 'not_cont' },
];

const ColumnFilter = ({ column, filterKey, onApply, onClear, active, currentFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [operator, setOperator] = useState('cont');
  const [value, setValue] = useState('');
  const ref = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setOperator(currentFilter?.op ?? 'cont');
      setValue(currentFilter?.val ?? '');
    }
  }, [isOpen]);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleApply = () => {
    if (value.trim()) onApply(filterKey, operator, value.trim());
    setIsOpen(false);
  };

  const handleClear = () => {
    setValue('');
    setOperator('cont');
    onClear(filterKey);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        onClick={(e) => { e.stopPropagation(); setIsOpen(v => !v); }}
        className={`ml-1 p-0.5 rounded transition-colors ${
          active
            ? 'text-secondary_two'
            : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200'
        }`}
        title={`Filtrar por ${column}`}
      >
        <BsFilter size={16} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-600 shadow-xl rounded-lg p-4 z-50 w-64">
          <h4 className="font-semibold text-zinc-800 dark:text-zinc-100 text-sm mb-1">
            Filtro: {column}
          </h4>
          <hr className="border-zinc-200 dark:border-zinc-700 mb-3" />
          <p className="text-xs text-zinc-400 mb-3">Filtro de texto</p>

          <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">
            Operador
          </label>
          <select
            value={operator}
            onChange={(e) => setOperator(e.target.value)}
            className="w-full border border-zinc-300 dark:border-zinc-600 rounded-md px-2 py-1.5 text-sm bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 mb-3 focus:outline-none focus:ring-1 focus:ring-secondary_two"
          >
            {OPERATORS.map((op) => (
              <option key={op.value} value={op.value}>{op.label}</option>
            ))}
          </select>

          <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">
            Valor
          </label>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleApply()}
            placeholder="Valor"
            className="w-full border border-zinc-300 dark:border-zinc-600 rounded-md px-2 py-1.5 text-sm bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 mb-4 focus:outline-none focus:ring-1 focus:ring-secondary_two"
          />

          <div className="flex gap-2">
            <button
              onClick={handleClear}
              className="flex-1 text-red-500  rounded-md py-1.5 text-sm font-medium transition-colors"
            >
              Limpiar
            </button>
            <button
              onClick={handleApply}
              className="flex-1  text-secondary_one  rounded-md py-1.5 text-sm font-medium transition-colors"
            >
              Aplicar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColumnFilter;
