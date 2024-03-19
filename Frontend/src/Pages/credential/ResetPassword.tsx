import { Link } from 'react-router-dom';
import MyForm from '../../Components/Form';
import { ButtonType } from '../../validate/buttonType';

function ResetPassword() {
  const inputArr = [
    {
      placeholder: 'Username*',
      type: 'text',
      id: 'userName',
      className: 'form-control rounded-full text-left p-3 m-2 w-full',
      style: { backgroundColor: '#DCDCDC' },
    },
    {
      placeholder: 'Email*',
      type: 'text',
      id: 'email',
      className: 'form-control rounded-full text-left p-3 m-2 w-full',
      style: { backgroundColor: '#DCDCDC' },
    },
  ];
  const buttons: ButtonType[] = [
    {
      type: 'submit',
      className: 'form-control rounded-full w-full text-center p-3 m-2 my-20',
      content: 'Reset password',
      style: { backgroundColor: '#FF4500' },
    },
  ];

  interface InitialValues {
    userName: string;
    email: string;
  }
  const initialValues: InitialValues = { userName: '', email: '' };

  return (
    <MyForm
      type='resetPassword'
      title=' Reset your password'
      paragraph=' Tell us the username and email address associated with your
      Reddit account, and we’ll send you an email with a link to
      reset your password.'
      inputArr={inputArr}
      initVal={initialValues}
      ButtArr={buttons}
      backButton='backbutton'
      linkBackButton='/login'
    >
      <div className='m-3 my-4'>
        <p>Don&apos;t have an email or need assistance logging in?</p>
        <p>
          Forgot your{' '}
          <Link
            to='/recoverUsername'
            className='text-decoration-none text-blue-500'
          >
            username
          </Link>
          ?
        </p>
        <p>
          <Link to='/login' className='text-decoration-none text-blue-500'>
            Log In .
          </Link>
          <Link to='/signup' className='text-decoration-none text-blue-500'>
            Sign Up
          </Link>
        </p>
      </div>
    </MyForm>
  );
}

export default ResetPassword;
