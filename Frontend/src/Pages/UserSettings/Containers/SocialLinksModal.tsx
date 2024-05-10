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

const SocialLinksModal = (props: {
  handleOpen: () => void;
  open: boolean;
  setSocialLinkType: (value: string) => void;
  handleOpenNextModal: () => void;
}) => {
  return (
    <>
      {/* <Button onClick={props.handleOpen} variant='gradient'>
        Open Dialog
      </Button> */}
      <Dialog size='sm' open={props.open} handler={props.handleOpen}>
        <DialogHeader className='!block text-center relative border-b border-lines-color'>
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
              props.setSocialLinkType('facebook');
              props.handleOpen();
              props.handleOpenNextModal();
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
              props.setSocialLinkType('instagram');
              props.handleOpen();
              props.handleOpenNextModal();
            }}
          >
            <img src={instagramIcon} className='h-3.5 w-3.5' />
          </RoundedButton>
        </DialogBody>
      </Dialog>
    </>
  );
};

export const EnterLinkDetails = (props: {
  handleOpen: () => void;
  open: boolean;
  children: React.ReactNode;
  openBackModal: () => void;
  saveDisabled: boolean;
  handleSaveButton: () => void;
}) => {
  return (
    <>
      <Dialog
        size='sm'
        open={props.open}
        handler={props.handleOpen}
        className='pb-5'
      >
        <DialogHeader className=' text-center justify-between border-b border-lines-color'>
          <ArrowLeftIcon
            strokeWidth={1.5}
            className='h-5 w-5 mx-2 cursor-pointer'
            onClick={props.openBackModal}
          />
          <h2>Add Social Link</h2>
          <RoundedButton
            buttonBorderColor='none'
            buttonColor='bg-blue-light'
            buttonText='Save'
            buttonTextColor='text-white'
            disabled={props.saveDisabled}
            onClick={props.handleSaveButton}
          ></RoundedButton>
        </DialogHeader>
        <DialogBody className='flex flex-col gap-2'>
          {props.children}
        </DialogBody>
      </Dialog>
    </>
  );
};

export default SocialLinksModal;
