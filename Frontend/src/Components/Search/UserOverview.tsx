import { Avatar, Card, CardBody, Typography } from '@material-tailwind/react';
import { UserType } from '../../types/types';
import { cn } from '../../utils/helper_functions';
import { Link } from 'react-router-dom';

const UserOverview = ({
  user,
  variant = 'large',
}: {
  user: UserType;
  variant?: 'small' | 'large';
}) => {
  return (
    <>
      <Link to={`/user/${user.username}`}>
        <Card
          className='relative w-full min-w-0 p-4 bg-transparent hover:bg-neutral-200'
          shadow={false}
        >
          <CardBody className='flex gap-5 m-0 p-0'>
            <div className='mt-1'>
              <Avatar
                src={
                  user?.profile_picture ||
                  'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_4.png'
                }
                alt={user.username + "'s Profile"}
                variant='circular'
                size='sm'
                className={variant === 'large' ? 'h-10 w-10' : 'h-8 w-8'}
              />
            </div>

            <div className='flex flex-col justify-between space-y-2 overflow-hidden'>
              <Typography
                variant='paragraph'
                className={cn(
                  'font-normal text-black',
                  variant === 'large' ? 'text-xl' : ''
                )}
              >
                u/{user.username}
              </Typography>
              <Typography variant='small' className={'text-gray-600'}>
                {user.display_name}
              </Typography>
            </div>
          </CardBody>
        </Card>
      </Link>
    </>
  );
};

export default UserOverview;
