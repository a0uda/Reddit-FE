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
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from 'react-query';
import { postRequest } from '../../API/User';

interface LeaveFormProps {
  handleOpen: () => void;
  open: boolean;
  username: string;
}
interface valueDataType {
  community_name: string;
}
export default function LeaveMod(props: LeaveFormProps): JSX.Element {
  const { community_name } = useParams();
  const navigate = useNavigate();
  const initialValues: valueDataType = {
    community_name: '',
  };

  const mutation = useMutation(postRequest, {
    onSuccess: () => {
      navigate('/best');
      console.log('successfully');
    },
    // onError: () => {
    //   console.log('Failed');
    // },
  });

  const handleOnSubmit = (values: valueDataType) => {
    mutation.mutate({
      endPoint: `communities/moderator-leave/`,
      data: values,
    });
  };

  return (
    <Dialog size='sm' open={props.open} handler={props.handleOpen}>
      <DialogHeader className='!block relative flex justify-between'>
        <div className='block relative border-b border-lines-color flex justify-between'>
          <h2 className='text-left'>Leave as mod</h2>
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
              <DialogBody className='text-gray-700'>
                Once you leave as a mod, you will lose mod permissions and will
                be unable to access any mod tools for this community. Are you
                sure you wish to leave as a mod of this community?
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
                  buttonText='Leave'
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
