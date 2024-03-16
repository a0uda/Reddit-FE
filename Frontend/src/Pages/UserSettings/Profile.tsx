import React from 'react';
import Section from './Containers/Section';
import Card from './Containers/Card';
import RoundedButton from '../../Components/RoundedButton';
import SwitchButton from './Containers/SwitchButton';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useQuery } from 'react-query';
import { fetchUser } from '../../API/User';

function ImageInput(props: {
  id: string;
  children: React.ReactNode;
  width: string;
  image?: string;
}) {
  const [selectedImage, setSelectedImage] = React.useState(props.image);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
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
          onChange={handleImageChange}
        />
        {/* </> */}
      </div>
    </>
  );
}

function Profile() {
  const { data, error, isLoading } = useQuery('profile data', () =>
    fetchUser('users/profile-settings')
  );
  const {
    display_name,
    about,
    social_links,
    country,
    gender,
    profile_picture,
    banner_picture,
    nsfw_flag,
    allow_followers,
    content_visibility,
    active_communities_visibility,
  } = data?.data.profile_settings;
  const [displayName, setDisplayName] = React.useState(display_name);
  const [aboutVal, setAbout] = React.useState(about);
  console.log(data);
  return (
    <div>
      <h2 className='text-xl my-8 font-semibold'>Customize profile</h2>
      <Section sectionTitle='PROFILE INFORMATION'>
        <Card
          title='Display name (optional)'
          description='Set a display name. This does not change your username.'
        ></Card>
        <Card title='' description=''>
          {/* <InputBox placeHolder='Display name (optional)' /> */}
          <input
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
          {/* <Textarea
            labelProps={{
              className: 'hidden',
            }}
            placeholder='About (optional)'
            className=' !resize !border !border-gray-300 bg-white text-gray-900  shadow-none ring-4 ring-transparent placeholder:text-gray-500   '
          /> */}
          <textarea
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
        >
          <RoundedButton
            buttonBorderColor='none'
            buttonColor='silver'
            buttonText='Add social link'
            buttonTextColor='black'
          >
            <PlusIcon strokeWidth={2.5} className='h-3.5 w-3.5' />
          </RoundedButton>
        </Card>
      </Section>
      <Section sectionTitle='IMAGES'>
        <Card
          title='Banner Image'
          description='Images must be .png or .jpg format'
        />
        <Card>
          <div className='flex flex-start w-full gap-2'>
            <ImageInput id='avatar' width='w-[30%]' image={profile_picture}>
              Upload Image
            </ImageInput>
            <ImageInput id='banner' width='w-[50%]' image={banner_picture}>
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
          <SwitchButton checked={nsfw_flag} />
        </Card>
      </Section>
      <Section sectionTitle='ADVANCED'>
        {/* comment: title is clicked as switched button */}
        <Card
          title='Allow people to follow you'
          description='Followers will be notified about posts you make to your profile and see them in their home feed.'
        >
          <SwitchButton checked={allow_followers} />
        </Card>
        <Card
          title='Content visibility '
          //comment: r/all and /user are hyperlinks
          description='Posts to this profile can appear in r/all and your profile can be discovered in /users'
        >
          <SwitchButton checked={content_visibility} />
        </Card>
        <Card
          title='Active in communities visibility'
          description='Show which communities I am active in on my profile.'
        >
          <SwitchButton checked={active_communities_visibility} />
        </Card>
        <Card
          title='Clear history'
          description='Delete your post views history.'
        >
          <RoundedButton
            buttonBorderColor='border-blue-light'
            buttonColor='white'
            buttonText='Clear history'
            buttonTextColor='text-blue-light'
          />
        </Card>
      </Section>
    </div>
  );
}

export default Profile;
