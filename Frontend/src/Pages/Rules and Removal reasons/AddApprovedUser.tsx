import { Dialog, DialogHeader, DialogFooter } from '@material-tailwind/react';
import RoundedButton from '../../Components/RoundedButton';
import { IoMdClose } from 'react-icons/io';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { useMutation } from 'react-query';
import { postRequest } from '../../API/User';
import Input from '../../Components/Input';

interface RuleFormProps {
  handleOpen: () => void;
  open: boolean;
}
interface valueDataType {
  community_name: string;
  username: string;
}
export default function AddApprovedUser(props: RuleFormProps): JSX.Element {
  const { community_name } = useParams();

  const initialValues: valueDataType = {
    community_name: '',
    username: '',
  };

  const mutation = useMutation(postRequest, {
    onSuccess: () => {
      console.log('Added Approved user successfully');
    },
    onError: () => {
      console.log('Added Approved user failed');
    },
  });

  const handleOnSubmit = (values: valueDataType) => {
    mutation.mutate({
      endPoint: 'communities/approve-user',
      data: values,
    });
  };

  return (
    <Dialog size='sm' open={props.open} handler={props.handleOpen}>
      <DialogHeader className='!block relative flex justify-between'>
        <div className='block relative border-b border-lines-color flex justify-between'>
          <h2 className='text-left'>Add approved user</h2>
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
          })}
          onSubmit={(values, { setSubmitting }) => {
            if (community_name) {
              values.community_name = community_name;
            }
            console.log('Submitted values:', values);
            handleOnSubmit(values);
            setSubmitting(false);
            props.handleOpen();
          }}
        >
          {(formik) => (
            <Form className='w-full' onSubmit={formik.handleSubmit}>
              <div className='mb-4 container mb-10'>
                <Input
                  className='mt-4 w-full placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 !border !border-t-[rgb(176,190,197)]'
                  placeholder='Enter Username'
                  type='text'
                  NoCheck={true}
                  id='username'
                  value={formik.values.username}
                  onChange={formik.handleChange}
                />
              </div>

              <DialogFooter className='bg-gray-200 rounded space-x-2 mt-10'>
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
                  buttonText='Add user'
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
