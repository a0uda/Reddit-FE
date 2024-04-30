import { Dialog, DialogHeader, DialogFooter } from '@material-tailwind/react';
import RoundedButton from '../../Components/RoundedButton';
import { IoMdClose } from 'react-icons/io';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { useMutation } from 'react-query';
import { postRequest } from '../../API/User';
import Input from '../../Components/Input';

interface RuleFormProps {
  handleOpen: () => void;
  open: boolean;
}
interface DataType {
  community_name: string;
  username: string;
  action: string;
  reason: string;
}

export default function MuteUser(props: RuleFormProps): JSX.Element {
  const { community_name } = useParams();

  const mutation = useMutation(postRequest, {
    onSuccess: () => {
      console.log('Mute user successfully');
    },
    onError: () => {
      console.log('Mute user failed');
    },
  });

  const initialValues: DataType = {
    community_name: '',
    username: '',
    action: '',
    reason: '',
  };
  const handleOnSubmit = (values: object) => {
    mutation.mutate({
      endPoint: 'communities/mute-user',
      data: values,
    });
  };

  return (
    <Dialog size='sm' open={props.open} handler={props.handleOpen}>
      <DialogHeader className='!block relative flex justify-between'>
        <div className='block relative border-b border-lines-color flex justify-between'>
          <h2 className='text-left'>Mute user</h2>
          <div className='cursor-pointer' onClick={props.handleOpen}>
            <IoMdClose />
          </div>
        </div>
      </DialogHeader>
      <div className='flex flex-col md:flex-row gap-2'>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            community_name: Yup.string(),
            username: Yup.string().required('username is required'),
            action: Yup.string(),
            reason: Yup.string(),
          })}
          onSubmit={(values) => {
            if (community_name) {
              values.community_name = community_name;
            }
            values.action = 'mute';
            console.log('Submitted values:', values);
            handleOnSubmit(values);
            props.handleOpen();
          }}
        >
          {(formik) => (
            <Form className='w-full' onSubmit={formik.handleSubmit}>
              <div className='mb-4 container mb-10'>
                <Input
                  className='mt-4 w-full placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 !border !border-t-[rgb(176,190,197)]'
                  placeholder='Username to mute'
                  type='text'
                  NoCheck={true}
                  id='username'
                  value={formik.values.username}
                  onChange={formik.handleChange}
                />
              </div>

              <div className='mb-4 container'>
                <div className='text-black text-sm mt-10'>
                  Note about why they are muted
                </div>
                <div className='text-gray-700 text-xs'>
                  Only visible to other moderators.Nit visible to user
                </div>
                <Field
                  as='textarea'
                  name='reason'
                  id='reason'
                  className='form-input mt-1 block w-full border p-2 pb-10 rounded text-black'
                  placeholder='Reason they were muted'
                />
                <div className='text-gray-400 text-xs mt-1'>
                  {formik.values.reason.length > 300
                    ? `0 Characters remaining`
                    : `${300 - formik.values.reason.length} Characters remaining`}
                </div>
              </div>
              <DialogFooter className='bg-gray-200 rounded space-x-2'>
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
                  buttonText='Mute user'
                  buttonTextColor={
                    formik.values.username && !formik.errors.username
                      ? 'text-white'
                      : 'text-gray-500'
                  }
                  buttonColor={
                    formik.values.username && !formik.errors.username
                      ? 'bg-blue-light'
                      : 'bg-gray-200'
                  }
                />
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </div>
    </Dialog>
  );
}
