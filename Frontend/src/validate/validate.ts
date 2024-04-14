import * as yup from 'yup';
import { validationSchema } from './validateSchema';

type FormSchema = {
  login: {
    username: yup.Schema<string>;
    password: yup.Schema<string>;
  };
  signup: {
    username: yup.Schema<string>;
    password: yup.Schema<string>;
    email: yup.Schema<string>;
  };
  recoverUsername: {
    email: yup.Schema<string>;
  };
  resetPassword: {
    username: yup.Schema<string>;
    email: yup.Schema<string>;
  };
  changePassword: {
    password: yup.Schema<string>;
    newPassword: yup.Schema<string>;
    confirmNewPassword: yup.Schema<string>;
  };
};

const Validation = (type: keyof FormSchema) => {
  const formSchema: FormSchema = {
    login: {
      username: validationSchema['username'],
      password: validationSchema['password'],
    },
    signup: {
      username: validationSchema['username'],
      password: validationSchema['password'],
      email: validationSchema['email'],
    },
    recoverUsername: {
      email: validationSchema['email'],
    },
    resetPassword: {
      username: validationSchema['username'],
      email: validationSchema['email'],
    },
    changePassword: {
      password: validationSchema['password'],
      newPassword: validationSchema['newPassword'],
      confirmNewPassword: validationSchema['confirmNewPassword'],
    },
  };

  const schema = yup.object().shape(formSchema[type]);
  return schema;
};
export default Validation;
