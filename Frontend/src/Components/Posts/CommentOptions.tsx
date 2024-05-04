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
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';

type CommentOptionsProps = {
  saved: boolean;

  handleEditComment: () => void;
  handleSaveComment: () => void;
  handleDeleteComment: () => void;
  isMyComment?: boolean;
};

const CommentOptions = ({
  saved,
  handleSaveComment,
  handleDeleteComment,
  handleEditComment,
  isMyComment,
}: CommentOptionsProps) => {
  const [isSaved, setIsSaved] = useState(saved);

  const handleSave = () => {
    setIsSaved(!isSaved);
    console.log('saved trigger', isSaved);
    handleSaveComment();
  };
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
        {isMyComment && (
          <MenuItem
            onClick={handleEditComment}
            className='py-3 flex gap-2 items-center'
          >
            <PencilIcon className='w-5 h-5' />
            <span>Edit comment</span>
          </MenuItem>
        )}
        <MenuItem onClick={handleSave} className='py-3 flex gap-2 items-center'>
          {isSaved ? (
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
        {isMyComment && (
          <MenuItem
            onClick={handleDeleteComment}
            className='py-3 flex gap-2 items-center'
          >
            <TrashIcon className='w-5 h-5' />
            <span>Delete</span>
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};
export default CommentOptions;
