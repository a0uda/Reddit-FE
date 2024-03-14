import { Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

function Signup() {
  const [step, setStep] = useState(1);

  return (
    <Formik
      initialValues={{ userName: '', password: '', email: '' }}
      validationSchema={Yup.object({
        userName: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().required('Required').min(8),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {(formik) => (
        <form
          onSubmit={formik.handleSubmit}
          className='container mx-auto lg:p-5 my-10'
        >
          <div className='flex justify-center'>
            <div className='lg:w-96 sm:w-auto'>
              {step === 2 ? (
                <div className='float-left' onClick={() => setStep(1)}>
                  <IoArrowBackCircleOutline />
                </div>
              ) : null}
              <div className='float-right'>
                <AiOutlineCloseCircle />
              </div>
              <div className='my-4'>
                <h2 className='m-2 pl-3 font-bold text-2xl my-10'>
                  {step === 1
                    ? 'Sign Up'
                    : ' Create your username and password'}
                </h2>
                <p className='m-2 pl-2 mb-3'>
                  {step === 1
                    ? '  By continuing, you agree to our User Agreement and acknowledge that you understand the Privacy Policy.'
                    : 'Reddit is anonymous, so your username is what you’ll go by here. Choose wisely—because once you get a name, you can’t change it.'}
                </p>
              </div>
              {step === 1 ? (
                <a
                  href='#'
                  className='btn rounded-full w-full form-control text-decoration-none p-2 m-2 border flex items-center justify-center'
                >
                  <span>
                    <FcGoogle className='mr-2' />
                  </span>
                  <span>Continue with Google</span>
                </a>
              ) : null}
              {step === 1 ? (
                <div className='flex items-center justify-center my-2'>
                  <hr className='my-3 w-1/2' />
                  <span className='px-3'>OR</span>
                  <hr className='my-3 w-1/2' />
                </div>
              ) : null}
              {step === 1 ? (
                <div className='form-outline'>
                  {formik.values.email ? (
                    <label className='form-label pl-3 ml-2' htmlFor='email'>
                      Email
                    </label>
                  ) : null}
                  <input
                    id='email'
                    type='text'
                    className='form-control rounded-full text-left p-3 m-2 w-full'
                    placeholder='Email*'
                    style={{ backgroundColor: '#DCDCDC' }}
                    {...formik.getFieldProps('email')}
                  />
                </div>
              ) : (
                <>
                  <div className='form-outline'>
                    {formik.values.userName ? (
                      <label
                        className='form-label pl-3 ml-2'
                        htmlFor='username'
                      >
                        Username
                      </label>
                    ) : null}
                    <input
                      id='username'
                      type='text'
                      className='form-control rounded-full text-left p-3 m-2 w-full'
                      placeholder='Username*'
                      style={{ backgroundColor: '#DCDCDC' }}
                      {...formik.getFieldProps('userName')}
                    />
                  </div>
                  <div className='form-outline'>
                    {formik.values.password ? (
                      <label
                        className='form-label pl-3 ml-2'
                        htmlFor='password'
                      >
                        Password
                      </label>
                    ) : null}
                    <input
                      id='password'
                      type='password'
                      className='form-control rounded-full text-left p-3 m-2 w-full'
                      placeholder='Password*'
                      style={{ backgroundColor: '#DCDCDC' }}
                      {...formik.getFieldProps('password')}
                    />
                  </div>
                </>
              )}
              {step === 1 ? (
                <div className='m-3 mb-5'>
                  <p>
                    Already a redditor?{' '}
                    <Link
                      to='/login'
                      className='text-decoration-none text-blue-500'
                    >
                      Log In
                    </Link>
                  </p>
                </div>
              ) : null}
              {step === 1 ? (
                <button
                  type='submit'
                  className='form-control rounded-full w-full text-center p-3 m-2 my-20 text-white'
                  style={{ backgroundColor: '#FF4500' }}
                  onClick={() => {
                    formik.values.email && !formik.errors.email
                      ? setStep(2)
                      : null;
                  }}
                >
                  Continue
                </button>
              ) : (
                <button
                  type='submit'
                  className={`form-control rounded-full w-full text-center p-3 m-2 my-20 ${
                    !formik.errors.userName && !formik.errors.password
                      ? 'text-white'
                      : 'text-gray-500'
                  }`}
                  style={
                    !formik.errors.userName && !formik.errors.password
                      ? { backgroundColor: '#FF4500' }
                      : { backgroundColor: '#DCDCDC' }
                  }
                >
                  Continue
                </button>
              )}
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
}

export default Signup;
