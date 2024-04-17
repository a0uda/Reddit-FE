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

type Community = {
  name: string;
  joined?: boolean;
  avatar?: string;
  coverImage?: string;
  description?: string;
  members?: number;
  online?: number;
  displayAvatar?: boolean;
};

type CommunityBadgeProps = Community;

const CommunityBadge = ({
  name,
  joined = false,
  avatar,
  coverImage,
  description,
  members,
  online,
  displayAvatar = true,
}: CommunityBadgeProps) => {
  const [openPopover, setOpenPopover] = useState(false);

  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };

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
                    style={{ width: '25px', height: '25px' }}
                  />
                ) : (
                  <CommunityIcon className='h-5 w-5' />
                )}
              </>
            )}
            <Typography
              variant='small'
              className='font-body -tracking-tight text-gray-600'
            >
              <Link to={`/r/${name}`} className='hover:underline'>
                r/{name}
              </Link>
            </Typography>
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
            communityOnline={online}
          />
        </PopoverContent>
      </Popover>
    </>
  );
};

export default CommunityBadge;
