import { useState, MouseEvent, ChangeEvent } from 'react';
import RoundedButton from '../../Components/RoundedButton';
import Input from '../../Components/Input';

const generateUniqueID = () => {
  return `option_${Date.now()}`;
};

interface Option {
  key: string;
  options: string;
}

interface OptionsPollProps {
  setFieldValue: (field: string, value: unknown) => void;
}

function OptionsPoll({ setFieldValue }: OptionsPollProps) {
  const [options, setOptions] = useState<Option[]>([
    { key: '0', options: '' },
    { key: '1', options: '' },
  ]);
  const addOptionField = (): void => {
    setOptions([...options, { key: generateUniqueID(), options: '' }]);
  };

  const removeOptionField = (key: string): void => {
    const updatedOptions = options.filter((option) => option.key !== key);
    setOptions(updatedOptions);
    setFieldValue(
      'polls',
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      updatedOptions.map(({ key, ...rest }) => rest)
    );
  };

  return (
    <div className='flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 p-2 border border-gray-200 border-t-0'>
      <div className='flex flex-col p-4 bg-blue-50 space-y-2 w-full lg:w-1/3 lg:order-last'>
        <h3 className='font-semibold text-xs flex space-x-2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z'
            />
          </svg>
          <span className='mt-1'>Tips for Better Polls</span>
        </h3>
        <ul className='list-disc ml-4 space-y-1 text-xs'>
          <li>Suggest short, clear options</li>
          <li>Balance the number of options</li>
          <li>Choose the poll duration</li>
          <li>Options cannot be edited after post creation</li>
        </ul>
      </div>

      <div className='flex flex-col flex-grow space-y-4'>
        {options.map((option, index) => (
          <div key={option.key} className='flex items-center relative'>
            <Input
              className='flex-grow placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 !border !border-t-[rgb(176,190,197)] mt-4'
              placeholder={`Option`}
              type='text'
              value={option.options}
              NoCheck={true}
              onChange={(e) => {
                const updatedOptions = options.map((opt) =>
                  opt.key === option.key
                    ? { ...opt, options: e.target.value }
                    : opt
                );
                setOptions(updatedOptions);
                setFieldValue(`polls[${option.key}].options`, e.target.value);
              }}
            />
            {index > 1 ? (
              <>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6 absolute right-2 top-6'
                  onClick={() => removeOptionField(option.key)}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
                  />
                </svg>
              </>
            ) : null}
          </div>
        ))}

        <div className='flex flex-row justify-between'>
          <RoundedButton
            buttonBorderColor='border-none'
            buttonTextColor='text-blue-light font-bold text-base'
            buttonColor='bg-white'
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              addOptionField();
            }}
            buttonText='Add Option'
          />
          <VotingLengthDropdown setFieldValue={setFieldValue} />
        </div>
      </div>
    </div>
  );
}

function VotingLengthDropdown({ setFieldValue }: OptionsPollProps) {
  const [votingLength, setVotingLength] = useState<number>(5);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value) {
      const length = parseInt(value, 10);
      setFieldValue('polls_voting_length', length);
      setVotingLength(length);
    }
  };

  return (
    <div className='flex items-center space-x-2 p-4 text-xs'>
      <label
        className='block font-medium text-gray-600 w-full'
        htmlFor='voting-length'
      >
        Voting Length:
      </label>
      <div className='w-20'>
        <select
          id='voting-length'
          value={votingLength.toString()}
          onChange={handleChange}
          className='border-none outline-none'
        >
          {[...Array(7)].map((_, index) => (
            <option
              key={index + 1}
              value={(index + 1).toString()}
              className='w-20'
            >
              {index === 0 ? `${index + 1} day` : `${index + 1} days`}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default OptionsPoll;
