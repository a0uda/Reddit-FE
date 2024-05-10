import { Avatar, Card, CardBody, Typography } from '@material-tailwind/react';
import { cn, formatNumber } from '../../utils/helper_functions';
import { CommunityOverviewType } from '../../types/types';
import { CommunityIcon } from '../../assets/icons/Icons';
import { Link } from 'react-router-dom';

const CommunityOverview = ({
  community,
  variant = 'large',
}: {
  community: CommunityOverviewType;
  variant?: 'small' | 'large';
}) => {
  return (
    <>
      <Link to={`/r/${community.name}`}>
        <Card
          className='relative w-full min-w-0 p-4 bg-transparent hover:bg-neutral-200'
          shadow={false}
        >
          <CardBody
            className={cn(
              'flex m-0 p-0',
              variant === 'large' ? 'gap-5' : 'gap-3  '
            )}
            data-testid='card-body'
          >
            <div className='mt-1'>
              {community.profile_picture ? (
                <Avatar
                  data-testid='default-icon'
                  variant='circular'
                  alt={community.name}
                  src={
                    community.profile_picture ||
                    'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_4.png'
                  }
                  className={variant === 'large' ? 'h-10 w-10' : 'h-8 w-8'}
                />
              ) : (
                <CommunityIcon
                  className={variant === 'large' ? 'h-10 w-10' : 'h-8 w-8'}
                />
              )}
            </div>

            <div className='flex flex-col justify-between space-y-2 overflow-hidden'>
              <Typography
                variant='paragraph'
                className={cn(
                  'font-normal text-black',
                  variant === 'large' ? 'text-xl' : ''
                )}
              >
                r/{community.name}
              </Typography>
              <Typography variant='small' className='text-gray-600'>
                {formatNumber(community.members_count)} members
              </Typography>
            </div>
          </CardBody>
        </Card>
      </Link>
    </>
  );
};

export default CommunityOverview;
