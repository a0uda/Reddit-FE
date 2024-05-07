import React, { useEffect, useState } from 'react';
import Validation from '../../validate/validate';
import { Formik } from 'formik';
import Input from '../../Components/Input';
import RoundedButton from '../../Components/RoundedButton';
import NavBarCreatePost from './NavBarCreatePost';
import ImageUpload from './ImageUpload';
import MyEditor from './Editor';
import DiscardPost from './DiscardPost';
import { IconPlus, IconCheck } from '../../Components/RightSideBar/Icons';
import SearchBar from './SearchCommunity';
import OptionsPoll from './OptionsPoll';
import { useMutation } from 'react-query';
import { postRequest } from '../../API/User';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import OvalButton from './OvalButton';
import SchedulePostComponent from './schedulePost';
import * as yup from 'yup';
import { uploadImageFirebase } from '../../utils/helper_functions';
import { useAlert } from '../../Providers/AlertProvider';

type FormSchema = 'image_and_videos' | 'polls' | 'url' | 'text';

interface Image {
  id: number;
  path: string;
  caption: string;
  link: string;
}

const NewPost: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [formType, setFormType] = useState<FormSchema>('text');
  const [HandleOpen, setHandleOpen] = useState(false);
  const [HandleOpenSchedule, setHandleOpenSchedule] = useState(false);
  const [oc, setOC] = useState(false);
  const [NSFW, SetNSFW] = useState(false);
  const [Spoiler, setSpoiler] = useState(false);
  const [images, setImages] = useState<Image[]>([]);
  const [Imageindex, setImageIndex] = useState(0);
  const navigate = useNavigate();
  const { community_name } = useParams();
  const [ScheduledDay, setScheduledDay] = useState<string>('');
  const [ScheduledHour, setScheduledHour] = useState<string>('');
  const [ScheduledMinutes, setScheduledMinutes] = useState<string>('');
  const { trigger, setTrigger, setAlertMessage, setIsError } = useAlert();

  const [inputArr, setInputArr] = useState([
    {
      className:
        'mt-4 placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 !border !border-t-[rgb(176,190,197)]',
      type: 'text',
      placeholder: 'Title',
      id: 'title',
      size: true,
    },
  ]);
  const [validateSchema, setValidateSchema] = useState<unknown>(null);
  const [initialValues] = useState({
    title: '',
    description: '',
    community_name: '',
    link_url: '',
    oc_flag: false,
    spoiler_flag: false,
    nsfw_flag: false,
    post_in_community_flag: true,
    images: [],
  });

  useEffect(() => {
    const baseSchema = Validation(formType);
    const schemaWithCommunityName = baseSchema.shape({
      community_name: yup
        .string()
        .when('post_in_community_flag', (postInCommunityFlag, schema) => {
          return postInCommunityFlag[0]
            ? schema.required('Community name is required')
            : schema.notRequired();
        }),
    });

    setValidateSchema(schemaWithCommunityName);
    console.log(formType);
  }, [formType, initialValues.post_in_community_flag]);

  const handleDivClick = (index: number) => {
    console.log(index);
    setActiveIndex(index);
    if (index === 0) {
      setFormType('text');
      setInputArr(initialInputs);
    }
    if (index == 1) {
      setFormType('image_and_videos');
      setInputArr(initialInputs);
    }
    if (index == 2) {
      setFormType('url');
      const LinkInput = [
        {
          className:
            'placeholder:text-gray-500 pb-4 pt-10 placeholder:opacity-100 focus:!border-gray-900 !border !border-t-[rgb(176,190,197)] mt-4',
          type: 'text',
          placeholder: 'URL',
          id: 'link_url',
          size: false,
        },
      ];

      setInputArr([...initialInputs, ...LinkInput]);
    }
    if (index == 3) {
      setFormType('polls');
      setInputArr(initialInputs);
    }
  };
  const heightClass = activeIndex == 2 ? 'h-screen' : 'h-auto';

  const initialInputs = [
    {
      className:
        'mt-4 placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 !border !border-t-[rgb(176,190,197)]',
      type: 'text',
      placeholder: 'Title',
      id: 'title',
      size: true,
    },
  ];

  const mutation = useMutation(postRequest, {
    onSuccess: () => {
      navigate('/');
    },
    onError: () => {
      navigate('/submit');
    },
  });

  const mutateSchedulePost = useMutation(postRequest, {
    onSuccess: () => {
      navigate(`/r/${community_name}/about/scheduledposts`);
    },
    onError: (error) => {
      setTrigger(!trigger);
      setIsError(true);
      setAlertMessage(error);
      navigate(`/r/${community_name}/submit`);
    },
  });

  const handleOnSubmit = (values: object) => {
    if (community_name != '') {
      mutateSchedulePost.mutate({
        endPoint: `communities/schedule-post/${community_name}`,
        data: values,
      });
    } else {
      mutation.mutate({
        endPoint: 'posts/new-post',
        data: values,
      });
    }
  };

  const handleImages = async (values: object) => {
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      try {
        const response = await fetch(image.path);
        const imgBlob = await response.blob();
        const imageUrl = await uploadImageFirebase(imgBlob);
        image.path = imageUrl;
        values.images[i].path = imageUrl;
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  return (
    <Formik
      validationSchema={validateSchema}
      initialValues={{
        ...initialValues,
      }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          if (values.type == 'image_and_videos') {
            await handleImages(values);
          }
          if (
            community_name &&
            ScheduledDay &&
            ScheduledHour &&
            ScheduledMinutes
          ) {
            values = {
              repetition_option: 'none',
              submit_time: {
                date: ScheduledDay,
                hours: ScheduledHour,
                minutes: ScheduledMinutes,
              },
              postInput: {
                ...values,
              },
            };
          }
          handleOnSubmit(values);
          setTimeout(() => {
            console.log(JSON.stringify(values));
            // alert(JSON.stringify(values));
            setSubmitting(true);
            resetForm();
            setOC(false);
            setSpoiler(false);
            SetNSFW(false);
            setImages([]);
            setImageIndex(0);
          }, 400);
        } catch (error) {
          console.error('Error handling images:', error);
        }
      }}
    >
      {(formik) => {
        console.log(formik.errors);
        return (
          <div
            className={`pb-8 md:pb-12 lg:pb-16 pl-2 lg:pl-48 py-10 ${heightClass} h-full bg-grayLight w-full`}
          >
            <h1 className='text-2xl lg:text-xl xl:text-xl border-b-2 border-white max-w-3xl mb-4 pb-4'>
              Create a post
            </h1>
            <SearchBar setFieldValue={formik.setFieldValue} />

            <div className='bg-white editor w-full flex flex-col text-gray-800 border border-gray-300 p-2 shadow-lg max-w-3xl '>
              <NavBarCreatePost
                activeIndex={activeIndex}
                handleDivClick={handleDivClick}
                setFieldValue={formik.setFieldValue}
              />
              {inputArr &&
                inputArr.map((inp, i) => (
                  <div className='relative rounded-lg' key={i}>
                    <Input
                      className={inp.className}
                      placeholder={inp.placeholder}
                      type={inp.id}
                      NoCheck={true}
                      key={i + inp.id}
                      {...formik.getFieldProps(inp.id)}
                      onChange={(e) => {
                        formik.setFieldValue(inp.id, e.target.value);
                      }}
                    />
                    {inp.size ? (
                      <div className='count ml-auto text-gray-400 text-xs font-semibold absolute right-3 top-3/4 -translate-y-1/2'>
                        {formik.values[inp.id as keyof typeof formik.values]
                          ?.length || 0}
                        /300
                      </div>
                    ) : (
                      <div className='mb-10'></div>
                    )}
                  </div>
                ))}
              {formType == 'text' || formType == 'polls' ? (
                <div className='mt-4 mb-10'>
                  <MyEditor setFieldValue={formik.setFieldValue} />
                </div>
              ) : null}
              {formType == 'image_and_videos' ? (
                <>
                  <ImageUpload
                    setFieldValue={formik.setFieldValue}
                    images={images}
                    setImages={setImages}
                    index={Imageindex}
                    setIndex={setImageIndex}
                  />
                </>
              ) : null}
              {formType == 'polls' ? (
                <div className='w-full border-bottom'>
                  <OptionsPoll setFieldValue={formik.setFieldValue} />
                </div>
              ) : null}
              <div className='space-x-2 mt-4'>
                <RoundedButton
                  buttonBorderColor='white'
                  buttonIcon={<>{oc ? <IconCheck /> : <IconPlus />}</>}
                  buttonText='OC'
                  buttonTextColor={oc ? 'text-white' : 'text-gray-600'}
                  buttonColor={oc ? 'bg-orange' : 'bg-white'}
                  onClick={() => {
                    formik.setFieldValue('oc_flag', !formik.values.oc_flag);
                    setOC(!oc);
                  }}
                />

                <RoundedButton
                  buttonBorderColor='white'
                  buttonIcon={<>{Spoiler ? <IconCheck /> : <IconPlus />}</>}
                  buttonText='Spoiler'
                  buttonTextColor={Spoiler ? 'text-white' : 'text-gray-600'}
                  buttonColor={Spoiler ? 'bg-black' : 'bg-white'}
                  onClick={() => {
                    formik.setFieldValue(
                      'spoiler_flag',
                      !formik.values.spoiler_flag
                    );
                    setSpoiler(!Spoiler);
                  }}
                />
                <RoundedButton
                  buttonBorderColor='red'
                  buttonIcon={<>{NSFW ? <IconCheck /> : <IconPlus />}</>}
                  buttonText='NSFW'
                  buttonTextColor={NSFW ? 'text-white' : 'text-gray-600'}
                  buttonColor={NSFW ? 'bg-orange-red' : 'bg-white'}
                  onClick={() => {
                    formik.setFieldValue('nsfw_flag', !formik.values.nsfw_flag);
                    SetNSFW(!NSFW);
                  }}
                />
              </div>
              <div className='flex justify-end mt-4 pe-4 border-t-2 py-4 space-x-1'>
                <RoundedButton
                  buttonBorderColor='red'
                  buttonText='Cancel'
                  buttonTextColor='text-blue-light'
                  buttonColor='bg-white'
                  onClick={() => {
                    setHandleOpen(true);
                  }}
                />

                {community_name ? (
                  <>
                    <OvalButton
                      buttonBorderColor='red'
                      buttonText='Post'
                      buttonTextColor='text-white'
                      className='rounded-none rounded-l-full !normal-case  hover:opacity-50 active:brightness-150  hover:shadow-none focus:shadow-none shadow-none '
                      buttonColor={
                        Object.keys(formik.errors).length > 0 ||
                        Object.values(formik.values).every(
                          (value) => value !== ''
                        )
                          ? 'bg-gray-500'
                          : 'bg-blue'
                      }
                      onClick={() => {
                        formik.setValues({
                          ...formik.values,
                        });
                        formik.submitForm();
                      }}
                    />
                    <OvalButton
                      buttonBorderColor='red'
                      buttonText={
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='w-6 h-6'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z'
                          />
                        </svg>
                      }
                      buttonTextColor='text-white'
                      className='rounded-none rounded-r-full !normal-case hover:opacity-50 active:brightness-150  hover:shadow-none focus:shadow-none shadow-none '
                      buttonColor={
                        Object.keys(formik.errors).length > 0 ||
                        Object.values(formik.values).every(
                          (value) => value !== ''
                        )
                          ? 'bg-gray-500'
                          : 'bg-blue-light'
                      }
                      onClick={() => {
                        setHandleOpenSchedule(true);
                      }}
                    />
                  </>
                ) : (
                  <RoundedButton
                    buttonBorderColor='red'
                    buttonText='Post'
                    buttonTextColor='text-white'
                    buttonColor={
                      Object.keys(formik.errors).length > 0 ||
                      Object.values(formik.values).every(
                        (value) => value !== ''
                      )
                        ? 'bg-gray-500'
                        : 'bg-blue'
                    }
                    onClick={() => {
                      formik.setValues({
                        ...formik.values,
                      });
                      formik.submitForm();
                    }}
                  />
                )}
              </div>
              <SchedulePostComponent
                handleOpen={() => setHandleOpenSchedule(!HandleOpenSchedule)}
                open={HandleOpenSchedule}
                setScheduledDate={setScheduledDay}
                setScheduledHour={setScheduledHour}
                setScheduledMinutes={setScheduledMinutes}
              />

              <DiscardPost
                handleOpen={() => setHandleOpen(!HandleOpen)}
                open={HandleOpen}
              />
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default NewPost;
