import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from '@material-tailwind/react';
import { HiEllipsisHorizontal } from 'react-icons/hi2';
import {
  BookmarkIcon,
  BookmarkSlashIcon,
  EyeIcon,
  FlagIcon,
  PencilIcon,
  TrashIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import eighteenPic from '../../assets/18Pic.svg';

type PostOptionsProps = {
  saved: boolean;
  NSFW: boolean;
  spoiler: boolean;
  myPost: boolean;
  page: 'profile' | 'home' | 'community';
  canEdit: boolean;
  handleEditPost: () => void;
  handleSavePost: () => void;
  handleHidePost: () => void;
  handleReportPost: () => void;
  handleDeletePost: () => void;
  handleSpoiler: () => void;
  handleNSFW: () => void;
};

const PostOptions = ({
  saved,
  NSFW,
  spoiler,
  myPost,
  page,
  canEdit,
  handleEditPost,
  handleSavePost,
  handleHidePost,
  handleReportPost,
  handleDeletePost,
  handleSpoiler,
  handleNSFW,
}: PostOptionsProps) => {
  return (
    <Menu placement='bottom-end'>
      <MenuHandler>
        <Button
          onClick={(e) => {
            e.preventDefault();
            e.nativeEvent.stopImmediatePropagation();
            e.stopPropagation();
          }}
          variant='text'
          className='p-2 z-10'
        >
          <HiEllipsisHorizontal size={20} />
        </Button>
      </MenuHandler>
      <MenuList className='p-0 text-foreground min-w-min w-max shadow-lg shadow-black/25'>
        {myPost && page === 'profile' && canEdit && (
          <MenuItem
            onClick={handleEditPost}
            className='py-3 flex gap-2 items-center'
          >
            <PencilIcon className='w-5 h-5' />
            <span>Edit post</span>
          </MenuItem>
        )}
        <MenuItem
          onClick={handleSavePost}
          className='py-3 flex gap-2 items-center'
        >
          {saved ? (
            <>
              <BookmarkSlashIcon className='w-5 h-5' />
              <span>Unsave</span>
            </>
          ) : (
            <>
              <BookmarkIcon className='w-5 h-5' />
              <span>Save</span>
            </>
          )}
        </MenuItem>
        <MenuItem
          onClick={handleHidePost}
          className='py-3 flex gap-2 items-center'
        >
          <EyeIcon className='w-5 h-5' />
          <span>Hide</span>
        </MenuItem>

        <MenuItem
          className='py-3 flex gap-2 items-center'
          onClick={handleReportPost}
        >
          <FlagIcon className='w-5 h-5' />
          <span>Report</span>
        </MenuItem>
        {myPost && (
          <MenuItem
            onClick={handleDeletePost}
            className='py-3 flex gap-2 items-center'
          >
            <TrashIcon className='w-5 h-5' />
            <span>Delete</span>
          </MenuItem>
        )}
        {!spoiler && myPost && (
          <MenuItem
            onClick={handleSpoiler}
            className='py-3 flex gap-2 items-center'
          >
            <ExclamationTriangleIcon className='w-5 h-5' />
            <span>Add spoiler tag</span>
          </MenuItem>
        )}
        {!NSFW && myPost && (
          <MenuItem
            onClick={handleNSFW}
            className='py-3 flex gap-2 items-center'
          >
            <img src={eighteenPic} className='w-5 h-5' />
            <span>Add NSFW tag</span>
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};

export default PostOptions;
