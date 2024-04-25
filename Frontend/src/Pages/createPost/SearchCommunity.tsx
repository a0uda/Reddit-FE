import React, { useState, useEffect, useRef } from 'react';
import { Avatar, Input } from '@material-tailwind/react';
import { useQuery } from 'react-query';
import { fetchRequest } from '../../API/User';
import useSession from '../../hooks/auth/useSession';

interface Suggestion {
  name: string;
  profile_picture: string;
}

interface Props {
  setFieldValue: (fieldName: string, value: string) => void;
}

const SearchBar: React.FC<Props> = ({ setFieldValue }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [imageQuery, setImageQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const { user } = useSession();

  const searchBarRef = useRef<HTMLDivElement>(null);

  const { data } = useQuery('suggestions', () =>
    fetchRequest('users/communities')
  );

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setSuggestions(data.data);
    } else {
      setSuggestions([]);
    }
  }, [data]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchQuery(value);
    if (data && Array.isArray(data.data)) {
      const filteredSuggestions = data.data.filter((suggestion) =>
        suggestion.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    }

    setShowSuggestions(true);
  };

  const handleOptionClick = (suggestion: Suggestion) => {
    setSearchQuery(suggestion.name);
    setImageQuery(suggestion.profile_picture);
    setShowSuggestions(false);
    setFieldValue('community_name', suggestion.name);
    setFieldValue('post_in_community_flag', true.toString());
  };
  const handleOptionClickUser = (user: {
    username: string;
    imageUrl: string;
  }) => {
    setSearchQuery(user.username);
    setImageQuery(user.imageUrl);
    setShowSuggestions(false);
    setFieldValue('community_name', user.username);
    setFieldValue('post_in_community_flag', false.toString());
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchBarRef.current &&
      !searchBarRef.current.contains(event.target as Node)
    ) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='flex relative w-full md:w-1/4 lg:w-1/4' ref={searchBarRef}>
      <div className='relative w-full'>
        <div>
          {!searchQuery || imageQuery === '' ? (
            <svg
              className='text-gray-600 h-5 w-5 absolute top-3 left-3 fill-current z-10'
              xmlns='http://www.w3.org/2000/svg'
              xmlnsXlink='http://www.w3.org/1999/xlink'
              viewBox='0 0 56.966 56.966'
              xmlSpace='preserve'
            >
              <path d='M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23 s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92 c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17 s-17-7.626-17-17S14.61,6,23.984,6z' />
            </svg>
          ) : (
            <Avatar
              variant='circular'
              alt={searchQuery}
              src={imageQuery}
              style={{ width: '25px', height: '25px' }}
              className='absolute top-2 ms-2 z-10'
            />
          )}
        </div>

        <Input
          type='text'
          name='q'
          value={searchQuery}
          onChange={handleChange}
          onFocus={() => setShowSuggestions(true)}
          className='w-full border ps-10 h-12 shadow rounded-lg bg-white'
          placeholder='Search'
          crossOrigin={undefined}
        />
        <button>
          <svg
            className='h-5 w-5 absolute top-3 right-3'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            onClick={() => setShowSuggestions(true)}
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
        <ul className='absolute z-10 mt-12 w-full bg-white divide-y divide-gray-200 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600'>
          {user ? (
            <>
              <div className='m-2 ps-4 text-xs text-gray-600'>YOUR PROFILE</div>
              <li
                onClick={() => handleOptionClickUser(user)}
                className='flex items-start gap-4 p-2 m-0 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer'
              >
                <div className='flex flex-row gap-2'>
                  <Avatar
                    variant='circular'
                    alt={user.imageUrl}
                    src={user.imageUrl}
                    className='w-8 h-8'
                  />
                  <p className='font-body font-bold tracking-tight text-xs sm:text-sm md:text-base lg:text-lg text-gray-700 dark:text-gray-200 line-clamp-2 overflow-hidden text-ellipsis'>
                    {user.username}
                  </p>
                </div>
              </li>
            </>
          ) : null}

          <div className='m-2 ps-4 text-xs text-gray-600'>YOUR COMMUNITIES</div>
          {Array.isArray(suggestions) &&
            suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleOptionClick(suggestion)}
                className='flex items-start gap-4 p-2 m-0 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer'
              >
                <div className='flex flex-row gap-2'>
                  <Avatar
                    variant='circular'
                    alt={suggestion.name}
                    src={suggestion.profile_picture}
                    className='w-8 h-8'
                  />
                  <p className='font-body font-bold tracking-tight text-xs sm:text-sm md:text-base lg:text-lg text-gray-700 dark:text-gray-200 line-clamp-2 overflow-hidden text-ellipsis'>
                    {suggestion.name}
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
