import React from 'react';

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label: string;
  errorMessage?: string;
}

const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  min = 1,
  max,
  label,
  errorMessage,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= min && (!max || newValue <= max)) {
      onChange(newValue);
    }
  };

  const increment = () => {
    if (!max || value < max) {
      onChange(value + 1);
    }
  };

  const decrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  return (
    <div className="space-y-2">
      <label htmlFor="questionCount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="flex rounded-md shadow-sm">
        <button
          type="button"
          onClick={decrement}
          disabled={value <= min}
          className="relative inline-flex items-center px-3 py-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
        >
          -
        </button>
        <input
          type="number"
          id="questionCount"
          value={value}
          onChange={handleChange}
          min={min}
          max={max}
          className="block w-full min-w-0 flex-1 rounded-none border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
        <button
          type="button"
          onClick={increment}
          disabled={max !== undefined && value >= max}
          className="relative inline-flex items-center px-3 py-2 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
        >
          +
        </button>
      </div>
      {errorMessage && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
      )}
    </div>
  );
};

export default NumberInput;