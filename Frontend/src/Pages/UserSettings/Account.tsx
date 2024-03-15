import React from 'react';
import RoundedButton from '../../Components/RoundedButton';
import Section from './Containers/Section';
import Card from './Containers/Card';
import DropDownButton from './Containers/DropDownButton';
import SwitchButton from './Containers/SwitchButton';
import { TrashIcon } from '@heroicons/react/24/outline';

function Account() {
  return (
    <div>
      <h2 className='text-base my-8'>Account Settings</h2>
      <Section sectionTitle='ACCOUNT PREFERENCES'>
        <Card title='Email' description='reem.khatab02@rng-st.cu.edu.eg'>
          <RoundedButton
            buttonBorderColor='blue-600'
            buttonColor='white'
            buttonText='Change'
            buttonTextColor='blue'
          />
        </Card>
        <Card
          title='Gender'
          description='This information may be used to improve your recommendations and ads.'
        >
          <RoundedButton
            buttonBorderColor='blue-600'
            buttonColor='white'
            buttonText='Change'
            buttonTextColor='blue'
          />
        </Card>
        <Card title='Location' description=''>
          <DropDownButton />
        </Card>
      </Section>
      <Section sectionTitle='CONNECTED ACCOUNTS'>
        <Card
          title='Connect to Twitter'
          description='Connect a Twitter account to enable the choice to tweet your new posts and display a link on your profile. We will never post to Twitter without your permission.'
        >
          <RoundedButton
            buttonBorderColor='none'
            buttonColor='light-blue'
            buttonText='Connect to Twitter'
            buttonTextColor='white'
          >
            <img
              src='https://docs.material-tailwind.com/icons/twitter.svg'
              alt='metamask'
              className='h-4 w-4 mx-2'
            />
          </RoundedButton>
        </Card>
        <Card
          title='Connect to Apple'
          description='Connect account to log in to Reddit with Apple'
        >
          <RoundedButton
            buttonBorderColor='none'
            buttonColor='black'
            buttonText='Connect to Apple'
            buttonTextColor='white'
          />
        </Card>
        <Card
          title='Connect to Google'
          description='Connect account to log in to Reddit with Google'
        >
          <RoundedButton
            buttonBorderColor='gray'
            buttonColor='white'
            buttonText='Connect to Google'
            buttonTextColor='black'
          >
            <img
              src='https://docs.material-tailwind.com/icons/google.svg'
              alt='metamask'
              className='h-4 w-4 mx-2'
            />
          </RoundedButton>
        </Card>
      </Section>
      <Section sectionTitle='DELETE ACCOUNT'>
        <Card title='' description=''>
          <RoundedButton
            buttonBorderColor='none'
            buttonColor='white'
            buttonText='DELETE ACCOUNT'
            buttonTextColor='red'
          >
            <TrashIcon strokeWidth={1.5} className='h-4 w-4 mx-2' />
          </RoundedButton>
        </Card>
      </Section>
    </div>
  );
}

export default Account;
