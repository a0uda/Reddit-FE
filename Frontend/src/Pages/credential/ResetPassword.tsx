import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { FaCheckCircle } from 'react-icons/fa';

function ResetPassword() {
  return (
    <Formik
      initialValues={{ userName: '', email: '' }}
      validationSchema={Yup.object({
        userName: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
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
              <div className='float-left'>
                <Link to='/login'>
                  <IoArrowBackCircleOutline />
                </Link>
              </div>
              <div className='float-right '>
                <AiOutlineCloseCircle />
              </div>
              <div className='my-4'>
                <h2 className='m-2 pl-3 font-bold text-2xl mt-10'>
                  Reset your password
                </h2>
                <p className='m-2 pl-2 mb-3'>
                  Tell us the username and email address associated with your
                  Reddit account, and we’ll send you an email with a link to
                  reset your password.
                </p>
              </div>
              <div className='form-outline relative'>
                {formik.values.userName ? (
                  <label className='form-label pl-3 ml-2' htmlFor='userName'>
                    Username
                  </label>
                ) : null}
                <input
                  id='userName'
                  type='text'
                  className='form-control rounded-full text-left p-3 m-2 w-full'
                  placeholder='Username*'
                  style={{ backgroundColor: '#DCDCDC' }}
                  {...formik.getFieldProps('userName')}
                />
                {formik.touched.userName && !formik.errors.userName && (
                  <FaCheckCircle className='absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 mt-3' />
                )}
              </div>

              <div className='form-outline relative'>
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
                {formik.touched.email && !formik.errors.email && (
                  <FaCheckCircle className='absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 mt-3' />
                )}
              </div>

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
                  <Link
                    to='/login'
                    className='text-decoration-none text-blue-500'
                  >
                    Log In .
                  </Link>
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
                className='form-control rounded-full w-full text-center p-3 m-2 my-20 text-white'
                style={{ backgroundColor: '#FF4500' }}
              >
                Reset password
              </button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
}

export default ResetPassword;
