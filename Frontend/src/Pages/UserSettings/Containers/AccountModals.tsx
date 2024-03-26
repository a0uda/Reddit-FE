import React from 'react';
import { Formik, FormikErrors } from 'formik';
import Validation from '../../../validate/validate';
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Input,
  Typography,
} from '@material-tailwind/react';
import RoundedButton from '../../../Components/RoundedButton';
import {
  ExclamationCircleIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import { useMutation } from 'react-query';
import { patchRequest, postRequest } from '../../../API/User';
import { useAlert } from '../../../Providers/AlertProvider';

function validateEmail(email) {
  // Regular expression for validating email addresses
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export const ChangeEmailModalError = (props: {
  handleOpen;
  open;
  email: string;
}) => {
  const [modalNum, setModalNum] = React.useState(0);
  return (
    <>
      <Dialog size='sm' open={props.open} handler={props.handleOpen}>
        <DialogHeader className='!block text-center border-b border-lines-color p-5'>
          <h2 className='flex items-center'>
            <div className='relative'>
              <EnvelopeIcon
                strokeWidth={1.5}
                className='h-8 w-8 mx-4 text-white'
                fill='#0079D3'
              />
              <ExclamationCircleIcon
                strokeWidth={1.5}
                className='h-6 w-6 absolute top-0 right-[6px] text-white'
                fill='red'
              />
            </div>
            {modalNum == 0 ? 'Change your Email Address' : 'Check your Email'}
          </h2>
          <IconButton
            color='blue-gray'
            size='sm'
            variant='text'
            onClick={() => {
              props.handleOpen();
              setModalNum(0);
            }}
            className='!absolute right-[10px] top-[10px]'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
              className='h-5 w-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </IconButton>
        </DialogHeader>
        <DialogBody className='flex gap-2 p-5'>
          {modalNum == 0
            ? "To change your email address, you need to create a Reddit password first. We'll walk you through it."
            : `We sent a message to ${props.email} with a link to create your password.`}
        </DialogBody>
        <DialogFooter className='p-5 gap-2'>
          {modalNum == 0 ? (
            <>
              <RoundedButton
                buttonBorderColor='border-blue-light'
                buttonColor='bg-inherit'
                buttonText='Cancel'
                buttonTextColor='text-blue-light'
                onClick={() => {
                  props.handleOpen();
                  setModalNum(0);
                }}
              />
              <RoundedButton
                buttonBorderColor='border-blue-light'
                buttonColor='bg-blue-light'
                buttonText='Continue'
                buttonTextColor='text-white'
                onClick={() => {
                  setModalNum(1);
                }}
              />
            </>
          ) : (
            <RoundedButton
              buttonBorderColor='border-blue-light'
              buttonColor='bg-blue-light'
              buttonText='Ok'
              buttonTextColor='text-white'
              onClick={() => {
                props.handleOpen();
                setModalNum(0);
              }}
            />
          )}
        </DialogFooter>
      </Dialog>
    </>
  );
};

export const ChangeEmailModal = (props: {
  handleOpen;
  open;
  refetch;
  email: string;
}) => {
  const [modalNum, setModalNum] = React.useState(0);
  const [pwd, setPwd] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [showError, setShowError] = React.useState(false);
  const { trigger, setTrigger, setAlertMessage, setIsError } = useAlert();
  const patchReq = useMutation(patchRequest, {
    onSuccess: () => {
      props.refetch();
      setTrigger(!trigger);
      setIsError(false);
      setAlertMessage('User Settings Updated Successfully');
    },
    onError: (error) => {
      setTrigger(!trigger);
      setIsError(true);
      setAlertMessage(error.message);
    },
  });

  return (
    <>
      <Dialog size='xs' open={props.open} handler={props.handleOpen}>
        <DialogHeader className='!block text-center border-b border-lines-color p-5'>
          <h2 className='flex items-center'>
            <div className='relative'>
              <EnvelopeIcon
                strokeWidth={1.5}
                className='h-8 w-8 mx-4 text-white'
                fill='#0079D3'
              />
              <ExclamationCircleIcon
                strokeWidth={1.5}
                className='h-6 w-6 absolute top-0 right-[6px] text-white'
                fill='red'
              />
            </div>
            {modalNum == 0 ? 'Update your Email' : 'Check your Email'}
          </h2>
          <IconButton
            color='blue-gray'
            size='sm'
            variant='text'
            onClick={() => {
              setModalNum(0);
              setShowError(false);
              props.handleOpen();
            }}
            className='!absolute right-[10px] top-[10px]'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
              className='h-5 w-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </IconButton>
        </DialogHeader>
        <DialogBody className='flex gap-6 p-5 flex-col'>
          {modalNum == 0 ? (
            <>
              <p>
                Update your email below. There will be a new verification email
                sent that you will need to use to verify this new email.
              </p>
              <div className='flex flex-col gap-3'>
                <Input
                  label='Current Password'
                  type='password'
                  value={pwd}
                  onChange={(e) => {
                    setPwd(e.target.value);
                    setShowError(true);
                  }}
                />
                <div>
                  <Input
                    label='New Email'
                    type='email'
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setShowError(true);
                    }}
                    // className='!border-danger-red'
                    error={
                      (!validateEmail(email) || email == props.email) &&
                      showError
                    }
                    // error={true}
                    // crossOrigin={undefined}
                  />
                  {(!validateEmail(email) || email == props.email) &&
                    showError && (
                      <Typography
                        variant='small'
                        color='gray'
                        className='mt-2 flex items-center gap-1 font-normal text-danger-red'
                        // hidden={!validateEmail(email)}
                      >
                        {email == props.email
                          ? 'You entered the current email address. Please enter a different one to proceed'
                          : 'Please enter a valid Email'}
                      </Typography>
                    )}
                </div>
              </div>
            </>
          ) : (
            <p>
              Reddit sent a confirmation email
              <br />
              to: <strong className='font-bold'>{email}</strong> <br />
              Click the verify link in the email to secure your Reddit account{' '}
            </p>
          )}
        </DialogBody>
        <DialogFooter className='p-5 gap-2'>
          <RoundedButton
            buttonBorderColor='border-blue-light'
            buttonColor='bg-blue-light'
            buttonText={modalNum == 0 ? 'Save Email' : 'Got it'}
            buttonTextColor='text-white'
            disabled={
              (!validateEmail(email) || !pwd || email == props.email) &&
              modalNum == 0
            }
            onClick={() => {
              if (modalNum == 0) {
                patchReq.mutate({
                  endPoint: 'users/change-email',
                  newSettings: {
                    password: pwd,
                    new_email: email,
                  },
                });
                setModalNum(1);
              } else {
                setEmail('');
                setPwd('');
                setModalNum(0);
                setShowError(false);
                props.handleOpen();
              }
            }}
          />
        </DialogFooter>
      </Dialog>
    </>
  );
};

