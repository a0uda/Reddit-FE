import MyForm from '../../Components/Form';
import { ButtonType } from '../../validate/buttonType';
import { Dialog, DialogBody, IconButton } from '@material-tailwind/react';
import { postRequest } from '../../API/User';
import { useState } from 'react';
import CheckEmail from './CheckEmail';
import { IoMdClose } from 'react-icons/io';
import { IoMdArrowBack } from 'react-icons/io';
import { useMutation } from 'react-query';

export default function RecoverUsername(props: {
  open: boolean;
  handleOpen: () => void;
  handlePrevious: () => void;
  openSignup: () => void;
}) {
  const [errorMessage, seterrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const inputArr = [
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
      className: 'form-control rounded-full w-full text-center p-3 m-2 my-20',
      content: 'Email me',
      style: { backgroundColor: '#FF4500' },
    },
  ];
  interface InitialValues {
    email: string;
  }
  const initialValues: InitialValues = { email: '' };

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
      endPoint: 'users/forget-username',
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
          type='recoverUsername'
          title='Recover your username'
          paragraph='Tell us the email address associated with your Reddit account, and we’ll send you an email with your username.'
          inputArr={inputArr}
          initVal={initialValues}
          ButtArr={buttons}
          backButton='backbutton'
          linkBackButton='/login'
          HandleOnSubmitFunction={handleOnSubmit}
          errorMessage={errorMessage}
        >
          <div className='m-3 mt-10'>
            <p>Don&apos;t have an email or need assistance logging in?</p>
            <p>
              <span
                onClick={() => {
                  props.handleOpen();
                  props.handlePrevious();
                }}
                className='text-decoration-none text-[#6366f1] cursor-pointer'
              >
                Log In
              </span>{' '}
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
