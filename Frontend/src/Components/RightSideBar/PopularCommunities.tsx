import { useState } from 'react';
import { List, Card, Typography } from '@material-tailwind/react';
import CommunityItem from './CommunityItem';
// import communityList from './CommunityList.ts';
import { useQuery } from 'react-query';
import { fetchRequest } from '../../API/User';
import LoadingProvider from '../LoadingProvider';

interface CommunityItemProps {
  _id: string;
  profile_picture: string;
  name: string;
  members_count: number;
}

export function PopularCommunities() {
  const [showAll, setShowAll] = useState(false);

  const { data, isError, isLoading } = useQuery(
    'popular communities data',
    () => fetchRequest('communities/get-community-names-by-popularity')
  );
  // console.log(data);

  const communityList = data?.data ?? [];

  const displayedCommunities = showAll
    ? communityList
    : communityList.slice(0, 5);

  // console.log(displayedCommunities);

  return (
    <div
      style={{ maxHeight: '88vh', overflowY: 'auto', scrollbarWidth: 'thin' }}
      data-testid='popular-communities-container'
    >
      <Card className='w-[19rem] bg-gray-100 rounded-2xl shadow-none p-2 pt-4 pb-4 min-w-0'>
        <Typography
          variant='small'
          className='p-2 font-body font-semibold uppercase -tracking-tight text-xs text-gray-600'
          data-testid='popular-communities-title'
        >
          POPULAR COMMUNITIES
        </Typography>
        <LoadingProvider error={isError} isLoading={isLoading}>
          <div>
            <List data-testid='community-list'>
              {displayedCommunities.map(
                (community: CommunityItemProps, index: number) => (
                  <CommunityItem
                    key={index}
                    src={community.profile_picture}
                    name={community.name}
                    membersNumber={community.members_count}
                    data-testid={`community-item-${index}`}
                  />
                )
              )}
            </List>
            {!showAll && (
              <button
                style={{ width: '75px', height: '35px' }}
                className='hover:bg-gray-300 rounded-full font-body font-thin -tracking-tight text-xs text-gray-900'
                onClick={() => setShowAll(true)}
                data-testid='see-more-button'
              >
                See more
              </button>
            )}
            {showAll && (
              <button
                style={{ width: '75px', height: '35px' }}
                className='hover:bg-gray-300 rounded-full font-body font-thin -tracking-tight text-xs text-gray-900'
                onClick={() => setShowAll(false)}
                data-testid='see-less-button'
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