export const DisconnectGoogleModal = (props: {
  handleOpen;
  open;
  refetch();
}) => {
  const [pwd, setPwd] = React.useState('');
  const { trigger, setTrigger, setAlertMessage, setIsError } = useAlert();

  const postReq = useMutation(postRequest, {
    onSuccess: () => {
      props.refetch();
      setTrigger(!trigger);
      setIsError(false);
      setAlertMessage('User Settings Updated Successfully');
    },
    onError: (error) => {
      setTrigger(!trigger);
      setIsError(true);
      setAlertMessage(error.message);
    },
  });

  return (
    <>
      <Dialog size='sm' open={props.open} handler={props.handleOpen}>
        <DialogHeader className='!block text-center border-b border-lines-color p-5'>
          <h2 className='flex items-center'>
            <div className='relative'>
              <EnvelopeIcon
                strokeWidth={1.5}
                className='h-8 w-8 mx-4 text-white'
                fill='#0079D3'
              />
              <ExclamationCircleIcon
                strokeWidth={1.5}
                className='h-6 w-6 absolute top-0 right-[6px] text-white'
                fill='red'
              />
            </div>
            Disconnect your Google Account
          </h2>
          <IconButton
            color='blue-gray'
            size='sm'
            variant='text'
            onClick={props.handleOpen}
            className='!absolute right-[10px] top-[10px]'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
              className='h-5 w-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </IconButton>
        </DialogHeader>
        <DialogBody className='flex gap-6 p-5 flex-col'>
          To continue, confirm your password.
          <Input
            label='Password'
            type='password'
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
        </DialogBody>
        <DialogFooter className='p-5 gap-2'>
          <RoundedButton
            buttonBorderColor='border-blue-light'
            buttonColor='bg-inherit'
            buttonText='Cancel'
            buttonTextColor='text-blue-light'
            onClick={props.handleOpen}
          />
          <RoundedButton
            buttonBorderColor='border-blue-light'
            buttonColor='bg-blue-light'
            buttonText='Continue'
            buttonTextColor='text-white'
            disabled={!pwd}
            onClick={() => {
              postReq.mutate({
                endPoint: 'users/disconnect-google',
                data: { password: pwd },
              });
              setPwd('');
              props.handleOpen();
            }}
          />
        </DialogFooter>
      </Dialog>
    </>
  );
};

