import { useState } from 'react';
import { Avatar, Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { addPrefixToUsername } from '../utils/helper_functions';
import { useQuery } from 'react-query';
import { fetchRequest } from '../API/User';
import { AboutType } from '../types/types';

type user = {
  username?: string;
  //   page?: 'profile' | 'home' | 'community' | 'post';
};

type UserBadgeProps = user;

const UserBadge = ({ username }: UserBadgeProps) => {
  const [aboutData, setAboutData] = useState<AboutType | undefined>();
  useQuery({
    queryKey: 'about data',
    queryFn: () => fetchRequest(`users/${username}/about`),
    onSuccess: (data) => {
      setAboutData(data.data);
    },
  });

  const userNameWithPrefix = addPrefixToUsername(username ?? '', 'user');

  return (
    <>
      <div className='flex justify-start items-center gap-2 pt-0'>
        <Avatar
          variant='circular'
          alt={username}
          src={aboutData?.profile_picture ?? ''}
          style={{ width: '35px', height: '35px' }}
        />
        <div>
          <Typography
            variant='small'
            className='font-body -tracking-tight text-xs font-bold text-gray-600'
          >
            <Link to={`/user/${username}`} className='hover:underline'>
              {userNameWithPrefix}
            </Link>
          </Typography>
        </div>
      </div>
    </>
  );
};

export default UserBadge;
