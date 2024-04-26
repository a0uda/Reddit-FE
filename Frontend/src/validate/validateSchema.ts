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
  title: yup.string().required('Title is required'),
  description: yup.string(),
  link_url: yup
    .string()
    .required('Link URl is required')
    .url('Invalid URL format'),
  images: yup
    .array()
    .of(
      yup.object().shape({
        path: yup.string().required('Path is required'),
        caption: yup.string().required('Caption is required'),
        link: yup.string().required('Link is required'),
      })
    )
    .min(1, 'At least one image is required')
    .required(),
  videos: yup.array().of(
    yup.object().shape({
      path: yup.string().required('Path is required'),
      caption: yup.string().required('Caption is required'),
      link: yup.string().required('Link is required'),
    })
  ),
  type: yup.string().required(),
  post_in_community_flag: yup.boolean().required(),
  // community_name: yup.string().when('post_in_community_flag', {
  //   is: true,
  //   then: yup.string().required('Community name is required'),
  //   otherwise: yup.string(),
  // }),
  nsfw_flag: yup.boolean().required(),
  spoiler_flag: yup.boolean().required(),
  oc_flag: yup.boolean().required(),
  polls_voting_length: yup.number().required(),
  polls: yup
    .array()
    .of(
      yup.object().shape({
        options: yup.string().required('Option is required'),
      })
    )
    .min(2, 'At least 2 options are required')
    .required(),
  gender: yup.string(),
  rule_title: yup.string().required(),
  community_name: yup.string().required(),
  applies_to: yup.string().max(100, '100 maxium').required(),
  report_reason: yup.string().max(100, '100 maxium').required(),
  full_description: yup.string().max(500, '500 maxium'),
};
