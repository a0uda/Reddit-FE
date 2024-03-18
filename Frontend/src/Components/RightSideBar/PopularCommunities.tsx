import { useState } from 'react';
import { List, Card, Typography } from '@material-tailwind/react';
import CommunityItem from './CommunityItem';
import communityList from './CommunityList.ts';

export function PopularCommunities() {
  const [showAll, setShowAll] = useState(false);

  const displayedCommunities = showAll
    ? communityList
    : communityList.slice(0, 5);

  return (
    <div
      style={{ maxHeight: '88vh', overflowY: 'auto', scrollbarWidth: 'thin' }}
    >
      <Card className='w-80 bg-gray-100 rounded-lg shadow-none p-2 pt-4 pb-4'>
        <Typography
          variant='small'
          className='p-2 font-body font-semibold uppercase -tracking-tight text-xs text-gray-600'
        >
          POPULAR COMMUNITIES
        </Typography>
        <div>
          <List>
            {displayedCommunities.map((community, index) => (
              <CommunityItem
                key={index} // You may need to change this key based on your data structure
                src={community.src}
                name={community.name}
                membersNumber={community.membersNumber}
              />
            ))}
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
      </Card>
    </div>
  );
}
