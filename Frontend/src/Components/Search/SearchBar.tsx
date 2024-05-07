import { Menu, MenuHandler, MenuList } from '@material-tailwind/react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../utils/helper_functions';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import SearchDropdown from './SearchDropdown';
import useSearch from '../../hooks/useSearch';

type RecentSearchType = {
  title: string;
  icon?: string;
};

const SearchBar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [recentSearch, setRecentSearch] = useState<RecentSearchType[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: communities } = useSearch(
    `/search/communities?query=${search}&pageSize=5`
  );
  const { data: users } = useSearch(
    `/search/people?query=${search}&pageSize=5`
  );

  return (
    <>
      <Menu
        open={isFocused}
        handler={() => {
          setIsFocused((cur) => !cur);
        }}
        offset={{ mainAxis: -41 }}
        placement='bottom'
        dismiss={{
          itemPress: false,
        }}
      >
        <MenuHandler>
          <div
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-full bg-neutral-muted absolute max-w-[550px] w-full'
            )}
          >
            <HiMagnifyingGlass size={20} className='fill-black' />
            <span className='text-black/80 font-light'>Search Reddit</span>
          </div>
        </MenuHandler>
        <MenuList className='*:focus:bg-transparent *:hover:bg-transparent p-0 pt-1 hidden z-30 shadow-md shadow-black/25 max-w-[550px] w-full rounded-3xl lg:block min-h-24 max-h-[calc(100vh-3.5rem)]'>
          <div
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-full bg-neutral-muted absolute z-30 max-w-[550px] w-full h-10',
              isFocused
                ? ' bg-white border-b-2 border-neutral-muted relative items-start rounded-none rounded-t-xl overflow-y-auto overflow-x-hidden'
                : ''
            )}
          >
            <HiMagnifyingGlass size={20} className='fill-black' />
            <input
              className='!border-0 bg-transparent w-full focus:outline-none placeholder:text-black/80 placeholder:font-light'
              placeholder='Search Reddit'
              aria-label='Search Reddit'
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setIsFocused(false);
                  setSearch('');
                  setRecentSearch((prev) => [
                    { title: search },
                    ...prev.filter((item) => item.title !== search),
                  ]);
                  navigate(`/search/?q=${search}&type=link`);
                }
              }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              ref={inputRef}
              onBlur={() => inputRef.current?.focus()}
            />
          </div>
          <div className='hidden z-50 max-w-[550px] w-full rounded-none rounded-b-xl lg:block'>
            <SearchDropdown
              recent={recentSearch}
              setRecent={setRecentSearch}
              setIsFocused={setIsFocused}
              searchQuery={search}
              setSearch={setSearch}
              communities={communities || []}
              users={users || []}
            />
          </div>
        </MenuList>
      </Menu>
    </>
  );
};

export default SearchBar;
