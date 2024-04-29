import { Avatar, Card, CardBody, Typography } from '@material-tailwind/react';
import { formatNumber } from '../../utils/helper_functions';
import { CommunityOverviewType } from '../../types/types';
import { CommunityIcon } from '../../assets/icons/Icons';

const CommunityOverview = ({
  community,
}: {
  community: CommunityOverviewType;
}) => {
  return (
    <>
      <Card
        className='relative w-full px-4 py-2 hover:bg-neutral-200'
        shadow={false}
      >
        <CardBody className='flex items-center justify-between gap-2 m-0 p-0'>
          {community.profile_picture ? (
            <Avatar
              variant='circular'
              alt={community.name}
              src={community.profile_picture}
              style={{ width: '35px', height: '35px' }}
            />
          ) : (
            <CommunityIcon className='h-5 w-5' />
          )}

          <div className='flex flex-col justify-between space-y-2 overflow-hidden'>
            <Typography variant='h5' className='mb-2 font-normal text-black'>
              {community.name}
            </Typography>
            <Typography variant='small' className='text-gray-600'>
              {formatNumber(community.members_count)} members
            </Typography>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default CommunityOverview;
