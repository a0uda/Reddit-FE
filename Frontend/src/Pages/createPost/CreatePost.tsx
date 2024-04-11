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

type FormSchema =
  | 'createPost'
  | 'createPostImageAndVideo'
  | 'createPostLink'
  | 'createPostPoll';
interface Image {
  id: number;
  path: string;
  caption: string;
  link: string;
}

const NewPost: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [formType, setFormType] = useState<FormSchema>('createPost');
  const [HandleOpen, setHandleOpen] = useState(false);
  const [oc, setOC] = useState(false);
  const [NSFW, SetNSFW] = useState(false);
  const [Spoiler, setSpoiler] = useState(false);
  const [images, setImages] = useState<Image[]>([]);
  const [Imageindex, setImageIndex] = useState(0);
  const navigate = useNavigate();

  const [inputArr, setInputArr] = useState([
    {
      className:
        'mt-4 placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 !border !border-t-[rgb(176,190,197)]',
      type: 'text',
      placeholder: 'Title',
      id: 'title',
    },
  ]);
  const [validateSchema, setValidateSchema] = useState<any>(null);
  const [initialValues] = useState({
    title: '',
    description: '',
    community_id: '',
    community_name: '',
    link_url: '',
    images: [],
    oc_flag: false,
    spoiler_flag: false,
    nsfw_flag: false,
  });

  useEffect(() => {
    const schema = Validation(formType);
    setValidateSchema(schema);
    console.log(formType);
  }, [formType]);

  const handleDivClick = (index: number) => {
    console.log(index);
    setActiveIndex(index);
    if (index === 0) {
      setFormType('createPost');
      setInputArr(initialInputs);
    }
    if (index == 1) {
      setFormType('createPostImageAndVideo');
      setInputArr(initialInputs);
    }
    if (index == 2) {
      setFormType('createPostLink');
      const LinkInput = [
        {
          className:
            'placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 !border !border-t-[rgb(176,190,197)] mt-4',
          type: 'text',
          placeholder: 'URL',
          id: 'link_url',
        },
      ];

      setInputArr([...initialInputs, ...LinkInput]);
    }
    if (index == 3) {
      setFormType('createPostPoll');
      setInputArr(initialInputs);
    }
  };

  const initialInputs = [
    {
      className:
        'mt-4 placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 !border !border-t-[rgb(176,190,197)]',
      type: 'text',
      placeholder: 'Title',
      id: 'title',
    },
  ];

  const mutation = useMutation(postRequest, {
    onSuccess: () => {
      navigate('/');
    },
    onError: () => {},
  });

  const handleOnSubmit = (values: object) => {
    mutation.mutate({
      endPoint: 'submit',
      data: values,
    });
  };
  return (
    <Formik
      validationSchema={validateSchema}
      initialValues={{
        ...initialValues,
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        handleOnSubmit(values);
        setTimeout(() => {
          alert(JSON.stringify(values));
          setSubmitting(true);
          resetForm();
          setOC(false);
          setSpoiler(false);
          SetNSFW(false);
          setImages([]);
          setImageIndex(0);
        }, 400);
      }}
    >
      {(formik) => {
        return (
          <div className='mb-8 md:mb-12 lg:mb-16 ml-2 lg:ml-48 my-10 max-w-screen-xl'>
            <div className=''>
              <h1 className='text-2xl lg:text-xl xl:text-xl border-b-2  max-w-3xl mb-4 pb-4'>
                Create a post
              </h1>

              <SearchBar setFieldValue={formik.setFieldValue} />
            </div>
            <div className='editor w-full flex flex-col text-gray-800 border border-gray-300 p-2 shadow-lg max-w-3xl  '>
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
                    <div className='count ml-auto text-gray-400 text-xs font-semibold absolute right-3 top-3/4 -translate-y-1/2'>
                      {formik.values[inp.id as keyof typeof formik.values]
                        ?.length || 0}
                      /300
                    </div>
                  </div>
                ))}
              {formType == 'createPost' || formType == 'createPostPoll' ? (
                <div className='mt-4 mb-10'>
                  <MyEditor setFieldValue={formik.setFieldValue} />
                </div>
              ) : null}
              {formType == 'createPostImageAndVideo' ? (
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
              {formType == 'createPostPoll' ? (
                <div className='w-full border-bottom'>
                  <OptionsPoll setFieldValue={formik.setFieldValue} />
                </div>
              ) : null}
              <div className='space-x-2 mt-4'>
                <RoundedButton
                  buttonBorderColor='white'
                  id='oc_flag'
                  buttonText={
                    <>
                      {oc ? <IconCheck /> : <IconPlus />}
                      OC
                    </>
                  }
                  buttonTextColor={oc ? 'text-white' : 'text-gray-600'}
                  buttonColor={oc ? 'bg-orange' : 'bg-white'}
                  onClick={() => {
                    formik.setFieldValue('oc_flag', !formik.values.oc_flag);
                    setOC(!oc);
                  }}
                />

                <RoundedButton
                  buttonBorderColor='white'
                  id='spoiler_flag'
                  buttonText={
                    <>
                      {Spoiler ? <IconCheck /> : <IconPlus />}
                      Spoiler
                    </>
                  }
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
                  id='nsfw_flag'
                  buttonText={
                    <>
                      {NSFW ? <IconCheck /> : <IconPlus />}
                      NSFW
                    </>
                  }
                  buttonTextColor={NSFW ? 'text-white' : 'text-gray-600'}
                  buttonColor={NSFW ? 'bg-orange-red' : 'bg-white'}
                  onClick={() => {
                    formik.setFieldValue('nsfw_flag', !formik.values.nsfw_flag);
                    SetNSFW(!NSFW);
                  }}
                />
              </div>
              <div className='flex justify-end mt-10 border-t-2 py-4 space-x-2'>
                <RoundedButton
                  buttonBorderColor='red'
                  buttonText='Cancel'
                  buttonTextColor='text-blue-light'
                  buttonColor='bg-white'
                  onClick={() => {
                    setHandleOpen(true);
                  }}
                />
                <RoundedButton
                  buttonBorderColor='red'
                  buttonText='Post'
                  buttonTextColor='text-white'
                  buttonColor={
                    Object.keys(formik.errors).length > 0 ||
                    Object.values(formik.values).every((value) => value !== '')
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
              </div>

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
