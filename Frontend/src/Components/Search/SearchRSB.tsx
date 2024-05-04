import { Card, Typography } from '@material-tailwind/react';
import { CommunityOverviewType, UserType } from '../../types/types';
import CommunityOverview from './CommunityOverview';
import UserOverview from './UserOverview';
import { Link, useSearchParams } from 'react-router-dom';

const SearchRSB = ({
  communities,
  users,
}: {
  communities: CommunityOverviewType[];
  users: UserType[];
}) => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q');

  if (!communities && !users) {
    return null;
  }

  if (communities.length === 0 && users.length === 0) {
    return (
      <Card className='w-80 bg-gray-50 rounded-xl shadow-none p-4 min-w-0 overflow-y-auto overflow-x-hidden'>
        <Typography variant='small' className='font-semibold text-xs uppercase'>
          No results found
        </Typography>
      </Card>
    );
  }

  return (
    <>
      <div>
        <Card
          className='w-80 bg-gray-50 rounded-xl shadow-none p-4 min-w-0 overflow-y-auto overflow-x-hidden'
          data-testid='community-card'
        >
          {communities && communities.length > 0 && (
            <div className='pb-4'>
              <Typography
                variant='small'
                className='font-semibold text-xs uppercase mr-4'
              >
                Communities
              </Typography>

              {communities.map((community) => (
                <div key={community.id}>
                  <CommunityOverview community={community} variant='small' />
                </div>
              ))}
              <Link
                to={`/search/?q=${q}&type=sr`}
                reloadDocument
                className={`text-blue text-xs hover:underline`}
              >
                See more communities
              </Link>
            </div>
          )}

          {users && users.length > 0 && (
            <>
              <hr className='border-gray-300' />
              <div className='pt-4'>
                <Typography
                  color='gray'
                  variant='small'
                  className='font-semibold text-xs uppercase mr-4'
                >
                  People
                </Typography>

                {users.map((user) => (
                  <div key={user._id}>
                    <UserOverview user={user} variant='small' />
                  </div>
                ))}
                <Link
                  to={`/search/?q=${q}&type=user`}
                  reloadDocument
                  className={`text-blue text-xs hover:underline`}
                >
                  See more people
                </Link>
              </div>
            </>
          )}
        </Card>
      </div>
    </>
  );
};

export default SearchRSB;
