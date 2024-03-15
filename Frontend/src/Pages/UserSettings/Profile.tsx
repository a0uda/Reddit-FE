import React from 'react';
import Section from './Containers/Section';
import Card from './Containers/Card';
import RoundedButton from '../../Components/RoundedButton';
import InputBox from './Containers/InputBox';
import SwitchButton from './Containers/SwitchButton';
import { Textarea } from '@material-tailwind/react';
import { PlusIcon } from '@heroicons/react/24/outline';

function Profile() {
  return (
    <div>
      <h2 className='text-base my-8'>Customize profile</h2>
      <Section sectionTitle='PROFILE INFORMATION'>
        <Card
          title='Display name (optional)'
          description='Set a display name. This does not change your username.'
        ></Card>
        <Card title='' description=''>
          <InputBox placeHolder='Display name (optional)' />
        </Card>
        <Card
          title='About (optional)'
          description='A brief description of yourself shown on your profile.'
        ></Card>
        <Card title='' description=''>
          <Textarea
            labelProps={{
              className: 'hidden',
            }}
            placeholder='About (optional)'
            className=' !resize !border !border-gray-300 bg-white text-gray-900  shadow-none ring-4 ring-transparent placeholder:text-gray-500   '
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
        {/* comment : missing */}
        <Card
          title='Banner Image'
          description='Images must be .png or .jpg format'
        ></Card>
      </Section>
      <Section sectionTitle='PROFILE CATEGORY'>
        <Card
          title='NSFW'
          description='This content is NSFW (may contain nudity, pornography, profanity or inappropriate content for those under 18)'
        >
          <SwitchButton />
        </Card>
      </Section>
      <Section sectionTitle='ADVANCED'>
        {/* comment: title is clicked as switched button */}
        <Card
          title='Allow people to follow you'
          description='Followers will be notified about posts you make to your profile and see them in their home feed.'
        >
          <SwitchButton />
        </Card>
        <Card
          title='Content visibility '
          //comment: r/all and /user are hyperlinks
          description='Posts to this profile can appear in r/all and your profile can be discovered in /users'
        >
          <SwitchButton />
        </Card>
        <Card
          title='Active in communities visibility'
          description='Show which communities I am active in on my profile.'
        >
          <SwitchButton />
        </Card>
        <Card
          title='Clear history'
          description='Delete your post views history.'
        >
          <RoundedButton
            buttonBorderColor='blue-600'
            buttonColor='white'
            buttonText='Clear history'
            buttonTextColor='blue'
          />
        </Card>
      </Section>
    </div>
  );
}

export default Profile;
