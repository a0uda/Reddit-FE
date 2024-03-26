import { Link } from 'react-router-dom';
import MyForm from '../../Components/Form';
import { ButtonType } from '../../validate/buttonType';
import { postRequest } from '../../API/User';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogBody } from '@material-tailwind/react';

export default function Login() {
  const [errorMessage, seterrorMessage] = useState('');
  const navigate = useNavigate();
  const inputArr = [
    {
      placeholder: 'Username*',
      type: 'text',
      id: 'username',
      className: 'form-control rounded-full text-left p-3 m-2 w-full',
      style: { backgroundColor: '#DCDCDC' },
    },
    {
      placeholder: 'password',
      type: 'password',
      id: 'password',
      className: 'form-control rounded-full text-left p-3 m-2 w-full',
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

  const handleOnSubmit = async (values: unknown) => {
    try {
      const response = await postRequest({
        endPoint: 'users/login',
        data: values,
      });
      const { token } = response;
      localStorage.setItem('token', token);
      seterrorMessage('');
      navigate('/');
    } catch (error) {
      seterrorMessage('Invalid Login');
    }
  };
  return (
    <>
      <Dialog size='sm' open={true} handler={() => {}}>
        <DialogBody className='text-black'>
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
