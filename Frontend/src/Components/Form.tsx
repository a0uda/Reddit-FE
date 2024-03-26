import React from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import Validation from '../validate/validate';
import FormHeader from './FormHeader';
import Input from './Input';
import Button from './Button';
import LoginWithGoogle from './LoginWithGoogle';

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
  disconnectGoogle: {
    password: string;
  };
};

export interface InputProps {
  type?: keyof FormSchema;
  initVal?: object;
  title?: string;
  paragraph?: string;
  inputArr?: Array<{
    placeholder: string;
    type: string;
    id: string;
    style?: React.CSSProperties;
  }>;
  children?: React.ReactElement<
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
  errorMessage?: string;
  HandleOnSubmitFunction?: (values: object) => void;
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
          setSubmitting(false);
        }, 400);
      }}
    >
      {/* {({ handleSubmit, handleChange, values, touched, errors }) => ( */}
      {(formik) => (
        <form
          className='container mx-auto lg:p-5 ms-4'
          onSubmit={formik.handleSubmit}
        >
          <div className='flex justify-center'>
            <div className='lg:w-96'>
              <FormHeader title={title} paragraph={paragraph} />

              {LogWithGoogle ? (
                <>
                  <LoginWithGoogle />
                  <div className='flex items-center justify-center my-2 w-full'>
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
                      key={i + inp.id}
                      placeholder={inp.placeholder}
                      style={
                        inp.style ? inp.style : { backgroundColor: '#DCDCDC' }
                      }
                      {...formik.getFieldProps(inp.id)}
                      onChange={(e) => {
                        formik.setFieldValue(inp.id, e.target.value);
                      }}
                      error={
                        !!formik.errors[
                          inp.id as keyof typeof formik.errors
                        ] as keyof typeof formik.errors
                      }
                      errorMsg={
                        formik.errors[inp.id as keyof typeof formik.errors]
                      }
                    />
                  </div>
                ))}
              {errorMessage ? (
                <div className='text-red ps-3'>{errorMessage}</div>
              ) : null}
              {children}

              {ButtArr &&
                ButtArr.map((button, i) => (
                  <Button
                    key={i}
                    style={
                      inp.style ? inp.style : { backgroundColor: '#DCDCDC' }
                    }
                    // {...formik.getFieldProps(inp.id)}
                    error={
                      !!formik.errors[
                        inp.id as keyof typeof formik.errors
                      ] as keyof typeof formik.errors
                    }
                    onChange={formik.handleChange}
                    errorMsg={
                      formik.errors[inp.id as keyof typeof formik.errors]
                    }
                  />

                  // /* {Object.keys(formik.errors).length === 0 &&
                  // Object.values(formik.values).every(
                  //   (value) => value.trim() !== ''
                  // ) ? (
                  //   <FaCheckCircle className='absolute right-3  top-1/2 -translate-y-1/2 text-green-500 ' />
                  // ) : null}
                  // {formik.touched[inp.id as keyof typeof formik.touched] &&
                  //   formik.errors[inp.id as keyof typeof formik.errors] && (
                  //     <div className='text-red-500 ps-3'>
                  //       {formik.errors[inp.id as keyof typeof formik.errors]}
                  //       {'*'}
                  //     </div>
                  //   )} */
                  // </div>
                ))}
              {children}
              <div className='flex justify-center w-full'>
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
