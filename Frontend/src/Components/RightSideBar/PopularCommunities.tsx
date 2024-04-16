import { useState } from 'react';
import { List, Card, Typography } from '@material-tailwind/react';
import CommunityItem from './CommunityItem';
// import communityList from './CommunityList.ts';
import { useQuery } from 'react-query';
import { fetchRequest } from '../../API/User';
import LoadingProvider from '../LoadingProvider';

interface CommunityItemProps {
  src: string;
  name: string;
  membersNumber: number;
}

export function PopularCommunities() {
  const [showAll, setShowAll] = useState(false);

  const { data, isError, isLoading } = useQuery(
    'popular communities data',
    () => fetchRequest('communities/get-popular-communities')
  );
  console.log(data);

  const communityList = data?.data ?? [];

  const displayedCommunities = showAll
    ? communityList
    : communityList.slice(0, 5);

  console.log(displayedCommunities);

  return (
    <div
      style={{ maxHeight: '88vh', overflowY: 'auto', scrollbarWidth: 'thin' }}
    >
      <Card className='w-72 bg-gray-100 rounded-2xl shadow-none p-2 pt-4 pb-4 min-w-0'>
        <Typography
          variant='small'
          className='p-2 font-body font-semibold uppercase -tracking-tight text-xs text-gray-600'
        >
          POPULAR COMMUNITIES
        </Typography>
        <LoadingProvider error={isError} isLoading={isLoading}>
          <div>
            <List>
              {displayedCommunities.map(
                (community: CommunityItemProps, index: number) => (
                  <CommunityItem
                    key={index}
                    src={community.src}
                    name={community.name}
                    membersNumber={community.membersNumber}
                  />
                )
              )}
            </List>
            {!showAll && (
              <button
                style={{ width: '75px', height: '35px' }}
                className='hover:bg-gray-300 rounded-full font-body font-thin -tracking-tight text-xs text-gray-900'
                onClick={() => setShowAll(true)}
              >
                See more
              </button>
            )}
            {showAll && (
              <button
                style={{ width: '75px', height: '35px' }}
                className='hover:bg-gray-300 rounded-full font-body font-thin -tracking-tight text-xs text-gray-900'
                onClick={() => setShowAll(false)}
              >
                See less
              </button>
            )}
          </div>
        </LoadingProvider>
      </Card>
    </div>
  );
}
