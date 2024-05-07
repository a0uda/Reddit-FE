import React from 'react';
import { Link } from 'react-router-dom';
import Section from './Containers/Section';
import Card from './Containers/Card';
import RoundedButton from '../../Components/RoundedButton';
import SwitchButton from '../../Components/SwitchButton';
import { PlusIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { useMutation, useQuery } from 'react-query';
import { fetchRequest, patchRequest, postRequest } from '../../API/User';
import facebookIcon from '../../assets/facebookIcon.svg';
import instagramIcon from '../../assets/instagramIcon.svg';
import SocialLinksModal, {
  EnterLinkDetails,
} from './Containers/SocialLinksModal';
import LoadingProvider from '../../Components/LoadingProvider';
import { useAlert } from '../../Providers/AlertProvider';
import { uploadImageFirebase } from '../../utils/helper_functions';
import { SocialLink } from '../../types/types';

function ImageInput(props: {
  id: string;
  children: React.ReactNode;
  width: string;
  image?: string;
  type: 'banner' | 'profile';
}) {
  const [selectedImage, setSelectedImage] = React.useState(props.image);
  const postReq = useMutation(postRequest);
  const handleImageChange = async (event, type: 'profile' | 'banner') => {
    const file = event.target.files[0]; // Get the selected file

    if (file) {
      try {
        const imageBlob = file; // This is already the Blob, which you can upload

        // Upload the image and get the download URL
        const imageUrl = await uploadImageFirebase(imageBlob);
        if (type == 'profile') {
          postReq.mutate(
            {
              endPoint: 'users/add-profile-picture',
              data: { profile_picture: imageUrl },
            },
            {
              onSuccess: () => {
                setSelectedImage(imageUrl);
              },
            }
          );
        } else {
          postReq.mutate(
            {
              endPoint: 'users/add-banner-picture',
              data: { banner_picture: imageUrl },
            },
            {
              onSuccess: () => {
                setSelectedImage(imageUrl);
              },
            }
          );
        }
        console.log('Image URL:', imageUrl); // Optional: log the image URL
        // You can use this URL to set the image preview or other logic
      } catch (error) {
        console.error('Error uploading image:', error); // Handle error
      }
    }
  };

  return (
    <>
      <div className={props.width}>
        {/* {selectedImage ? (
          <img src={selectedImage} />
        ) : (
          <> */}
        <label
          style={{
            backgroundImage: `url(${selectedImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
          htmlFor={props.id}
          className={`border  border-[#d7d7d7] border-dashed rounded-lg bg-[#F6F7F8] p-[2rem] flex items-center justify-center flex-col text-blue-light cursor-pointer`}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-10 h-10'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
            />
          </svg>
          <span className='text-xs'>{props.children}</span>
        </label>

        <input
          id={props.id}
          type='file'
          accept='image/jpeg, image/png'
          className='hidden'
          onChange={(e) => {
            handleImageChange(e, props.type);
          }}
        />
        {/* </> */}
      </div>
    </>
  );
}

function Profile() {
  const { data, error, isLoading, refetch } = useQuery('profile data', () =>
    fetchRequest('users/profile-settings')
  );
  const { trigger, setTrigger, setAlertMessage, setIsError } = useAlert();

  const postReq = useMutation(postRequest, {
    onSuccess: () => {
      refetch();
      setTrigger(!trigger);
      setIsError(false);
      setAlertMessage('User Settings Updated Successfully');
    },
    onError: (error) => {
      const errorObj = JSON.parse(error.message);

      setTrigger(!trigger);
      setIsError(true);
      setAlertMessage(errorObj.data);
    },
  });
  const patchReq = useMutation(patchRequest, {
    onSuccess: () => {
      refetch();
      setTrigger(!trigger);
      setIsError(false);
      setAlertMessage('User Settings Updated Successfully');
    },
    onError: (error) => {
      const errorObj = JSON.parse(error.message);

      setTrigger(!trigger);
      setIsError(true);
      setAlertMessage(errorObj.data);
    },
  });
  // console.log(data);

  const {
    display_name,
    about,
    social_links,
    profile_picture,
    banner_picture,
    nsfw_flag,
    allow_followers,
    content_visibility,
    active_communities_visibility,
  } = data?.data || {};

  console.log('mylinks', social_links);
  const [openSLModal, setOpenSLModal] = React.useState(false);
  const [enterLinkDetails, setEnterLinkDetails] = React.useState(false);
  const [socialLinkType, setSocialLinkType] = React.useState('');
  const [nameInput, setNameInput] = React.useState('');
  const [usernameInput, setUsernameInput] = React.useState('');

  const handleEnterLinkDetails = () => setEnterLinkDetails(!enterLinkDetails);
  const handleOpenSLModal = () => setOpenSLModal(!openSLModal);

  const [displayName, setDisplayName] = React.useState('');
  const [aboutVal, setAbout] = React.useState('');

  React.useEffect(() => {
    setDisplayName(display_name);
    setAbout(about);
  }, [display_name, about]);

  React.useEffect(() => {
    setNameInput('');
    setUsernameInput('');
  }, [enterLinkDetails]);

  return (
    <LoadingProvider error={error} isLoading={isLoading}>
      <h2 className='text-xl my-8 font-semibold'>Customize profile</h2>
      <Section sectionTitle='PROFILE INFORMATION'>
        <Card
          title='Display name (optional)'
          description='Set a display name. This does not change your username.'
        ></Card>
        <Card title='' description=''>
          {/* <InputBox placeHolder='Display name (optional)' /> */}
          <input
            onBlur={() => {
              console.log(display_name, displayName);

              if (display_name == displayName) {
                return;
              }
              patchReq.mutate({
                endPoint: 'users/change-profile-settings',
                newSettings: {
                  profile_settings: { display_name: displayName },
                },
              });
            }}
            onChange={(e) => {
              setDisplayName(e.target.value);
            }}
            value={displayName}
            placeholder='Display Name (Optional)'
            className='!border border-[#EDEFF1] rounded bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 w-full p-2 pt-3'
          />
        </Card>
        <Card
          title='About (Optional)'
          description='A brief description of yourself shown on your profile.'
        ></Card>
        <Card title='' description=''>
          <textarea
            onBlur={() => {
              // console.log(display_name, displayName);

              if (about == aboutVal) {
                return;
              }
              patchReq.mutate({
                endPoint: 'users/change-profile-settings',
                newSettings: { profile_settings: { about: aboutVal } },
              });
            }}
            onChange={(e) => {
              setAbout(e.target.value);
            }}
            value={aboutVal}
            placeholder='About (optional)'
            className='!resize !border rounded border-[#EDEFF1] bg-white text-gray-900  shadow-none ring-4 ring-transparent placeholder:text-gray-500 w-full p-2 pt-3 h-28'
          />
        </Card>
        <Card
          title='Social links (5 max)'
          description='People who visit your profile will see your social links.'
        />
        {/* <Card> */}
        <div className='flex flex-start gap-2 flex-wrap'>
          {social_links &&
            social_links.map((link: SocialLink, i: number) => {
              return (
                <Link
                  key={link + i}
                  to={
                    link.custom_url.includes('www')
                      ? link.custom_url
                      : 'https://www.' +
                        link.type.toLowerCase() +
                        '.com/' +
                        link.custom_url +
                        '/'
                  }
                  target='_blank'
                >
                  <RoundedButton
                    buttonBorderColor='none'
                    buttonColor='bg-[#EDEFF1]'
                    buttonText={link.display_text || link.custom_url}
                    buttonTextColor='text-black'
                    imgRight={
                      <XCircleIcon
                        strokeWidth={2.5}
                        className='h-3.5 w-3.5'
                        onClick={() => {
                          console.log(link);
                          postReq.mutate({
                            endPoint: 'users/delete-social-link',
                            data: { id: link._id },
                          });
                        }}
                      />
                    }
                  >
                    <img
                      src={
                        link.type == 'facebook' ? facebookIcon : instagramIcon
                      }
                      className='h-3.5 w-3.5'
                    />
                  </RoundedButton>
                </Link>
              );
            })}
          <SocialLinksModal
            handleOpen={handleOpenSLModal}
            open={openSLModal}
            setSocialLinkType={setSocialLinkType}
            handleOpenNextModal={handleEnterLinkDetails}
          />
          <EnterLinkDetails
            handleOpen={handleEnterLinkDetails}
            open={enterLinkDetails}
            openBackModal={() => {
              handleOpenSLModal();
              handleEnterLinkDetails();
            }}
            saveDisabled={
              (!usernameInput && socialLinkType != 'facebook') ||
              ((!usernameInput || !nameInput) && socialLinkType == 'facebook')
            }
            handleSaveButton={() => {
              console.log(nameInput, usernameInput, 'hi ree');
              postReq.mutate({
                endPoint: 'users/add-social-link',
                data: {
                  type: socialLinkType.toLowerCase(),
                  username: usernameInput,
                  display_text: nameInput,
                  custom_url: usernameInput,
                },
              });
              handleEnterLinkDetails();
            }}
          >
            <RoundedButton
              buttonBorderColor='none'
              buttonColor='bg-[#EDEFF1]'
              buttonText={socialLinkType}
              buttonTextColor='text-black'
            >
              <img
                src={
                  socialLinkType == 'facebook' ? facebookIcon : instagramIcon
                }
                className='h-3.5 w-3.5'
              />
            </RoundedButton>
            {socialLinkType != 'facebook' ? (
              <input
                value={usernameInput}
                onChange={(e) => {
                  setUsernameInput(e.target.value);
                  console.log(usernameInput);
                }}
                type='text'
                placeholder='@username'
                className='w-full border border-lines-color outline-0 focus-visible:border-blue-light rounded px-2 py-1'
              />
            ) : (
              <>
                <input
                  value={nameInput}
                  onChange={(e) => {
                    setNameInput(e.target.value);
                  }}
                  type='text'
                  placeholder='Display Text'
                  className='w-full border border-lines-color outline-0 focus-visible:border-blue-light rounded px-2 py-1'
                />
                <input
                  value={usernameInput}
                  onChange={(e) => {
                    setUsernameInput(e.target.value);
                  }}
                  type='text'
                  placeholder='https://facebook.com'
                  className='w-full border border-lines-color outline-0 focus-visible:border-blue-light rounded px-2 py-1'
                />{' '}
              </>
            )}
          </EnterLinkDetails>
          <RoundedButton
            buttonBorderColor='none'
            buttonColor='bg-[#EDEFF1]'
            buttonText='Add social link'
            buttonTextColor='text-black'
            onClick={handleOpenSLModal}
            disabled={social_links?.length == 5}
          >
            <PlusIcon strokeWidth={2.5} className='h-3.5 w-3.5' />
          </RoundedButton>
        </div>
        {/* </Card> */}
      </Section>
      <Section sectionTitle='IMAGES'>
        <Card
          title='Banner Image'
          description='Images must be .png or .jpg format'
        />
        <Card>
          <div className='flex flex-start w-full gap-2'>
            <ImageInput
              id='avatar'
              width='w-[30%]'
              image={profile_picture}
              type='profile'
            >
              Upload Image
            </ImageInput>
            <ImageInput
              id='banner'
              width='w-[50%]'
              image={banner_picture}
              type='banner'
            >
              Upload <strong>Banner</strong> Image
            </ImageInput>
          </div>
        </Card>
      </Section>
      <Section sectionTitle='PROFILE CATEGORY'>
        <Card
          title='NSFW'
          description='This content is NSFW (may contain nudity, pornography, profanity or inappropriate content for those under 18)'
        >
          <SwitchButton
            checked={nsfw_flag}
            onChange={(value) => {
              patchReq.mutate({
                endPoint: 'users/change-profile-settings',
                newSettings: { profile_settings: { nsfw_flag: value } },
              });
            }}
          />
        </Card>
      </Section>
      <Section sectionTitle='ADVANCED'>
        {/* comment: title is clicked as switched button */}
        <Card
          title='Allow people to follow you'
          description='Followers will be notified about posts you make to your profile and see them in their home feed.'
        >
          <SwitchButton
            checked={allow_followers}
            onChange={(value) => {
              patchReq.mutate({
                endPoint: 'users/change-profile-settings',
                newSettings: { profile_settings: { allow_followers: value } },
              });
            }}
          />
        </Card>
        <Card
          title='Content visibility '
          //comment: r/all and /user are hyperlinks
          description='Posts to this profile can appear in r/all and your profile can be discovered in /users'
        >
          <SwitchButton
            checked={content_visibility}
            onChange={(value) => {
              patchReq.mutate({
                endPoint: 'users/change-profile-settings',
                newSettings: {
                  profile_settings: { content_visibility: value },
                },
              });
            }}
          />
        </Card>
        <Card
          title='Active in communities visibility'
          description='Show which communities I am active in on my profile.'
        >
          <SwitchButton
            checked={active_communities_visibility}
            onChange={(value) => {
              patchReq.mutate({
                endPoint: 'users/change-profile-settings',
                newSettings: {
                  profile_settings: { active_communities_visibility: value },
                },
              });
            }}
          />
        </Card>
        <Card
          title='Clear history'
          description='Delete your post views history.'
        >
          <RoundedButton
            buttonBorderColor='border-blue-light'
            buttonColor='bg-white'
            buttonText='Clear history'
            buttonTextColor='text-blue-light'
            onClick={() => {
              postReq.mutate({ endPoint: 'users/clear-history', data: {} });
            }}
          />
        </Card>
      </Section>
    </LoadingProvider>
  );
}

export default Profile;
