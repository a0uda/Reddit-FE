import MyForm from '../../Components/Form';
import { ButtonType } from '../../validate/buttonType';
import { postRequest } from '../../API/User';
import { useState } from 'react';
import { Dialog, DialogBody, IconButton } from '@material-tailwind/react';
import { IoMdClose } from 'react-icons/io';
import { useMutation } from 'react-query';

export default function Login(props: {
  open: boolean;
  handleOpen: () => void;
  openSignup: () => void;
  openPassword: () => void;
  openUsername: () => void;
}) {
  const [errorMessage, seterrorMessage] = useState('');
  const inputArr = [
    {
      placeholder: 'Username*',
      type: 'text',
      id: 'username',
      style: { backgroundColor: '#DCDCDC' },
    },
    {
      placeholder: 'password',
      type: 'password',
      id: 'password',
      style: { backgroundColor: '#DCDCDC' },
    },
  ];
  const buttons: ButtonType[] = [
    {
      type: 'submit',
      className: 'form-control rounded-full w-full text-center p-3 m-2 mt-20',
      content: 'Log In',
      style: { backgroundColor: '#FF4500' },
    },
  ];
  interface InitialValues {
    username: string;
    password: string;
  }
  const initialValues: InitialValues = { username: '', password: '' };

  const mutation = useMutation(postRequest, {
    onSuccess: (response) => {
      const { token } = response;
      localStorage.setItem('token', token);
      seterrorMessage('');
      props.handleOpen();
      location.reload();
    },
    onError: () => {
      seterrorMessage('Invalid Login');
    },
  });

  const handleOnSubmit = (values: object) => {
    mutation.mutate({
      endPoint: 'users/login',
      data: values,
    });
  };
  console.log(props.handleOpen);

  return (
    <>
      <Dialog size='sm' open={props.open} handler={props.handleOpen}>
        <DialogBody className='text-black'>
          <IconButton
            onClick={props.handleOpen}
            className='float-right my-4 m-2'
          >
            <IoMdClose size={32} />
          </IconButton>
          <MyForm
            type='login'
            title='Log in'
            paragraph=' By continuing, you agree to our User Agreement and acknowledge
                 that you understand the Privacy Policy.'
            inputArr={inputArr}
            initVal={initialValues}
            ButtArr={buttons}
            LogWithGoogle='logwithgoogle'
            HandleOnSubmitFunction={handleOnSubmit}
            errorMessage={errorMessage}
            handleModal={() => {
              props.handleOpen();
            }}
          >
            <>
              <div className='m-3'>
                <p>
                  Forget your{' '}
                  <span
                    onClick={() => {
                      props.handleOpen();
                      props.openUsername();
                    }}
                    className='cursor-pointer text-[#6366f1]'
                  >
                    username
                  </span>{' '}
                  or{' '}
                  <span
                    onClick={() => {
                      props.handleOpen();
                      props.openPassword();
                    }}
                    className='cursor-pointer text-[#6366f1]'
                  >
                    password
                  </span>
                  ?
                </p>
                <p>
                  New to Reddit?{' '}
                  <span
                    onClick={() => {
                      props.handleOpen();
                      props.openSignup();
                    }}
                    className='cursor-pointer text-[#6366f1]'
                  >
                    Sign Up
                  </span>
                </p>
              </div>
            </>
          </MyForm>
        </DialogBody>
      </Dialog>
    </>
  );
}
