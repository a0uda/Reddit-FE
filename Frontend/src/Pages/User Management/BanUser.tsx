import { Dialog, DialogHeader, DialogFooter } from '@material-tailwind/react';
import RoundedButton from '../../Components/RoundedButton';
import { IoMdClose } from 'react-icons/io';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { useMutation } from 'react-query';
import { postRequest } from '../../API/User';
import { useState } from 'react';

interface BanUserFormProps {
  handleOpen: () => void;
  open: boolean;
  initialValues: {
    username: string;
    action: string;
    reason_for_ban: string;
    mod_note: string;
    community_name: string;
    permanent_flag: string;
    note_for_ban_message: string;
    banned_until: string;
  };
  isEdit?: boolean;
}
interface Datatype {
  username: string;
  action: string;
  reason_for_ban: string;
  mod_note: string;
  community_name: string;
  permanent_flag: string;
  note_for_ban_message: string;
  banned_until: string;
}
export default function BanUser(props: BanUserFormProps): JSX.Element {
  const [buttonSelect, setButtonSelect] = useState(0);
  const { community_name } = useParams();
  const mutation = useMutation(postRequest, {
    onSuccess: () => {
      console.log('User banned successfully');
    },
    onError: () => {
      console.log('Banning user failed');
    },
  });

  const handleOnSubmit = (values: Datatype) => {
    if (buttonSelect == 2) {
      mutation.mutate({
        endPoint: 'communities/edit-banned-user',
        data: {
          username: values.username,
          community_name: community_name,
          newDetails: {
            reason_for_ban: values.reason_for_ban,
            mod_note: values.mod_note,
            permanent_flag: values.permanent_flag,
            banned_until: values.banned_until,
            note_for_ban_message: values.note_for_ban_message,
          },
        },
      });
    } else if (buttonSelect == 1) {
      mutation.mutate({
        endPoint: 'communities/ban-user',
        data: {
          community_name: community_name,
          username: values.username,
          action: 'unban',
        },
      });
    } else if (buttonSelect == 0) {
      mutation.mutate({
        endPoint: 'communities/ban-user',
        data: values,
      });
    }
  };

  const [isPermanent, setIsPermanent] = useState(
    props.initialValues.permanent_flag == 'true' ? true : false
  );
  const [days, setDays] = useState<string>(
    props.initialValues.permanent_flag == 'true'
      ? ''
      : props.initialValues.banned_until
  );

  const handlePermanentChange = (event: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    setIsPermanent(event.target.checked);
    setDays('');
  };

  return (
    <Dialog size='sm' open={props.open}>
      <DialogHeader className='!block relative flex justify-between'>
        <div className='block relative border-b border-lines-color flex justify-between'>
          <h2 className='text-left'>Ban a user</h2>
          <div className='cursor-pointer' onClick={props.handleOpen}>
            <IoMdClose />
          </div>
        </div>
      </DialogHeader>
      <div className='flex flex-col md:flex-row gap-2'>
        <Formik
          initialValues={props.initialValues}
          validationSchema={Yup.object({
            username: Yup.string().required('Username is required'),
            reason_for_ban: Yup.string(),
            mod_note: Yup.string(),
            note_for_ban_message: Yup.string(),
            banned_until: Yup.string(),
            permanent_flag: Yup.string(),
            community_name: Yup.string(),
            action: Yup.string(),
          })}
          onSubmit={(values) => {
            if (isPermanent) {
              values.permanent_flag = 'true';
            } else {
              values.permanent_flag = 'false';
            }
            if (community_name) {
              values.community_name = community_name;
            }
            if (!props.isEdit) {
              values.action = 'ban';
            }

            handleOnSubmit(values);
            props.handleOpen();
          }}
        >
          {(formik) => (
            <Form className='w-full' onSubmit={formik.handleSubmit}>
              <div className='mb-4 container'>
                <div className='block text-gray-700  text-xs'>
                  ENTER USERNAME
                </div>
                <Field
                  type='input'
                  name='username'
                  placeholder='u/username'
                  className='form-input mt-1 block w-full border p-2 rounded text-gray-800'
                />
              </div>

              <div className='mb-4 container'>
                <div className=' text-gray-700 text-xs'>REASON FOR BAN</div>
                <Field
                  as='select'
                  name='reason_for_ban'
                  className='form-select mt-1 block w-full border p-2 rounded  text-gray-800'
                >
                  <option value=''>Select reason for ban</option>
                  <option value='Spam'>Spam</option>
                  <option value='Personal And Confidential Information'>
                    Personal And Confidential Information
                  </option>
                  <option value='Threatening, Harassing, Or Inciting Violence'>
                    Threatening, Harassing, Or Inciting Violence
                  </option>
                  <option value='Others'>Others</option>
                </Field>
              </div>

              <div className='mb-4 container'>
                <div className='block text-gray-700  text-xs'>MOD NOTE</div>
                <Field
                  as='input'
                  name='mod_note'
                  className=' mt-1 block w-full border p-2 pb-10 rounded  text-gray-800'
                  placeholder='Mod Note'
                />
                <div className='text-gray-400 text-xs mt-1'>
                  {formik.values.mod_note.length > 300
                    ? `0 Characters remaining`
                    : `${300 - formik.values.mod_note.length} Characters remaining`}
                </div>
                <ErrorMessage
                  name='mod_note'
                  component='div'
                  className='text-red-500 text-xs mt-1'
                />
              </div>

              <div className='mb-4 container'>
                <label
                  htmlFor='banDuration'
                  className='block text-gray-700 text-xs'
                >
                  HOW LONG?
                </label>

                <div className='flex items-center mt-2 space-x-2'>
                  <div className='flex items-center mt-2'>
                    <input
                      type='number'
                      id='banned_until'
                      name='banned_until'
                      value={days}
                      onChange={(e) => {
                        setDays(e.target.value);
                        formik.setFieldValue('banned_until', e.target.value);
                      }}
                      className='form-input border p-2 rounded text-black w-20'
                      min='0'
                      disabled={isPermanent}
                    />
                    <label htmlFor='days' className='text-gray-700 mr-2 ms-2'>
                      Days
                    </label>
                  </div>
                  <div className='flex items-center mt-2 text-blue-light'>
                    <input
                      type='checkbox'
                      id='permanent_flag'
                      name='permanent_flag'
                      checked={isPermanent}
                      onChange={handlePermanentChange}
                      className='mr-2 text-blue-light bg-blue-light'
                    />
                    <label htmlFor='permanent' className='text-gray-700'>
                      Permanent
                    </label>
                  </div>
                </div>
              </div>

              <DialogFooter className='bg-gray-200 rounded space-x-2'>
                <div className='mb-4 container'>
                  <label
                    htmlFor='description'
                    className='block text-gray-700 text-sm'
                  >
                    Note to include in ban message
                  </label>
                  <Field
                    as='textarea'
                    name='note_for_ban_message'
                    className='form-input mt-1 block w-full border p-2 pb-10 rounded text-black'
                    placeholder='Reason they were banned'
                  />
                  <div className='text-gray-400 text-xs mt-1'>
                    {formik.values.note_for_ban_message.length > 5000
                      ? `0 Characters remaining`
                      : `${5000 - formik.values.note_for_ban_message.length} Characters remaining`}
                  </div>
                  <ErrorMessage
                    name='removal_reason'
                    component='div'
                    className='text-red-500 text-xs mt-1'
                  />
                </div>
                {props.isEdit ? (
                  <RoundedButton
                    type='submit'
                    buttonBorderColor='border-gray-200'
                    buttonText='Unban'
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
                    buttonText='Edit ban'
                    buttonTextColor='text-white font-bold'
                    buttonColor='bg-blue-light '
                    onClick={() => setButtonSelect(2)}
                  />
                ) : (
                  <RoundedButton
                    type='submit'
                    buttonBorderColor='border-white'
                    buttonText='Ban user'
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
