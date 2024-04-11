import { useState, MouseEvent, ChangeEvent } from 'react';
import RoundedButton from '../../Components/RoundedButton';
import Input from '../../Components/Input';

interface Option {
  value: string;
}

interface OptionsPollProps {
  setFieldValue: (
    field: string,
    value: unknown,
    shouldValidate?: boolean
  ) => void;
}

function OptionsPoll({ setFieldValue }: OptionsPollProps) {
  const [options, setOptions] = useState<Option[]>([
    { value: '' },
    { value: '' },
  ]);

  const addOptionField = (): void => {
    setOptions([...options, { value: '' }]);
  };

  return (
    <div className='flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 p-2 border border-gray-200 border-t-0'>
      <div className='flex flex-col p-4 bg-blue-50 space-y-2 w-full lg:w-1/3 lg:order-last'>
        <h3 className='font-semibold text-xs'>Tips for Better Polls</h3>
        <ul className='list-disc ml-4 space-y-1 text-xs'>
          <li>Suggest short, clear options</li>
          <li>Balance the number of options</li>
          <li>Choose the poll duration</li>
          <li>Options cannot be edited after post creation</li>
        </ul>
      </div>

      <div className='flex flex-col flex-grow space-y-4'>
        {options.map((_option, index) => (
          <Input
            className='placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 !border !border-t-[rgb(176,190,197)] mt-4'
            key={index}
            placeholder={`option ${index + 1}`}
            type='text'
            NoCheck={true}
            onChange={(e) =>
              setFieldValue(`polls[${index}].option`, e.target.value)
            }
          />
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