export const DeleteAccountModal = (props: {
  handleOpen;
  open;
  refetch;
  email: string;
}) => {
  const [pwd, setPwd] = React.useState('');
  const [username, setUsername] = React.useState('');
  const { trigger, setTrigger, setAlertMessage, setIsError } = useAlert();

  const postReq = useMutation(postRequest, {
    onSuccess: () => {
      props.refetch();
      setTrigger(!trigger);
      setIsError(false);
      setAlertMessage('User Settings Updated Successfully');
    },
    onError: (error) => {
      setTrigger(!trigger);
      setIsError(true);
      setAlertMessage(error.message);
    },
  });

  return (
    <>
      <Dialog size='md' open={props.open} handler={props.handleOpen}>
        <DialogHeader className=' text-md border-b border-lines-color'>
          Delete Account
          <IconButton
            color='blue-gray'
            size='sm'
            variant='text'
            onClick={props.handleOpen}
            className='!absolute right-[10px] top-[10px]'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
              className='h-5 w-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </IconButton>
        </DialogHeader>
        <DialogBody className='flex gap-6 p-5 flex-col'>
          We're sorry to see you go
          <br />
          <br />
          Once you delete your account, your profile and username are
          permanently removed from Reddit and your posts, comments, and messages
          are disassociated (not deleted) from your account unless you delete
          them beforehand.
          <div className='flex flex-col gap-3'>
            <span className='text-[10px] font-bold uppercase'>
              Verify your identity
            </span>
            <Input
              label='PASSWORD'
              type='password'
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
            />
            <div>
              <Input
                label='USERNAME'
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                // className='!border-danger-red'
                // error={!validateEmail(email) || email == props.email}
                // error={true}
                // crossOrigin={undefined}
              />
            </div>
          </div>
        </DialogBody>
        <DialogFooter className='p-5 gap-2'>
          <RoundedButton
            buttonBorderColor='border-blue-light'
            buttonColor='bg-inherit'
            buttonText='Cancel'
            buttonTextColor='text-blue-light'
            onClick={props.handleOpen}
          />
          <RoundedButton
            buttonBorderColor='border-blue-light'
            buttonColor='bg-blue-light'
            buttonText='Delete'
            buttonTextColor='text-white'
            disabled={!pwd || !username}
            onClick={() => {
              postReq.mutate({
                endPoint: 'users/delete-account',
                data: {
                  password: pwd,
                  username: username,
                },
              });
              setUsername('');
              setPwd('');
              props.handleOpen();
            }}
          />
        </DialogFooter>
      </Dialog>
    </>
  );
};

export const ChangePasswordModal = (props: { handleOpen; open; refetch }) => {
  const [disableButt, setDisableButt] = React.useState(true);
  const { trigger, setTrigger, setAlertMessage, setIsError } = useAlert();

  const patchReq = useMutation(patchRequest, {
    onSuccess: () => {
      props.refetch();
      setTrigger(!trigger);
      setIsError(false);
      setAlertMessage('User Settings Updated Successfully');
    },
    onError: (error) => {
      setTrigger(!trigger);
      setIsError(true);
      setAlertMessage(error.message);
    },
  });

  const inpArr = [
    { label: 'Current password', type: 'password', id: 'password' },
    { label: 'New password', type: 'password', id: 'newPassword' },
    { label: 'Confirm password', type: 'password', id: 'confirmNewPassword' },
  ];
  const initVal = {
    password: '',
    newPassword: '',
    confirmNewPassword: '',
  };
  type formikInputs = 'password' | 'newPassword' | 'confirmNewPassword';
  const validateSchema = Validation('changePassword');

  const handleSubmit = (values) => {
    console.log(values);

    patchReq.mutate({
      endPoint: 'users/change-password',
      newSettings: {
        current_password: values.password,
        new_password: values.password,
        verified_new_password: values.confirmNewPassword,
      },
    });
  };

  return (
    <>
      <Dialog size='xs' open={props.open} handler={props.handleOpen}>
        <DialogHeader className='!block text-center border-b border-lines-color p-5'>
          <h2 className='flex items-center'>Update your Password</h2>
          <IconButton
            color='blue-gray'
            size='sm'
            variant='text'
            onClick={props.handleOpen}
            className='!absolute right-[10px] top-[10px]'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
              className='h-5 w-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </IconButton>
        </DialogHeader>
        <DialogBody className='flex gap-6 p-5 flex-col'>
          <Formik
            validationSchema={validateSchema}
            initialValues={initVal}
            onSubmit={(values, { setSubmitting }) => {
              handleSubmit(values);
              props.handleOpen();
              setSubmitting(false);
            }}
          >
            {(formik) => (
              <form
                className='flex flex-col gap-3'
                onSubmit={formik.handleSubmit}
                onFocus={() => setDisableButt(false)}
              >
                {inpArr.map((inp, i) => (
                  <div key={inp.id}>
                    <Input
                      label={inp.label}
                      type={inp.type}
                      id={inp.id}
                      value={
                        formik.values[
                          inp.id as keyof typeof formik.values
                        ] as string
                      }
                      error={!!formik.errors[inp.id as formikInputs] as boolean}
                      onChange={formik.handleChange}
                      crossOrigin={undefined}
                    />

                    {(!!formik.errors[inp.id as formikInputs] as boolean) && (
                      <Typography
                        variant='small'
                        color='gray'
                        className={'ps-2 font-normal text-danger-red mt-1'}
                      >
                        {formik.errors[inp.id as formikInputs] as string}
                      </Typography>
                    )}
                  </div>
                ))}
                <div className='flex justify-end mt-[20px]'>
                  <RoundedButton
                    type='submit'
                    buttonBorderColor='border-blue-light'
                    buttonColor='bg-blue-light'
                    buttonText='Save Password'
                    buttonTextColor='text-white'
                    disabled={
                      Object.keys(formik.errors).length != 0 || disableButt
                    }
                  />
                </div>
              </form>
            )}
          </Formik>
        </DialogBody>
      </Dialog>
    </>
  );
};
