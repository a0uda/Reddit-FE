import React, { useState } from 'react';
import { Avatar } from '@material-tailwind/react';

interface Suggestion {
  community_id: string;
  community_name: string;
  image_url: string;
}

interface Props {
  setFieldValue: (fieldName: string, value: string) => void;
  //   set: (fieldName: string, value: string) => void;
}

const SearchBar: React.FC<Props> = ({ setFieldValue }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [imageQuery, setImageQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const Suggestions: Suggestion[] = [
    {
      community_id: '1',
      community_name: 'r/announcements',
      image_url:
        'https://styles.redditmedia.com/t5_2qgzy/styles/communityIcon_rvt3zjh1fc551.png',
    },
    {
      community_id: '',
      community_name: 'r/annou',
      image_url:
        'https://styles.redditmedia.com/t5_2qh1u/styles/communityIcon_21ykcg22rm6c1.png',
    },
  ];

  // Function to handle input change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchQuery(value);
    const newSuggestions = Suggestions.filter((suggestion) =>
      suggestion.community_name.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(newSuggestions);
    setShowSuggestions(true);
  };

  return (
    <div className='dark:bg-gray-800 flex relative'>
      <div className='relative'>
        <div>
          {!searchQuery || imageQuery === '' ? (
            <svg
              className='text-gray-600 h-5 w-5 absolute top-3.5 left-3 fill-current'
              xmlns='http://www.w3.org/2000/svg'
              xmlnsXlink='http://www.w3.org/1999/xlink'
              version='1.1'
              x='0px'
              y='0px'
              viewBox='0 0 56.966 56.966'
              xmlSpace='preserve'
            >
              <path d='M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23 s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92 c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17 s-17-7.626-17-17S14.61,6,23.984,6z'></path>
            </svg>
          ) : (
            <Avatar
              variant='circular'
              alt={searchQuery}
              src={imageQuery}
              style={{ width: '25px', height: '25px' }}
              className='absolute top-3 ms-2'
            />
          )}
        </div>

        <input
          type='text'
          name='q'
          value={searchQuery}
          onChange={handleChange}
          className='w-full border ps-10 h-12 shadow p-4 rounded-lg dark:text-gray-800 dark:border-gray-700 dark:bg-gray-200'
          placeholder='search'
        />
        <button>
          <svg
            className='h-5 w-5 absolute top-3.5 right-3'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='m19.5 8.25-7.5 7.5-7.5-7.5'
            />
          </svg>
        </button>
      </div>
      {showSuggestions && (
        <ul className='absolute z-10 mt-16 w-1/4 bg-white divide-gray-200 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600 dark:text-gray-200'>
          <div className='m-2 ps-4 text-xs text-gray-600'>YOUR COMMUNITIES</div>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => {
                setSearchQuery(suggestion.community_name);
                setImageQuery(suggestion.image_url);
                setShowSuggestions(false);
                setFieldValue('community_name', suggestion.community_name);
                setFieldValue('community_id', suggestion.community_id);
              }}
              className='mx-0 flex items-start gap-4 pt-0 pb-2 p-0 m-0 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600'
            >
              <div className='flex flex-row justify-start gap-2 pt-0 m-2'>
                <Avatar
                  variant='circular'
                  alt={suggestion.community_name}
                  src={suggestion.image_url}
                  style={{ width: '30px', height: '30px' }}
                />
                <p className='font-body font-bold -tracking-tight text-xs text-gray-700 line-clamp-2 overflow-hidden text-ellipsis'>
                  {suggestion.community_name}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
