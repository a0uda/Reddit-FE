import React from 'react';
import {
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
} from '@material-tailwind/react';
import RoundedButton from '../../../Components/RoundedButton';
import facebookIcon from '../../../assets/facebookIcon.svg';
import instagramIcon from '../../../assets/instagramIcon.svg';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const SocialLinksModal = (props: { handleOpen; open; setSocialLinkType }) => {
  return (
    <>
      {/* <Button onClick={props.handleOpen} variant='gradient'>
        Open Dialog
      </Button> */}
      <Dialog size='md' open={props.open} handler={props.handleOpen}>
        <DialogHeader className='!block text-center relative border-b border-linesColor'>
          <h2>Add Social Link</h2>
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
          <RoundedButton
            buttonBorderColor='none'
            buttonColor='bg-[#EDEFF1]'
            buttonText='Facebook'
            buttonTextColor='text-black'
            onClick={() => {
              props.setSocialLinkType('Facebook');
            }}
          >
            <img src={facebookIcon} className='h-3.5 w-3.5' />
          </RoundedButton>
          <RoundedButton
            buttonBorderColor='none'
            buttonColor='bg-[#EDEFF1]'
            buttonText='Instagram'
            buttonTextColor='text-black'
            onClick={() => {
              props.setSocialLinkType('Instagram');
            }}
          >
            <img src={instagramIcon} className='h-3.5 w-3.5' />
          </RoundedButton>
        </DialogBody>
        {/* <DialogFooter>
          <Button
            variant='text'
            color='red'
            onClick={handleOpen}
            className='mr-1'
          >
            <span>Cancel</span>
          </Button>
          <Button variant='gradient' color='green' onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter> */}
      </Dialog>
    </>
  );
};

export const EnterLinkDetails = (props: {
  handleOpen;
  open;
  childern?: React.ReactNode;
  openBackModal;
}) => {
  return (
    <>
      <Dialog size='sm' open={props.open} handler={props.handleOpen}>
        <DialogHeader className=' text-center justify-between border-b border-linesColor'>
          <ArrowLeftIcon
            strokeWidth={1.5}
            className='h-5 w-5 mx-2'
            onClick={props.openBackModal}
          />
          <h2>Add Social Link</h2>
          <RoundedButton
            buttonBorderColor='none'
            buttonColor='bg-blue-light'
            buttonText='Save'
            buttonTextColor='text-white'
          ></RoundedButton>
        </DialogHeader>
        <DialogBody className='flex-col gap-2'>{props.childern}</DialogBody>
      </Dialog>
    </>
  );
};

export default SocialLinksModal;
