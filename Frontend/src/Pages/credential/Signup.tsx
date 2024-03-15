import { useState } from 'react';
import MyForm from '../../Components/Form';
import { ButtonType } from '../../validate/buttonType';
import { Link } from 'react-router-dom';

function Signup() {
  const [step, setStep] = useState(1);
  const inputArr2 = [
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
  const inputArr1 = [
    {
      placeholder: 'Email*',
      type: 'email',
      id: 'email',
      className: 'form-control rounded-full text-left p-3 m-2 w-full',
      style: { backgroundColor: '#DCDCDC' },
    },
  ];

  const button1: ButtonType[] = [
    {
      type: 'button',
      className: 'form-control rounded-full w-full text-center p-3 m-2 my-20',
      content: 'contine',
      style: { backgroundColor: '#FF4500' },
    },
  ];

  const button2: ButtonType[] = [
    {
      type: 'submit',
      className: 'form-control rounded-full w-full text-center p-3 m-2 my-20',
      content: 'submit',
      style: { backgroundColor: '#FF4500' },
    },
  ];

  interface InitialValues {
    userName: string;
    password: string;
    email: string;
  }
  const initialValues: InitialValues = {
    userName: '',
    password: '',
    email: '',
  };

  const handleButton = () => {
    setStep(2);
  };
  return (
    <MyForm
      type='signup'
      title={step == 1 ? 'Sign up' : ' Create your username and password'}
      paragraph={
        step === 1
          ? 'By continuing, you agree to our User Agreement and acknowledge that you understand the Privacy Policy.'
          : 'Reddit is anonymous, so your username is what you’ll go by here. Choose wisely—because once you get a name, you can’t change it.'
      }
      inputArr={step == 1 ? inputArr1 : inputArr2}
      initVal={initialValues}
      ButtArr={step == 1 ? button1 : button2}
      LogWithGoogle={step == 1 ? 'logwithgoogle' : ''}
      handleButton={step === 1 ? handleButton : undefined}
      backButton={step === 1 ? '' : 'backbutton'}
      handleBackSign={step === 1 ? undefined : () => setStep(1)}
    >
      {step === 1 ? (
        <div className='m-3 mb-5'>
          <p>
            Already a redditor?{' '}
            <Link to='/login' className='text-decoration-none text-blue-500'>
              Log In
            </Link>
          </p>
        </div>
      ) : (
        <></>
      )}
    </MyForm>
  );
}

export default Signup;
