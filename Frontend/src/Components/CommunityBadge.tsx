import {
  Avatar,
  Popover,
  PopoverContent,
  PopoverHandler,
  Typography,
} from '@material-tailwind/react';
import CommunityPopup from './RightSideBar/CommunityPopup';
import { useState } from 'react';

type Community = {
  name: string;
  joined: boolean;
  icon: string;
  coverImage: string;
  description: string;
  members: number;
  online: number;
};

type CommunityBadgeProps = Community;

const CommunityBadge = ({
  name,
  joined,
  icon,
  coverImage,
  description,
  members,
  online,
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
            <Avatar
              variant='circular'
              alt='candice'
              src={icon}
              style={{ width: '25px', height: '25px' }}
            />
            <Typography
              variant='small'
              className='font-body -tracking-tight text-gray-600'
            >
              <a href='' className='hover:underline'>
                {name}
              </a>
            </Typography>
          </div>
        </PopoverHandler>
        <PopoverContent
          {...triggers}
          className='z-50 max-w-[24rem] rounded-2xl p-0'
        >
          <CommunityPopup
            communityCoverImage={coverImage}
            communityIcon={icon}
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
