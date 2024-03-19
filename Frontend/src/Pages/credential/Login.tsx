import { Link } from 'react-router-dom';
import MyForm from '../../Components/Form';
import { ButtonType } from '../../validate/buttonType';

export default function Login() {
  const inputArr = [
    {
      placeholder: 'Username*',
      type: 'text',
      id: 'userName',
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
      className: 'form-control rounded-full w-full text-center p-3 m-2 my-20',
      content: 'Log In',
      style: { backgroundColor: '#FF4500' },
    },
  ];

  interface InitialValues {
    userName: string;
    password: string;
  }
  const initialValues: InitialValues = { userName: '', password: '' };
  return (
    <MyForm
      type='login'
      title='Log in'
      paragraph=' By continuing, you agree to our User Agreement and acknowledge
                 that you understand the Privacy Policy.'
      inputArr={inputArr}
      initVal={initialValues}
      ButtArr={buttons}
      LogWithGoogle='logwithgoogle'
    >
      <>
        <div className='m-3'>
          <p>
            Forget your{' '}
            <Link
              to='/recoverUsername'
              className='text-decoration-none text-blue-500'
            >
              username
            </Link>
            or{' '}
            <Link
              to='/resetPassword'
              className='text-decoration-none text-blue-500'
            >
              password
            </Link>
            ?
          </p>
          <p>
            New to Reddit?{' '}
            <Link to='/signup' className='text-decoration-none text-blue-500'>
              Sign Up
            </Link>
          </p>
        </div>
      </>
    </MyForm>
  );
}
