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
      <h2 className='text-xl my-8 font-semibold'>Account Settings</h2>
      <Section sectionTitle='ACCOUNT PREFERENCES'>
        <Card title='Email' description='reem.khatab02@rng-st.cu.edu.eg'>
          <RoundedButton
            buttonBorderColor='border-blue-light'
            buttonColor='bg-white'
            buttonText='Change'
            buttonTextColor='text-blue-light'
          />
        </Card>
        <Card
          title='Gender'
          description='This information may be used to improve your recommendations and ads.'
        >
          <DropDownButton
            // buttonText='MAN'
            buttonList={['man', 'woman']}
            selected='man'
          />
        </Card>
        <Card title='Location' description=''>
          <DropDownButton buttonText='MAN' />
        </Card>
      </Section>
      <Section sectionTitle='CONNECTED ACCOUNTS'>
        <Card
          title='Connect to Google'
          description='Connect account to log in to Reddit with Google'
        >
          <RoundedButton
            buttonBorderColor='border-gray'
            buttonColor='bg-white'
            buttonText='Connect to Google'
            buttonTextColor='text-black'
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
        <Card title=' '>
          <RoundedButton
            buttonBorderColor='border-none'
            buttonColor='bg-white'
            buttonText='DELETE ACCOUNT'
            buttonTextColor='text-danger-red'
          >
            <TrashIcon strokeWidth={1.5} className='h-4 w-4 mx-2' />
          </RoundedButton>
        </Card>
      </Section>
    </div>
  );
}

export default Account;
