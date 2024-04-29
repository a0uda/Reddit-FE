import {
  Dialog,
  DialogHeader,
  DialogFooter,
  DialogBody,
} from '@material-tailwind/react';
import RoundedButton from '../../Components/RoundedButton';
import { IoMdClose } from 'react-icons/io';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { useMutation } from 'react-query';
import { postRequest } from '../../API/User';

interface ApproveFormProps {
  handleOpen: () => void;
  open: boolean;
  username: string;
}
interface valueDataType {
  community_name: string;
  username: string;
}
export default function RemoveApprovedUser(
  props: ApproveFormProps
): JSX.Element {
  const { community_name } = useParams();

  const initialValues: valueDataType = {
    community_name: '',
    username: '',
  };

  const mutation = useMutation(postRequest, {
    onSuccess: () => {
      console.log('User removed successfully');
    },
    onError: () => {
      console.log('Failed to Remove User');
    },
  });

  const handleOnSubmit = (values: valueDataType) => {
    mutation.mutate({
      endPoint: 'communities/unapprove-user',
      data: values,
    });
  };

  return (
    <Dialog size='sm' open={props.open} handler={props.handleOpen}>
      <DialogHeader className='!block relative flex justify-between'>
        <div className='block relative border-b border-lines-color flex justify-between'>
          <h2 className='text-left'>Confirm</h2>
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
            values.username = props.username;
            console.log('Submitted values:', values);
            handleOnSubmit(values);
            setSubmitting(false);
            props.handleOpen();
          }}
        >
          {(formik) => (
            <Form className='w-full' onSubmit={formik.handleSubmit}>
              <DialogBody className='text-gray-700'>
                Are you sure you want to remove {props.username} as an approved
                user?
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
                  buttonText='Remove'
                  buttonTextColor='text-white'
                  buttonColor='bg-blue-light'
                />
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </div>
    </Dialog>
  );
}
