import { useState } from 'react';
import MyForm from '../../Components/Form';
import { ButtonType } from '../../validate/buttonType';
import { postRequest } from '../../API/User';
import { Dialog, DialogBody, IconButton } from '@material-tailwind/react';
import { IoMdClose } from 'react-icons/io';
import { IoMdArrowBack } from 'react-icons/io';
import { useMutation } from 'react-query';
import { saveToken } from '../../utils/tokens_helper';

export default function Signup(props: {
  open: boolean;
  handleOpen: () => void;
  openLogin: () => void;
}) {
  const [step, setStep] = useState(1);
  const [errorMessage, seterrorMessage] = useState('');

  const inputArr2 = [
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
  const inputArr1 = [
    {
      placeholder: 'Email*',
      type: 'email',
      id: 'email',
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
        'form-control rounded-full w-full text-center p-3 m-2 my-10 mt-20',
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

  const mutation = useMutation(postRequest, {
    onSuccess: (response) => {
      const { token } = response;
      console.log(response);

      saveToken(token);
      seterrorMessage('');
      props.handleOpen();
      // location.reload();
    },
    onError: () => {
      seterrorMessage('Failed to signup');
    },
  });

  const handleOnSubmit = (values: object) => {
    mutation.mutate({
      endPoint: 'users/signup',
      data: values,
    });
  };

  return (
    <Dialog size='sm' open={props.open} handler={props.handleOpen}>
      <DialogBody className='text-black'>
        <div className='my-4 m-2'>
          {step == 2 ? (
            <span onClick={() => setStep(1)} className='float-left'>
              <IoMdArrowBack size={32} />
            </span>
          ) : null}
          <IconButton onClick={props.handleOpen} className='float-right'>
            <IoMdClose size={32} />
          </IconButton>
        </div>

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
          HandleOnSubmitFunction={handleOnSubmit}
          errorMessage={errorMessage}
          handleModal={() => {
            props.handleOpen();
          }}
          gender={step == 2 ? true : false}
        >
          {step === 1 ? (
            <>
              <div className='m-3 mb-5'>
                <p>
                  Already a redditor?{' '}
                  <span
                    onClick={() => {
                      props.handleOpen();
                      props.openLogin();
                    }}
                    className='text-decoration-none text-[#6366f1] cursor-pointer'
                  >
                    Log In
                  </span>
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
