import { Avatar, Typography } from '@material-tailwind/react';
// import CommunityPopup from './RightSideBar/CommunityPopup';
import { Link } from 'react-router-dom';
// import { CommunityIcon } from '../assets/icons/Icons';
import { addPrefixToUsername } from '../utils/helper_functions';

type user = {
  username?: string;
  profilePicture?: string;
  //   page?: 'profile' | 'home' | 'community' | 'post';
};

type UserBadgeProps = user;

const UserBadge = ({ username, profilePicture }: UserBadgeProps) => {
  //   const [openPopover, setOpenPopover] = useState(false);
  //   // console.log(avatar);

  //   const triggers = {
  //     onMouseEnter: () => setOpenPopover(true),
  //     onMouseLeave: () => setOpenPopover(false),
  //   };

  const userNameWithPrefix = addPrefixToUsername(username ?? '', 'user');

  return (
    <>
      {/* <Popover open={openPopover} handler={setOpenPopover}>
        <PopoverHandler {...triggers}> */}
      <div className='flex justify-start items-center gap-2 pt-0'>
        <Avatar
          variant='circular'
          alt={username}
          src={profilePicture}
          style={{ width: '35px', height: '35px' }}
        />
        <div>
          <Typography
            variant='small'
            className='font-body -tracking-tight text-xs font-bold text-gray-600'
          >
            <Link to={`/${userNameWithPrefix}`} className='hover:underline'>
              {userNameWithPrefix}
            </Link>
          </Typography>
        </div>
      </div>
      {/* </PopoverHandler>
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
      </Popover> */}
    </>
  );
};

export default UserBadge;
