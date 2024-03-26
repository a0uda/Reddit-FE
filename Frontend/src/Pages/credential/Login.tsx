import { Link } from 'react-router-dom';
import MyForm from '../../Components/Form';
import { ButtonType } from '../../validate/buttonType';
import { postRequest } from '../../API/User';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogBody } from '@material-tailwind/react';
import { IoMdClose } from 'react-icons/io';
import { useMutation } from 'react-query';

export default function Login() {
  const [errorMessage, seterrorMessage] = useState('');
  const navigate = useNavigate();
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
      navigate('/');
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

  return (
    <>
      <Dialog size='sm' open={true} handler={() => {}}>
        <DialogBody className='text-black'>
          <Link to='/' className='float-right my-4 m-2'>
            <IoMdClose size={32} />
          </Link>
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
          >
            <>
              <div className='m-3'>
                <p>
                  Forget your{' '}
                  <Link to='/forget-username' style={{ color: '#6366f1' }}>
                    username
                  </Link>
                  or{' '}
                  <Link to='/forget-password' style={{ color: '#6366f1' }}>
                    password
                  </Link>
                  ?
                </p>
                <p>
                  New to Reddit?{' '}
                  <Link to='/signup' style={{ color: '#6366f1' }}>
                    Sign Up
                  </Link>
                </p>
              </div>
            </>
          </MyForm>
        </DialogBody>
      </Dialog>
    </>
  );
}
