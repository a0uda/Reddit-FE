import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';
import RoundedButton from '../../Components/RoundedButton';
import { IoMdClose } from 'react-icons/io';

import { Formik, Form, Field } from 'formik';

interface RuleFormProps {
  handleOpen: () => void;
  open: boolean;
}

export default function AddRule(props: RuleFormProps): JSX.Element {
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
      <DialogBody className='flex flex-col md:flex-row gap-2'>
        <Formik
          initialValues={{
            rule_title: '',
            applies_to: '',
            reportReason: '',
            description: '',
          }}
          onSubmit={(values) => {
            // Handle form submission here
            console.log(values);
          }}
        >
          {({ values }) => (
            <Form className='w-full'>
              <div className='mb-4'>
                <label className='block text-gray-700'>Rule</label>
                <Field
                  type='text'
                  name='rule_title'
                  className='form-input mt-1 block w-full border p-2 rounded'
                  placeholder='Reason rule is broken (e.g. "This is a photo")'
                />
                <div className='text-xs text-gray-400 mt-1'>
                  {values.rule_title.length > 100
                    ? `0 Characters remaining`
                    : `${100 - values.rule_title.length} Characters remaining`}
                </div>
              </div>

              <div className='mb-4'>
                <p className='text-gray-700'>Applies to</p>
                <RadioInput
                  name='appliesTo'
                  valueName='Posts & comments'
                  label='Posts & comments'
                />
                <RadioInput
                  name='appliesTo'
                  valueName='Posts only'
                  label='Posts only'
                />
                <RadioInput
                  name='appliesTo'
                  valueName='Comments only'
                  label='Comments only'
                />
              </div>
              <div className='mb-4'>
                <div className='block text-gray-700'>Report reason</div>
                <div className='text-gray-400 text-xs'>
                  Defaults to rule name if left blank
                </div>
                <Field
                  type='text'
                  name='reportReason'
                  className='form-input mt-1 block w-full border p-2 rounded'
                  placeholder='Rule displayed (e.g. "No photos")'
                />
                <div className='text-xs text-gray-400 mt-1'>
                  {values.reportReason.length > 100
                    ? `0 Characters remaining`
                    : `${100 - values.reportReason.length} Characters remaining`}
                </div>
              </div>
              <div className='mb-4'>
                <label htmlFor='description' className='block text-gray-700'>
                  Full description
                </label>
                <Field
                  as='textarea'
                  id='description'
                  name='description'
                  className='form-input mt-1 block w-full border p-2 pb-10 rounded'
                  placeholder='Enter the full description of the rule.'
                />
                <div className='text-xs text-gray-400 mt-1'>
                  {values.description.length > 500
                    ? `0 Characters remaining`
                    : `${500 - values.description.length} Characters remaining`}
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </DialogBody>
      <DialogFooter className='bg-gray-200 rounded space-x-2'>
        <RoundedButton
          buttonBorderColor='border-white'
          buttonText='cancel'
          buttonTextColor='text-blue-light'
          buttonColor='bg-gray-200 '
          onClick={props.handleOpen}
        />
        <RoundedButton
          buttonBorderColor='border-white'
          buttonText='Add new rule'
          buttonTextColor='text-blue-light'
          buttonColor='bg-gray-200 '
          //   onClick={handleSubmit}
        />
      </DialogFooter>
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
        <input type='radio' name={name} value={valueName} />
        <span className='ml-2'>{label}</span>
      </label>
    </div>
  );
};
