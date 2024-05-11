import MyForm from '../../Components/Form';
import { ButtonType } from '../../validate/buttonType';
import { postRequest } from '../../API/User';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { saveToken } from '../../utils/tokens_helper';
import { useNavigate, useParams } from 'react-router-dom';

export default function ResetPasswordPage() {
  const { token } = useParams<{ token: string }>();
  const [errorMessage, seterrorMessage] = useState('');
  const inputArr = [
    {
      placeholder: 'New Password*',
      type: 'password',
      id: 'newPassword',
      style: { backgroundColor: '#DCDCDC' },
    },
    {
      placeholder: 'Confirm Password*',
      type: 'password',
      id: 'confirmNewPassword',
      style: { backgroundColor: '#DCDCDC' },
    },
  ];
  const buttons: ButtonType[] = [
    {
      type: 'submit',
      className: 'form-control rounded-full w-full text-center p-3 mt-2',
      content: 'Reset Password',
      style: { backgroundColor: '#FF4500' },
    },
  ];
  interface InitialValues {
    newPassword: string;
    confirmNewPassword: string;
  }
  const initialValues: InitialValues = {
    newPassword: '',
    confirmNewPassword: '',
  };
  const navigate = useNavigate();
  const mutation = useMutation(postRequest, {
    onError: () => {
      seterrorMessage('An error occured please try again');
    },
  });

  const handleOnSubmit = (values: {
    newPassword: string;
    confirmNewPassword: string;
  }) => {
    mutation.mutate(
      {
        endPoint: 'users/reset-password',
        data: {
          new_password: values.newPassword,
          verified_password: values.confirmNewPassword,
          token: token,
        },
      },
      {
        onSuccess: () => {
          navigate('/best');
        },
      }
    );
  };

  return (
    <>
      <div>
        <div className='text-black'>
          <MyForm
            type='resetPasswordPage'
            title='Reset your password'
            inputArr={inputArr}
            initVal={initialValues}
            ButtArr={buttons}
            // LogWithGoogle='logwithgoogle'
            HandleOnSubmitFunction={handleOnSubmit}
            errorMessage={errorMessage}
            // handleModal={() => {
            //   //   props.handleOpen();
            // }}
          />
        </div>
      </div>
    </>
  );
}
