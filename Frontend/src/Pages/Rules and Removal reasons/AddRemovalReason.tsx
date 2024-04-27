import { Dialog, DialogHeader, DialogFooter } from '@material-tailwind/react';
import RoundedButton from '../../Components/RoundedButton';
import { IoMdClose } from 'react-icons/io';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface RuleFormProps {
  handleOpen: () => void;
  open: boolean;
  initialValues: {
    community_name: string;
    removal_reason_title: string;
    removal_reason: string;
  };
}

export default function AddRemovalReason(props: RuleFormProps): JSX.Element {
  const [formInitialValues, setFormInitialValues] = useState(
    props.initialValues
  );
  const { community_name } = useParams();

  useEffect(() => {
    setFormInitialValues((prevInitialValues) => ({
      ...prevInitialValues,
      community_name: community_name ? community_name.toString() : '',
    }));
  }, [community_name]);

  const handleSubmit = (values: unknown) => {
    alert('Form submitted successfully!');
    console.log('Submitted values:', values);
    props.handleOpen();
  };

  return (
    <Dialog size='sm' open={props.open}>
      <DialogHeader className='!block relative flex justify-between'>
        <div className='block relative border-b border-lines-color flex justify-between'>
          <h2 className='text-left'>Add new reason</h2>
          <div className='cursor-pointer' onClick={props.handleOpen}>
            <IoMdClose />
          </div>
        </div>
      </DialogHeader>
      <div className='flex flex-col md:flex-row gap-2'>
        <Formik
          initialValues={formInitialValues}
          validationSchema={Yup.object({
            community_name: Yup.string().required('Community is required'),
            removal_reason_title: Yup.string().required(
              'Reason title is required'
            ),
            removal_reason: Yup.string().required('Reason is required'),
          })}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form className='w-full' onSubmit={formik.handleSubmit}>
              <div className='mb-4 container'>
                <Field
                  type='text'
                  name='removal_reason_title'
                  className='form-input mt-1 block w-full border p-2 rounded text-black'
                  placeholder='Removal reason title'
                />
                <div className='text-gray-400 text-xs mt-1'>
                  {formik.values.removal_reason_title.length > 50
                    ? `0 Characters remaining`
                    : `${50 - formik.values.removal_reason_title.length} Characters remaining`}
                </div>
                <ErrorMessage
                  name='removal_reason_title'
                  component='div'
                  className='text-red-500 text-xs mt-1'
                />
              </div>

              <div className='mb-4 container'>
                <label htmlFor='description' className='block text-gray-700'>
                  Full description
                </label>
                <Field
                  as='textarea'
                  name='removal_reason'
                  className='form-input mt-1 block w-full border p-2 pb-10 rounded text-black'
                  placeholder='Write a message that will communicate to the user why their post was removed.'
                />
                <div className='text-gray-400 text-xs mt-1'>
                  {formik.values.removal_reason.length > 1000
                    ? `0 Characters remaining`
                    : `${1000 - formik.values.removal_reason.length} Characters remaining`}
                </div>
                <ErrorMessage
                  name='removal_reason'
                  component='div'
                  className='text-red-500 text-xs mt-1'
                />
              </div>
              <DialogFooter className='bg-gray-200 rounded space-x-2'>
                <RoundedButton
                  type='button'
                  buttonBorderColor='border-white'
                  buttonText='cancel'
                  buttonTextColor='text-blue-light'
                  buttonColor='bg-gray-200 '
                  onClick={props.handleOpen}
                />
                <RoundedButton
                  type='submit'
                  buttonBorderColor='border-white'
                  buttonText='Add new reason'
                  buttonTextColor='text-blue-light'
                  buttonColor='bg-gray-200 '
                />
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </div>
    </Dialog>
  );
}
