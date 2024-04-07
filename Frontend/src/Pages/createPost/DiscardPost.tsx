import {
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
  DialogFooter,
} from '@material-tailwind/react';
import RoundedButton from '../../Components/RoundedButton';

const DiscardPost = (props: { handleOpen; open }) => {
  return (
    <Dialog size='sm' open={props.open} handler={props.handleOpen}>
      <DialogHeader className='!block relative border-b border-lines-color my-2 flex justify-between '>
        <div className='ml-2'>Discard Post</div>
        <IconButton
          color='blue-gray'
          size='sm'
          variant='text'
          onClick={props.handleOpen}
          className='!absolute right-[10px] top-[10px]'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
            className='h-5 w-5'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </IconButton>
      </DialogHeader>
      <DialogBody className='flex gap-2'>
        <div>Returning to the previous page will discard your post</div>
      </DialogBody>
      <DialogFooter className='bg-gray-200 rounded space-x-2'>
        <RoundedButton
          buttonBorderColor='border-white'
          buttonText='Discard Post'
          buttonTextColor='text-gray'
          buttonColor='bg-gray-200 '
          onClick={props.handleOpen}
        />
        <RoundedButton
          buttonBorderColor='border-text-blue'
          buttonText='Edit Post'
          buttonTextColor='text-white'
          buttonColor='bg-blue-light'
          onClick={props.handleOpen}
        />
      </DialogFooter>
    </Dialog>
  );
};
export default DiscardPost;
