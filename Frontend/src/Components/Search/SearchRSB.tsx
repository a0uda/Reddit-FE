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

  return (
    <>
      <div>
        <Card
          className='w-80 bg-gray-50 rounded-xl shadow-none p-4 min-w-0 overflow-y-auto overflow-x-hidden'
          data-testid='community-card'
        >
          <div className='pb-4'>
            <Typography
              variant='small'
              className='font-semibold text-xs uppercase mr-4'
            >
              Communities
            </Typography>

            {communities &&
              communities.length > 0 &&
              communities.map((community) => (
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

          <hr className='border-gray-300' />
          <div className='pt-4'>
            <Typography
              color='gray'
              variant='small'
              className='font-semibold text-xs uppercase mr-4'
            >
              People
            </Typography>

            {users &&
              users.length > 0 &&
              users.map((user) => (
                <div key={user.id}>
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
        </Card>
      </div>
    </>
  );
};

export default SearchRSB;
