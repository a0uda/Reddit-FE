import React from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import Validation from '../validate/validate';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import FormHeader from './FormHeader';
import Input from './Input';
import Button from './Button';
import LoginWithGoogle from './LoginWithGoogle';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
type FormSchema = {
  login: {
    userName: string;
    password: string;
  };
  signup: {
    userName: string;
    password: string;
    email: string;
  };
  recoverUsername: {
    email: string;
  };
  resetPassword: {
    userName: string;
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
  handleButton?: () => void;
  backButton?: string;
  linkBackButton?: string;
  handleBackSign?: () => void;
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
}) => {
  const validateSchema = Validation(type || 'login');

  return (
    <Formik
      validationSchema={validateSchema}
      initialValues={initVal || {}}
      onSubmit={(values, { setSubmitting }) => {
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
            <div className='lg:w-96'>
              {backButton ? (
                <div className='float-left'>
                  {handleBackSign ? (
                    <span onClick={handleBackSign}>
                      <IoArrowBackCircleOutline />
                    </span>
                  ) : (
                    <Link to={linkBackButton || '/'}>
                      <IoArrowBackCircleOutline />
                    </Link>
                  )}
                </div>
              ) : null}
              <div className='float-right'>
                {' '}
                <AiOutlineCloseCircle />
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
                  <Input
                    key={i}
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
                ))}
              {children}

              {ButtArr &&
                ButtArr.map((button, i) => (
                  <Button
                    key={i}
                    style={
                      Object.keys(formik.errors).length > 0 ||
                      !Object.values(formik.values).every(
                        (value) => value.trim() !== ''
                      )
                        ? { backgroundColor: '#DCDCDC' }
                        : { backgroundColor: '#FF4500' }
                    }
                    type={button.type}
                    className={
                      button.className +
                      (Object.keys(formik.errors).length > 0 ||
                      !Object.values(formik.values).every(
                        (value) => value.trim() !== ''
                      )
                        ? ' text-gray-500'
                        : ' text-white')
                    }
                    content={button.content}
                    onClick={handleButton}
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
