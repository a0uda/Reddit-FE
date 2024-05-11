import React from 'react';

interface Props {
  selectedTime?: string | null;
  setSelectedTime?: (time: string) => void;
}

const TimeSelector: React.FC<Props> = ({ selectedTime, setSelectedTime }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = event.target.value;
    if (setSelectedTime) {
      setSelectedTime(newTime);
    }
  };

  return (
    <form className='max-w-[8.5rem] mx-auto text-black ms-2'>
      <div className='flex'>
        <input
          id='time'
          type='time'
          className=' rounded-s-lg bg-gray-50 border text-gray-900 leading-none focus:ring-blue-500 focus:border-blue-500 block flex-1 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          min='09:00'
          max='18:00'
          defaultValue={selectedTime || '00:00'}
          onChange={handleChange}
          required
        />
      </div>
    </form>
  );
};

export default TimeSelector;
