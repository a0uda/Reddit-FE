import * as yup from 'yup';
import { validationSchema } from './validateSchema';

type FormSchema = {
  login: {
    userName: yup.Schema<string>;
    password: yup.Schema<string>;
  };
  signup: {
    userName: yup.Schema<string>;
    password: yup.Schema<string>;
    email: yup.Schema<string>;
  };
  recoverUsername: {
    email: yup.Schema<string>;
  };
  resetPassword: {
    userName: yup.Schema<string>;
    email: yup.Schema<string>;
  };
  disconnectGoogle: {
    password: yup.Schema<string>;
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
      userName: validationSchema['username'],
      password: validationSchema['password'],
    },
    signup: {
      userName: validationSchema['username'],
      password: validationSchema['password'],
      email: validationSchema['email'],
    },
    recoverUsername: {
      email: validationSchema['email'],
    },
    resetPassword: {
      userName: validationSchema['username'],
      email: validationSchema['email'],
    },
    disconnectGoogle: {
      password: validationSchema['password'],
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
