import React from 'react';
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Input,
  Typography,
} from '@material-tailwind/react';
import RoundedButton from '../../../Components/RoundedButton';
import {
  ExclamationCircleIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import { useMutation } from 'react-query';
import { patchRequest, postRequest } from '../../../API/User';

function validateEmail(email) {
  // Regular expression for validating email addresses
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export const ChangeEmailModalError = (props: {
  handleOpen;
  open;
  email: string;
}) => {
  const [modalNum, setModalNum] = React.useState(0);
  return (
    <>
      <Dialog size='sm' open={props.open} handler={props.handleOpen}>
        <DialogHeader className='!block text-center border-b border-lines-color p-5'>
          <h2 className='flex items-center'>
            <div className='relative'>
              <EnvelopeIcon
                strokeWidth={1.5}
                className='h-8 w-8 mx-4 text-white'
                fill='#0079D3'
              />
              <ExclamationCircleIcon
                strokeWidth={1.5}
                className='h-6 w-6 absolute top-0 right-[6px] text-white'
                fill='red'
              />
            </div>
            {modalNum == 0 ? 'Change your Email Address' : 'Check your Email'}
          </h2>
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
        <DialogBody className='flex gap-2 p-5'>
          {modalNum == 0
            ? "To change your email address, you need to create a Reddit password first. We'll walk you through it."
            : `We sent a message to ${props.email} with a link to create your password.`}
        </DialogBody>
        <DialogFooter className='p-5 gap-2'>
          {modalNum == 0 ? (
            <>
              <RoundedButton
                buttonBorderColor='border-blue-light'
                buttonColor='bg-inherit'
                buttonText='Cancel'
                buttonTextColor='text-blue-light'
                onClick={props.handleOpen}
              />
              <RoundedButton
                buttonBorderColor='border-blue-light'
                buttonColor='bg-blue-light'
                buttonText='Continue'
                buttonTextColor='text-white'
                onClick={() => {
                  setModalNum(1);
                }}
              />
            </>
          ) : (
            <RoundedButton
              buttonBorderColor='border-blue-light'
              buttonColor='bg-blue-light'
              buttonText='Ok'
              buttonTextColor='text-white'
              onClick={() => {
                props.handleOpen();
                setModalNum(0);
              }}
            />
          )}
        </DialogFooter>
      </Dialog>
    </>
  );
};

export const ChangeEmailModal = (props: {
  handleOpen;
  open;
  refetch;
  email: string;
}) => {
  const [pwd, setPwd] = React.useState('');
  const [email, setEmail] = React.useState('');
  const patchReq = useMutation(patchRequest, {
    onSuccess: () => {
      props.refetch();
    },
  });

  return (
    <>
      <Dialog size='xs' open={props.open} handler={props.handleOpen}>
        <DialogHeader className='!block text-center border-b border-lines-color p-5'>
          <h2 className='flex items-center'>
            <div className='relative'>
              <EnvelopeIcon
                strokeWidth={1.5}
                className='h-8 w-8 mx-4 text-white'
                fill='#0079D3'
              />
              <ExclamationCircleIcon
                strokeWidth={1.5}
                className='h-6 w-6 absolute top-0 right-[6px] text-white'
                fill='red'
              />
            </div>
            Update your Email
          </h2>
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
        <DialogBody className='flex gap-6 p-5 flex-col'>
          Update your email below. There will be a new verification email sent
          that you will need to use to verify this new email.
          <Input
            label='Current Password'
            type='password'
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
          <div>
            <Input
              label='New Email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // className='!border-danger-red'
              error={!validateEmail(email) || email == props.email}
              // error={true}
              // crossOrigin={undefined}
            />
            <Typography
              variant='small'
              color='gray'
              className={`mt-2 flex items-center gap-1 font-normal text-danger-red ${validateEmail(email) && email != props.email && 'invisible'}`}
              // hidden={!validateEmail(email)}
            >
              {email == props.email
                ? 'You entered the current email address. Please enter a different one to proceed'
                : 'Please enter a valid Email'}
            </Typography>
          </div>
        </DialogBody>
        <DialogFooter className='p-5 gap-2'>
          <RoundedButton
            buttonBorderColor='border-blue-light'
            buttonColor='bg-blue-light'
            buttonText='Save Email'
            buttonTextColor='text-white'
            disabled={!validateEmail(email) || !pwd || email == props.email}
            onClick={() => {
              patchReq.mutate({
                endPoint: 'users/change-email',
                newSettings: {
                  password: pwd,
                  new_email: email,
                },
              });
              setEmail('');
              setPwd('');
              props.handleOpen();
            }}
          />
        </DialogFooter>
      </Dialog>
    </>
  );
};

export const DisconnectGoogleModal = (props: {
  handleOpen;
  open;
  refetch();
}) => {
  const [pwd, setPwd] = React.useState('');
  const postReq = useMutation(postRequest, {
    onSuccess: () => {
      props.refetch();
    },
  });

  return (
    <>
      <Dialog size='xs' open={props.open} handler={props.handleOpen}>
        <DialogHeader className='!block text-center border-b border-lines-color p-5'>
          <h2 className='flex items-center'>
            <div className='relative'>
              <EnvelopeIcon
                strokeWidth={1.5}
                className='h-8 w-8 mx-4 text-white'
                fill='#0079D3'
              />
              <ExclamationCircleIcon
                strokeWidth={1.5}
                className='h-6 w-6 absolute top-0 right-[6px] text-white'
                fill='red'
              />
            </div>
            Disconnect your Google Account
          </h2>
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
        <DialogBody className='flex gap-6 p-5 flex-col'>
          To continue, confirm your password.
          <Input
            label='Password'
            type='password'
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
        </DialogBody>
        <DialogFooter className='p-5 gap-2'>
          <RoundedButton
            buttonBorderColor='border-blue-light'
            buttonColor='bg-inherit'
            buttonText='Cancel'
            buttonTextColor='text-blue-light'
            onClick={props.handleOpen}
          />
          <RoundedButton
            buttonBorderColor='border-blue-light'
            buttonColor='bg-blue-light'
            buttonText='Continue'
            buttonTextColor='text-white'
            disabled={!pwd}
            onClick={() => {
              postReq.mutate({
                endPoint: 'users/disconnect-google',
                data: { password: pwd },
              });
              setPwd('');
              props.handleOpen();
            }}
          />
        </DialogFooter>
      </Dialog>
    </>
  );
};

export const DeleteAccountModal = (props: {
  handleOpen;
  open;
  refetch;
  email: string;
}) => {
  const [pwd, setPwd] = React.useState('');
  const [username, setUsername] = React.useState('');
  const postReq = useMutation(postRequest, {
    onSuccess: () => {
      props.refetch();
    },
  });

  return (
    <>
      <Dialog size='md' open={props.open} handler={props.handleOpen}>
        <DialogHeader className=' text-md border-b border-lines-color'>
          Delete Account
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
        <DialogBody className='flex gap-6 p-5 flex-col'>
          We're sorry to see you go
          <br />
          <br />
          Once you delete your account, your profile and username are
          permanently removed from Reddit and your posts, comments, and messages
          are disassociated (not deleted) from your account unless you delete
          them beforehand.
          <div className='flex flex-col gap-2'>
            <span className='text-[10px] font-bold uppercase'>
              Verify your identity
            </span>
            <Input
              label='PASSWORD'
              type='password'
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
            />
            <div>
              <Input
                label='USERNAME'
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                // className='!border-danger-red'
                // error={!validateEmail(email) || email == props.email}
                // error={true}
                // crossOrigin={undefined}
              />
            </div>
          </div>
        </DialogBody>
        <DialogFooter className='p-5 gap-2'>
          <RoundedButton
            buttonBorderColor='border-blue-light'
            buttonColor='bg-inherit'
            buttonText='Cancel'
            buttonTextColor='text-blue-light'
            onClick={props.handleOpen}
          />
          <RoundedButton
            buttonBorderColor='border-blue-light'
            buttonColor='bg-blue-light'
            buttonText='Delete'
            buttonTextColor='text-white'
            disabled={!pwd || !username}
            onClick={() => {
              postReq.mutate({
                endPoint: 'users/delete-account',
                data: {
                  password: pwd,
                  username: username,
                },
              });
              setUsername('');
              setPwd('');
              props.handleOpen();
            }}
          />
        </DialogFooter>
      </Dialog>
    </>
  );
};
