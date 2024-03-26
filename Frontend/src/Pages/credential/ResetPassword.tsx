import MyForm from '../../Components/Form';
import { ButtonType } from '../../validate/buttonType';
import { Dialog, DialogBody, IconButton } from '@material-tailwind/react';
import { postRequest } from '../../API/User';
import { useState } from 'react';
import CheckEmail from './CheckEmail';
import { IoMdClose } from 'react-icons/io';
import { IoMdArrowBack } from 'react-icons/io';
import { useMutation } from 'react-query';

export default function ResetPassword(props: {
  open: boolean;
  handleOpen: () => void;
  handlePrevious: () => void;
  openUsername: () => void;
  openSignup: () => void;
}) {
  const [errorMessage, seterrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const inputArr = [
    {
      placeholder: 'Username*',
      type: 'text',
      id: 'username',
      style: { backgroundColor: '#DCDCDC' },
    },
    {
      placeholder: 'Email*',
      type: 'text',
      id: 'email',
      style: { backgroundColor: '#DCDCDC' },
    },
  ];
  const buttons: ButtonType[] = [
    {
      type: 'submit',
      className: 'form-control rounded-full w-full text-center p-3 m-2 mt-20',
      content: 'Reset password',
      style: { backgroundColor: '#FF4500' },
    },
  ];
  interface InitialValues {
    username: string;
    email: string;
  }
  const initialValues: InitialValues = { username: '', email: '' };

  const mutation = useMutation(postRequest, {
    onSuccess: (response) => {
      setSuccessMessage(response.message);
      seterrorMessage('');
    },
    onError: () => {
      seterrorMessage('Invalid in sending Email');
    },
  });

  const handleOnSubmit = (values: object) => {
    mutation.mutate({
      endPoint: 'users/forget-password',
      data: values,
    });
  };

  return successMessage ? (
    <CheckEmail
      handleButtonEmail={() => setSuccessMessage('')}
      handleBackArrow={() => setSuccessMessage('')}
      open={props.open}
      handleOpen={props.handleOpen}
    />
  ) : (
    <Dialog size='sm' open={props.open} handler={props.handleOpen}>
      <DialogBody className='text-black'>
        <div className='my-4 m-2'>
          <IconButton
            onClick={() => {
              props.handleOpen();
              props.handlePrevious();
            }}
            className='float-left'
          >
            <IoMdArrowBack size={32} />
          </IconButton>
          <IconButton onClick={props.handleOpen} className='float-right'>
            <IoMdClose size={32} />
          </IconButton>
        </div>
        <MyForm
          type='resetPassword'
          title=' Reset your password'
          paragraph=' Tell us the username and email address associated with your Reddit account, and we’ll send you an email with a link to reset your password.'
          inputArr={inputArr}
          initVal={initialValues}
          ButtArr={buttons}
          backButton='backbutton'
          linkBackButton='/login'
          HandleOnSubmitFunction={handleOnSubmit}
          errorMessage={errorMessage}
        >
          <div className='m-3 my-4'>
            <p>Don&apos;t have an email or need assistance logging in?</p>
            <p>
              Forgot your{' '}
              <span
                onClick={() => {
                  props.handleOpen();
                  props.openUsername();
                }}
                className='text-decoration-none text-[#6366f1] cursor-pointer'
              >
                username
              </span>
              ?
            </p>
            <p>
              <span
                onClick={() => {
                  props.handleOpen();
                  props.handlePrevious();
                }}
                className='text-decoration-none text-[#6366f1] cursor-pointer'
              >
                Log In
              </span>
              <span
                onClick={() => {
                  props.handleOpen();
                  props.openSignup();
                }}
                className='text-decoration-none text-[#6366f1] cursor-pointer'
              >
                Sign Up
              </span>
            </p>
          </div>
        </MyForm>
      </DialogBody>
    </Dialog>
  );
}
