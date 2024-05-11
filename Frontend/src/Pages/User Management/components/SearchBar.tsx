import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
const SearchBar = ({
  handleSearch,
  setSearchQuery,
}: {
  handleSearch: () => void;
  setSearchQuery: (x: string) => void;
}) => {
  return (
    <div className='bg-gray-200 mt-4 px-3 py-3 rounded-t-md'>
      <div className=' flex items-center w-[40%]'>
        <input
          placeholder='Search for a user'
          className='rounded-r-none h-10 flex-grow  border-[1px] rounded-l-md border-gray-500 px-2 py-1'
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
        <MagnifyingGlassIcon
          onClick={handleSearch}
          className=' cursor-pointer flex items-center justify-center rounded-r-md bg-gray-500 text-white min-w-10 w-10 h-10'
        />
      </div>
    </div>
  );
};

export default SearchBar;
