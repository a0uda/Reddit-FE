import React from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import Validation from '../validate/validate';
import { MdOutlineClose } from 'react-icons/md';
import FormHeader from './FormHeader';
import Input from './Input';
import Button from './Button';
import LoginWithGoogle from './LoginWithGoogle';
import { IoMdArrowBack } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

type FormSchema = {
  login: {
    username: string;
    password: string;
  };
  signup: {
    username: string;
    password: string;
    email: string;
  };
  recoverUsername: {
    email: string;
  };
  resetPassword: {
    username: string;
    email: string;
  };
};

interface InputProps {
  type?: keyof FormSchema;
  initVal?: object;
  title?: string;
  paragraph?: string;
  inputArr?: Array<{
    placeholder: string;
    type: string;
    id: string;
    className: string;
    style?: React.CSSProperties;
  }>;
  children: React.ReactElement<
    JSX.IntrinsicElements[keyof JSX.IntrinsicElements]
  >;
  ButtArr?: {
    type?: 'submit' | 'button' | 'reset' | undefined;
    className?: string;
    content?: string;
    style?: React.CSSProperties;
  }[];
  LogWithGoogle?: string;
  formTitle?: string;
  formParagraph?: string;
  handleButton?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  backButton?: string;
  linkBackButton?: string;
  handleBackSign?: () => void;
  HandleOnSubmitFunction: (values: unknown) => void;
  errorMessage?: string;
}

const MyForm: React.FC<InputProps> = ({
  type,
  initVal,
  title,
  paragraph,
  inputArr,
  children,
  ButtArr,
  LogWithGoogle,
  handleButton,
  backButton,
  linkBackButton,
  handleBackSign,
  HandleOnSubmitFunction,
  errorMessage,
}) => {
  const validateSchema = Validation(type || 'login');

  return (
    <Formik
      validationSchema={validateSchema}
      initialValues={initVal || {}}
      onSubmit={(values, { setSubmitting }) => {
        if (HandleOnSubmitFunction) {
          HandleOnSubmitFunction(values);
        }
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {(formik) => (
        <form
          className='container mx-auto lg:p-5 my-5'
          onSubmit={formik.handleSubmit}
        >
          <div className='flex justify-center'>
            <div className='lg:w-96  '>
              {backButton ? (
                <div className='float-left'>
                  {handleBackSign ? (
                    <span onClick={handleBackSign}>
                      <IoMdArrowBack size={32} />
                    </span>
                  ) : (
                    <Link to={linkBackButton || '/'}>
                      <IoMdArrowBack size={32} />
                    </Link>
                  )}
                </div>
              ) : null}
              <div className='float-right'>
                {' '}
                <MdOutlineClose size={32} />
              </div>
              <FormHeader title={title} paragraph={paragraph} />

              {LogWithGoogle ? (
                <>
                  <LoginWithGoogle />
                  <div className='flex items-center justify-center my-2'>
                    <hr className='my-3 w-1/2' />
                    <span className='px-3'>OR</span>
                    <hr className='my-3 w-1/2' />
                  </div>
                </>
              ) : null}

              {inputArr &&
                inputArr.map((inp, i) => (
                  <div key={i} className='relative'>
                    <Input
                      id={inp.id}
                      type={inp.type}
                      className={inp.className}
                      placeholder={inp.placeholder}
                      style={
                        inp.style ? inp.style : { backgroundColor: '#DCDCDC' }
                      }
                      {...formik.getFieldProps(inp.id)}
                      onChange={(e) => {
                        formik.setFieldValue(inp.id, e.target.value);
                      }}
                    />
                    {Object.keys(formik.errors).length === 0 &&
                    Object.values(formik.values).every(
                      (value) => value.trim() !== ''
                    ) ? (
                      <FaCheckCircle className='absolute right-3  top-1/2 -translate-y-1/2 text-green ' />
                    ) : null}
                    {formik.touched[inp.id as keyof typeof formik.touched] &&
                      formik.errors[inp.id as keyof typeof formik.errors] && (
                        <div className='text-red ps-3'>
                          {formik.errors[inp.id as keyof typeof formik.errors]}
                          {'*'}
                        </div>
                      )}
                  </div>
                ))}
              {errorMessage ? (
                <div className='text-red ps-3 mt-5'>{errorMessage}</div>
              ) : null}
              {children}

              {ButtArr &&
                ButtArr.map((button, i) => (
                  <Button
                    key={i}
                    style={
                      typeof handleButton !== 'function'
                        ? Object.keys(formik.errors).length > 0 ||
                          !Object.values(formik.values).every(
                            (value) => value.trim() !== ''
                          )
                          ? { backgroundColor: '#DCDCDC' }
                          : { backgroundColor: '#FF4500' }
                        : { backgroundColor: '#FF4500' }
                    }
                    type={button.type}
                    className={
                      button.className +
                      (typeof handleButton !== 'function'
                        ? Object.keys(formik.errors).length > 0 ||
                          !Object.values(formik.values).every(
                            (value) => value.trim() !== ''
                          )
                          ? ' text-gray-500'
                          : ' text-white'
                        : ' text-white')
                    }
                    content={button.content}
                    onClick={
                      Object.values(formik.values).filter(
                        (value) => value === ''
                      ).length < 3 &&
                      !Object.values(formik.errors).some(
                        (error) => error === 'Invalid email'
                      )
                        ? handleButton
                        : undefined
                    }
                  />
                ))}
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

MyForm.propTypes = {
  type: PropTypes.oneOf([
    'login',
    'signup',
    'recoverUsername',
    'resetPassword',
  ]),
  initVal: PropTypes.object,
  title: PropTypes.string.isRequired,
  paragraph: PropTypes.string.isRequired,
  LogWithGoogle: PropTypes.string,
};

export default MyForm;
