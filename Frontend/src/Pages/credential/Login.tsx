import { Formik } from 'formik';
import * as Yup from 'yup';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

function Login() {
  return (
    <Formik
      initialValues={{ userName: '', password: '' }}
      validationSchema={Yup.object({
        userName: Yup.string().required('Required'),
        password: Yup.string().required('Required'),
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
          className='container mx-auto lg:p-5 my-5'
        >
          <div className='flex justify-center'>
            <div className='lg:w-96'>
              <div className='float-right m-3'>
                {' '}
                <AiOutlineCloseCircle />
              </div>
              <div className='my-4'>
                <h1 className='m-2 pl-3 font-bold text-2xl'>Log In</h1>
                <p className='m-2 pl-2 mb-3'>
                  By continuing, you agree to our User Agreement and acknowledge
                  that you understand the Privacy Policy.
                </p>
              </div>
              <a
                href='#'
                className='btn rounded-full w-full form-control text-decoration-none p-2 m-2 border flex items-center justify-center'
              >
                <span>
                  <FcGoogle className='mr-2' />
                </span>
                <span>Continue with Google</span>
              </a>
              <div className='flex items-center justify-center my-2'>
                <hr className='my-3 w-1/2' />
                <span className='px-3'>OR</span>
                <hr className='my-3 w-1/2' />
              </div>
              <div className='form-outline relative'>
                {formik.values.userName ? (
                  <label className='form-label ps-3 ms-2' htmlFor='userName'>
                    Username
                  </label>
                ) : null}
                <input
                  id='userName'
                  type='text'
                  className={`form-control rounded-full text-left p-3 m-2 w-full ${
                    formik.touched.userName && formik.errors.userName
                      ? 'border-red-500'
                      : 'border-gray-300'
                  }`}
                  placeholder='Username*'
                  style={{ backgroundColor: '#DCDCDC' }}
                  {...formik.getFieldProps('userName')}
                />
                {formik.touched.userName && !formik.errors.userName && (
                  <FaCheckCircle className='absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 mt-3' />
                )}
                {formik.touched.userName && formik.errors.userName && (
                  <div className='text-red-500 ps-3'>
                    {formik.errors.userName}
                    {'*'}
                  </div>
                )}
              </div>
              <div className='form-outline relative'>
                {formik.values.password ? (
                  <label className='form-label ps-3 ms-2' htmlFor='password'>
                    Password
                  </label>
                ) : null}

                <input
                  id='password'
                  type='password'
                  placeholder='Password*'
                  className={`form-control rounded-full text-left p-3 m-2 w-full ${
                    formik.touched.password && formik.errors.password
                      ? 'border-red-500'
                      : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: '#DCDCDC' }}
                  {...formik.getFieldProps('password')}
                />
                {formik.touched.password && !formik.errors.password && (
                  <FaCheckCircle className='absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 mt-3' />
                )}
                {formik.touched.password && formik.errors.password && (
                  <div className='text-red-500 ps-3'>
                    {formik.errors.password}
                    {'*'}
                  </div>
                )}
              </div>
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
                  <Link
                    to='/signup'
                    className='text-decoration-none text-blue-500'
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
              <button
                type='submit'
                className={`form-control rounded-full w-full text-center p-3 m-2 my-20 ${
                  !formik.errors.userName &&
                  !formik.errors.password &&
                  formik.values.password
                    ? 'text-white'
                    : 'text-gray-500'
                }`}
                style={
                  formik.values.userName && formik.values.password
                    ? { backgroundColor: '#FF4500' }
                    : { backgroundColor: '#DCDCDC' }
                }
              >
                Log In
              </button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
}

export default Login;
