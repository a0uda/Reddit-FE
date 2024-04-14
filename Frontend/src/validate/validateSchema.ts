import * as yup from 'yup';

export const validationSchema = {
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username should have more than 3 characters'),
  email: yup.string().email('Invalid email').required('Required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Password must be at most 20 characters'),
  newPassword: yup
    .string()
    .required('New password is required')
    .min(8, 'New password must be at least 8 characters')
    .max(20, 'New password must be at most 20 characters'),
  confirmNewPassword: yup
    .string()
    .required('Please confirm your new password')
    .oneOf([yup.ref('newPassword')], 'Passwords must match'),
};
