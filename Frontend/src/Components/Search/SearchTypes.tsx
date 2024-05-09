import { Typography } from '@material-tailwind/react';
import { Link, useSearchParams } from 'react-router-dom';

const SearchTypes = () => {
  const searchTypes = [
    {
      buttonName: 'Posts',
      buttonLink: 'link',
    },
    {
      buttonName: 'Communities',
      buttonLink: 'sr',
    },
    {
      buttonName: 'Comments',
      buttonLink: 'comment',
    },
    {
      buttonName: 'People',
      buttonLink: 'user',
    },
  ];

  const [searchParams] = useSearchParams();
  const q = searchParams.get('q');
  const type = searchParams.get('type');

  return (
    <>
      <div className='flex items-center gap-1 my-2 font-semibold w-0 min-w-full'>
        <Typography
          variant='small'
          className='font-semibold text-xs uppercase mr-4 shrink-0'
        >
          Search Results
        </Typography>
        <div className='flex items-center gap-1 overflow-x-auto'>
          {searchTypes.map((searchType) => (
            <Link
              key={searchType.buttonName}
              to={`/search/?q=${q}&type=${searchType.buttonLink}`}
              reloadDocument
              className={`${searchType.buttonLink === type ? 'bg-neutral-500' : ''}  text-black rounded-full p-3 px-5 mx-[5px]  hover:underline`}
            >
              <div className='text-black text-sm'>{searchType.buttonName}</div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchTypes;
