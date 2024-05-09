import { Dialog, DialogHeader, DialogFooter } from '@material-tailwind/react';
import RoundedButton from '../../Components/RoundedButton';
import { IoMdClose } from 'react-icons/io';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { useMutation } from 'react-query';
import { postRequest } from '../../API/User';
import { useState } from 'react';

interface RuleFormProps {
  handleOpen: () => void;
  open: boolean;
  initialValues: {
    community_name: string;
    rule_title: string;
    applies_to: string;
    report_reason: string;
    full_description: string;
    rule_id: string;
  };
  isEdit?: boolean;
  fetchData: () => void;
}
interface valueDataType {
  community_name: string;
  rule_title: string;
  applies_to: string;
  report_reason: string;
  full_description: string;
  rule_id: string;
}
export default function AddRule(props: RuleFormProps): JSX.Element {
  const { community_name } = useParams();
  const [buttonSelect, setButtonSelect] = useState(0);

  const mutationAdd = useMutation(postRequest, {
    onSuccess: () => {
      console.log('added rule successfully');
    },
    // onError: () => {
    //   console.log('added rule failed');
    // },
  });

  const mutationDelete = useMutation(postRequest, {
    onSuccess: () => {
      console.log('added rule successfully');
    },
    // onError: () => {
    //   console.log('added rule failed');
    // },
  });

  const mutationEdit = useMutation(postRequest, {
    onSuccess: () => {
      console.log('added rule successfully');
    },
    // onError: () => {
    //   console.log('added rule failed');
    // },
  });

  const handleOnSubmit = (values: valueDataType) => {
    if (buttonSelect == 0) {
      mutationAdd.mutate(
        {
          endPoint: 'communities/add-rule',
          data: values,
        },
        {
          onSuccess: () => {
            console.log('rule added');

            props.fetchData();
          },
        }
      );
    } else if (buttonSelect == 1) {
      mutationDelete.mutate(
        {
          endPoint: 'communities/delete-rule',
          data: {
            community_name: values.community_name,
            rule_id: values.rule_id,
          },
        },
        {
          onSuccess: () => {
            props.fetchData();
          },
        }
      );
    } else if (buttonSelect == 2) {
      mutationEdit.mutate(
        {
          endPoint: 'communities/edit-rule',
          data: values,
        },
        {
          onSuccess: () => {
            props.fetchData();
          },
        }
      );
    }
  };

  return (
    <Dialog size='sm' open={props.open} handler={props.handleOpen}>
      <DialogHeader className='!block relative flex justify-between'>
        <div className='block relative border-b border-lines-color flex justify-between'>
          <h2 className='text-left'>Add rule</h2>
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
            rule_title: Yup.string().required('Rule is required'),
            applies_to: Yup.string().required('Applies to is required'),
            report_reason: Yup.string(),
            full_description: Yup.string().required('Description is required'),
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
              <div className='mb-4 container'>
                <label className='block text-gray-700'>Rule</label>
                <Field
                  type='text'
                  name='rule_title'
                  className='form-input mt-1 block w-full border p-2 rounded text-black'
                  placeholder='Rule displayed (e.g. "No photos")'
                />
                <div className='text-gray-400 text-xs mt-1'>
                  {formik.values.rule_title.length > 100
                    ? `0 Characters remaining`
                    : `${100 - formik.values.rule_title.length} Characters remaining`}
                </div>
                <ErrorMessage
                  name='rule_title'
                  component='div'
                  className='text-red-500 text-xs mt-1'
                />
              </div>

              <div className='mb-4 container'>
                <p className='text-gray-700'>Applies to</p>
                <RadioInput
                  name='applies_to'
                  valueName='posts_and_comments'
                  label='Posts & comments'
                />
                <RadioInput
                  name='applies_to'
                  valueName='posts_only'
                  label='Posts only'
                />
                <RadioInput
                  name='applies_to'
                  valueName='comments_only'
                  label='Comments only'
                />
                <ErrorMessage
                  name='applies_to'
                  component='div'
                  className='text-red-500 text-xs mt-1'
                />
              </div>

              <div className='mb-4 container'>
                <div className='block text-gray-700'>Report reason</div>
                <div className='text-gray-400 text-xs'>
                  Defaults to rule name if left blank
                </div>
                <Field
                  as='textarea'
                  name='report_reason'
                  className='form-input mt-1 block w-full border p-2 rounded text-black'
                  placeholder='Reason rule is broken (e.g. "This is a photo")'
                />
                <div className='text-gray-400 text-xs mt-1'>
                  {formik.values.report_reason.length > 100
                    ? `0 Characters remaining`
                    : `${100 - formik.values.report_reason.length} Characters remaining`}
                </div>

                <ErrorMessage
                  name='report_reason'
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
                  name='full_description'
                  className='form-input mt-1 block w-full border p-2 pb-10 rounded text-black'
                  placeholder='Enter the full description of the rule.'
                />
                <div className='text-gray-400 text-xs mt-1'>
                  {formik.values.full_description.length > 500
                    ? `0 Characters remaining`
                    : `${500 - formik.values.full_description.length} Characters remaining`}
                </div>
                <ErrorMessage
                  name='full_description'
                  component='div'
                  className='text-red-500 text-xs mt-1'
                />
              </div>
              <DialogFooter className='bg-gray-200 rounded space-x-2'>
                {props.isEdit ? (
                  <RoundedButton
                    type='submit'
                    buttonBorderColor='border-gray-200'
                    buttonText='Delete'
                    buttonTextColor='text-red-muted font-bold'
                    buttonColor='bg-gray-200 '
                    onClick={() => setButtonSelect(1)}
                  />
                ) : null}
                <div className='flex-grow'></div>
                <RoundedButton
                  type='button'
                  buttonBorderColor='border-blue-light'
                  buttonText='Cancel'
                  buttonTextColor='text-blue-light font-bold'
                  buttonColor='bg-gray-200 '
                  onClick={props.handleOpen}
                />
                {props.isEdit ? (
                  <RoundedButton
                    type='submit'
                    buttonBorderColor='border-white'
                    buttonText='Save'
                    buttonTextColor='text-white font-bold'
                    buttonColor='bg-blue-light '
                    onClick={() => setButtonSelect(2)}
                  />
                ) : (
                  <RoundedButton
                    type='submit'
                    buttonBorderColor='border-white'
                    buttonText='Add new rule'
                    buttonTextColor='text-white font-bold'
                    buttonColor='bg-blue-light'
                    onClick={() => setButtonSelect(0)}
                  />
                )}
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </div>
    </Dialog>
  );
}

const RadioInput = (props: {
  label?: string;
  valueName?: string;
  name: string;
}) => {
  const { label, valueName, name } = props;
  return (
    <div>
      <label className='inline-flex items-center text-gray-700'>
        <Field type='radio' name={name} value={valueName} />
        <span className='ml-2'>{label}</span>
      </label>
    </div>
  );
};
