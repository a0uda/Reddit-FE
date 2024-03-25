import { Link } from 'react-router-dom';
import MyForm from '../../Components/Form';
import { ButtonType } from '../../validate/buttonType';

function Login() {
  const inputArr = [
    {
      placeholder: 'Username*',
      type: 'text',
      id: 'userName',
      // className: 'form-control rounded-full text-left p-3 w-full outline-0',
      style: { backgroundColor: '#DCDCDC' },
    },
    {
      placeholder: 'password',
      type: 'password',
      id: 'password',
      // className: 'form-control rounded-full text-left p-3 w-full',
      // className:
      // '!border  bg-white text-gray-900 rounded-full placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900  ',

      style: { backgroundColor: '#DCDCDC' },
    },
  ];
  const buttons: ButtonType[] = [
    {
      type: 'submit',
      className: 'form-control rounded-full w-[50%] text-center p-3 my-20',
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
        <div className='w-full m-3'>
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

export default Login;
