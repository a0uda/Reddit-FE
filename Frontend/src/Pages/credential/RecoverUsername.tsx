<<<<<<< HEAD
import MyForm from '../../Components/Form';
import { ButtonType } from '../../validate/buttonType';
import { Link } from 'react-router-dom';

export default function RecoverUsername() {
=======
import { Link } from 'react-router-dom';
import MyForm from '../../Components/Form';
import { ButtonType } from '../../validate/buttonType';

function RecoverUsername() {
>>>>>>> 236df0c (update cradentials)
  const inputArr = [
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
      content: 'Email me',
      style: { backgroundColor: '#FF4500' },
    },
  ];
  interface InitialValues {
    email: string;
  }
  const initialValues: InitialValues = { email: '' };
  return (
    <MyForm
      type='recoverUsername'
      title='Recover your username'
      paragraph='Tell us the email address associated with your Reddit account,
                    and we’ll send you an email with your username.'
      inputArr={inputArr}
      initVal={initialValues}
      ButtArr={buttons}
      backButton='backbutton'
      linkBackButton='/login'
    >
      <div className='m-3 mt-10'>
        <p>Don&apos;t have an email or need assistance logging in?</p>
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
