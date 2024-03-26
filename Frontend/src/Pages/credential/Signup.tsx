import { useState } from 'react';
import { Link } from 'react-router-dom';
import MyForm from '../../Components/Form';
import { ButtonType } from '../../validate/buttonType';
import { postRequest } from '../../API/User';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogBody } from '@material-tailwind/react';
export default function Signup() {
  const [step, setStep] = useState(1);
  const [errorMessage, seterrorMessage] = useState('');
  const navigate = useNavigate();
  const inputArr2 = [
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
      className:
        'form-control rounded-full w-full text-center p-3 m-2 my-10 mt-40',
      content: 'submit',
      style: { backgroundColor: '#FF4500' },
    },
  ];

  interface InitialValues {
    username: string;
    password: string;
    email: string;
  }
  const initialValues: InitialValues = {
    username: '',
    password: '',
    email: '',
  };

  const handleButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setStep(2);
  };

  const handleOnSubmit = async (values: unknown) => {
    try {
      const response = await postRequest({
        endPoint: 'users/signup',
        data: values,
      });
      const { token } = response;
      localStorage.setItem('token', token);
      seterrorMessage('');
      navigate('/');
    } catch (error) {
      seterrorMessage('Failed to signup');
    }
  };

  return (
    <Dialog size='sm' open={true} handler={() => {}}>
      <DialogBody className='text-black'>
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
          HandleOnSubmitFunction={handleOnSubmit}
          errorMessage={errorMessage}
        >
          {step === 1 ? (
            <>
              <div className='m-3 mb-5'>
                <p>
                  Already a redditor?{' '}
                  <Link
                    to='/login'
                    className='text-decoration-none'
                    style={{ color: '#6366f1' }}
                  >
                    Log In
                  </Link>
                </p>
              </div>
            </>
          ) : (
            <></>
          )}
        </MyForm>
      </DialogBody>
    </Dialog>
  );
}
