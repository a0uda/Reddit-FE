import {
  Avatar,
  Popover,
  PopoverContent,
  PopoverHandler,
  Typography,
} from '@material-tailwind/react';
import CommunityPopup from './RightSideBar/CommunityPopup';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CommunityIcon } from '../assets/icons/Icons';
import { addPrefixToUsername } from '../utils/helper_functions';

type Community = {
  name: string;
  joined?: boolean;
  avatar?: string;
  coverImage?: string;
  description?: string;
  members?: number;
  displayAvatar?: boolean;
  username?: string;
  page?: 'profile' | 'home' | 'community' | 'post';
};

type CommunityBadgeProps = Community;

const CommunityBadge = ({
  name,
  joined = false,
  avatar,
  coverImage,
  description,
  members,
  displayAvatar = true,
  username,
  page,
}: CommunityBadgeProps) => {
  const [openPopover, setOpenPopover] = useState(false);
  // console.log(avatar);

  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };

  const communityNameWithPrefix = addPrefixToUsername(name, 'community');

  return (
    <>
      <Popover open={openPopover} handler={setOpenPopover}>
        <PopoverHandler {...triggers}>
          <div className='flex justify-start items-center gap-2 pt-0'>
            {displayAvatar && (
              <>
                {avatar ? (
                  <Avatar
                    variant='circular'
                    alt={name}
                    src={avatar}
                    style={{ width: '35px', height: '35px' }}
                  />
                ) : (
                  <CommunityIcon className='h-5 w-5' />
                )}
              </>
            )}
            <div>
              <Typography
                variant='small'
                className='font-body -tracking-tight text-xs font-bold text-gray-600'
              >
                <Link
                  to={`/${communityNameWithPrefix}`}
                  className='hover:underline'
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {communityNameWithPrefix}
                </Link>
              </Typography>
              {(page == 'profile' || page == 'post') && (
                <Typography
                  variant='small'
                  className='font-body -tracking-tight text-xs text-gray-600'
                >
                  {username}
                </Typography>
              )}
            </div>
          </div>
        </PopoverHandler>
        <PopoverContent
          {...triggers}
          className='z-50 max-w-[24rem] rounded-2xl p-0 transition-all delay-200'
        >
          <CommunityPopup
            communityCoverImage={coverImage}
            communityAvatar={avatar}
            communityName={name}
            joined={joined}
            communityDescription={description}
            communityMembers={members}
          />
        </PopoverContent>
      </Popover>
    </>
  );
};

export default CommunityBadge;
