import { useState } from 'react';
import {
  Dialog,
  DialogHeader,
  DialogFooter,
  DialogBody,
} from '@material-tailwind/react';
import RoundedButton from '../../Components/RoundedButton';
import { IoMdClose } from 'react-icons/io';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { useMutation } from 'react-query';
import { postRequest } from '../../API/User';

interface InviteModProps {
  handleOpen: () => void;
  open: boolean;
  initialValues: {
    community_name: string;
    username: string;
    has_access: {
      everything: boolean;
      manage_users: boolean;
      manage_settings: boolean;
      manage_posts_and_comments: boolean;
    };
  };
  refetch?: () => void;
}

interface FormData {
  community_name: string;
  username: string;
  has_access: {
    everything: boolean;
    manage_users: boolean;
    manage_settings: boolean;
    manage_posts_and_comments: boolean;
  };
}

export default function InviteMod(props: InviteModProps): JSX.Element {
  const { community_name } = useParams();
  const [everything, setEverything] = useState(
    props.initialValues.has_access.everything
  );
  const [manage_users, setManage_users] = useState(
    props.initialValues.has_access.manage_users
  );
  const [manage_settings, setManage_settings] = useState(
    props.initialValues.has_access.manage_settings
  );
  const [managePost, setManagePost] = useState(
    props.initialValues.has_access.manage_posts_and_comments
  );
  console.log(everything, 'everything');

  const CheckBox = [
    {
      value: 'everything',
      label: 'Everything',
      description:
        'Full access including the ability to manage moderator access and permissions.',
      checked: everything,
      onChange: () => setEverything(!everything),
    },
    {
      value: 'manage_users',
      label: 'Manage Users',
      description:
        'Access mod notes, ban and mute users, and approve submitters*.',
      checked: manage_users,
      onChange: () => setManage_users(!manage_users),
    },
    {
      value: 'manage_settings',
      label: 'Manage settings',
      description:
        'Manage community settings, appearance, emojis, rules, and AutoMod*.',
      checked: manage_settings,
      onChange: () => setManage_settings(!manage_settings),
    },
    {
      value: 'manage_posts_and_comments',
      label: 'Manage Posts & Comments',
      description:
        'Access queues, take action on content, and manage collections and events.',
      checked: managePost,
      onChange: () => setManagePost(!managePost),
    },
  ];

  const mutation = useMutation(postRequest, {
    onSuccess: () => {
      props.refetch();
      console.log('Invitation sent successfully');
    },
    // onError: () => {
    //   console.log('Failed to send invitation');
    // },
  });

  const validationSchema = Yup.object().shape({
    username: Yup.string(),
  });

  const handleSubmit = async (values: FormData) => {
    mutation.mutate({
      endPoint: 'communities/add-moderator',
      data: values,
    });
    console.log(values);
  };

  return (
    <Dialog size='sm' open={props.open} handler={props.handleOpen}>
      <DialogHeader className='!block relative flex justify-between'>
        <div className='block relative border-b border-lines-color flex justify-between'>
          <h2 className='text-left'>Invite Moderator</h2>
          <div className='cursor-pointer' onClick={props.handleOpen}>
            <IoMdClose />
          </div>
        </div>
      </DialogHeader>
      <div className='flex flex-col md:flex-row gap-2'>
        <Formik
          initialValues={props.initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            if (community_name) {
              values.community_name = community_name;
            }
            if (everything) {
              values.has_access.everything = true;
            } else values.has_access.everything = false;
            if (manage_users) {
              values.has_access.manage_users = true;
            } else values.has_access.manage_users = false;
            if (manage_settings) {
              values.has_access.manage_settings = true;
            } else values.has_access.manage_settings = false;
            if (managePost) {
              values.has_access.manage_posts_and_comments = true;
            } else values.has_access.manage_posts_and_comments = false;
            handleSubmit(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className='w-full'>
              <DialogBody className='text-gray-700'>
                <div className='space-y-2'>
                  <div>
                    <div className='block text-gray-800  text-xs'>
                      ENTER USERNAME
                    </div>
                    <Field
                      type='input'
                      name='username'
                      placeholder='u/username'
                      className='form-input mt-1 block w-full border p-2 rounded text-gray-800'
                    />
                  </div>
                  <p className='text-black font-bold'>Give them access to...</p>
                  {CheckBox.map((attr, index) => (
                    <div key={index}>
                      <input
                        type='checkbox'
                        id={attr.value}
                        name={attr.value}
                        checked={everything ? everything : attr.checked}
                        onChange={attr.onChange}
                        className='mr-2 text-blue-light bg-blue-light'
                      />
                      <label htmlFor={attr.value} className=' text-gray-800'>
                        {attr.label}
                      </label>
                      <div className='text-gray-700 text-xs'>
                        {attr.description}
                      </div>
                    </div>
                  ))}
                  <hr />
                </div>
              </DialogBody>
              <DialogFooter className='bg-gray-200 rounded space-x-2 '>
                <RoundedButton
                  type='button'
                  buttonBorderColor='border-blue-light'
                  buttonText='Cancel'
                  buttonTextColor='text-blue-light font-bold'
                  buttonColor='bg-gray-200 '
                  onClick={props.handleOpen}
                />
                <RoundedButton
                  type='submit'
                  buttonBorderColor='border-gray-200 font-bold'
                  buttonText='Invite'
                  buttonTextColor='text-white'
                  buttonColor='bg-blue-light'
                  disabled={isSubmitting}
                />
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </div>
    </Dialog>
  );
}
