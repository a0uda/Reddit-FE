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
      <div className='flex gap-2'>
        <Typography color='gray' className='text-sm uppercase'>
          Search Results
        </Typography>
        {searchTypes.map((searchType) => (
          <Link
            key={searchType.buttonName}
            to={`/search/?q=${q}&type=${searchType.buttonLink}`}
            className={`${searchType.buttonLink === type ? 'bg-neutral-500' : ''}  text-black rounded-full p-[10px] mx-[5px]  hover:underline`}
          >
            <div className='text-black text-sm'>{searchType.buttonName}</div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default SearchTypes;
