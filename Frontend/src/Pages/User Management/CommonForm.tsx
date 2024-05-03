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
interface ApproveFormProps {
  handleOpen: () => void;
  open: boolean;
  username: string;
  title?: string;
  content?: string;
  initialValues: object;
  HandleOnSubmitFunction: (values: object) => void;
  buttonText: string;
}

export default function GeneralForm(props: ApproveFormProps): JSX.Element {
  return (
    <Dialog size='sm' open={props.open} handler={props.handleOpen}>
      <DialogHeader className='!block relative flex justify-between'>
        <div className='block relative border-b border-lines-color flex justify-between'>
          <h2 className='text-left'>{props.title}</h2>
          <div className='cursor-pointer' onClick={props.handleOpen}>
            <IoMdClose />
          </div>
        </div>
      </DialogHeader>
      <div className='flex flex-col md:flex-row gap-2'>
        <Formik
          initialValues={props.initialValues}
          validationSchema={Yup.object({
            community_name: Yup.string(),
            username: Yup.string().required('username is required'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            props.HandleOnSubmitFunction(values);
            setSubmitting(false);
            props.handleOpen();
          }}
        >
          {(formik) => (
            <Form className='w-full' onSubmit={formik.handleSubmit}>
              <DialogBody className='text-gray-700'>{props.content}</DialogBody>
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
                  buttonText={props.buttonText}
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
