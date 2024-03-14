import React, { ReactNode } from 'react';
import Card from './Containers/Card';
import './Settings.css';
import { Link, useParams } from 'react-router-dom';
import RoundedButton from '../../Components/RoundedButton';
import Section from './Containers/Section';
import DropDownButton from './Containers/DropDownButton';
import SwitchButton from './Containers/SwitchButton';

const NavButton = (props: {
  active?: boolean | undefined;
  buttonName: string;
  buttonLink: string;
}) => {
  return (
    <Link
      to={`/settings/${props.buttonLink}`}
      className={`userSettingsNavbarLink${props.active ? 'Active' : ''} userSettingsNavbarLink`}
    >
      <div className='userSettingsNavbarLinkText'>{props.buttonName}</div>
    </Link>
  );
};

const SubNavBar = (props: {
  buttonArray: string[];
  active: string | undefined;
}) => {
  const pagesArray = [
    'account',
    'profile',
    'privacy',
    'feed',
    'notifications',
    'email',
    'messaging',
  ];
  return (
    <div className='flex border-b-[1px] flex-wrap'>
      {props.buttonArray.map((butt, i) => (
        <NavButton
          key={`${i}${butt}`}
          active={props.active == pagesArray[i]}
          buttonName={butt}
          buttonLink={pagesArray[i]}
        />
      ))}
    </div>
  );
};

const UserSettings = () => {
  const { page } = useParams();

  return (
    <div className='userSettingsBody'>
      <h3 className='userSettingsHeader'>User settings</h3>
      <SubNavBar
        buttonArray={[
          'Account',
          'Profile',
          'Safety & Privacy',
          'Feed Settings',
          'Notifications',
          'Email',
          'Chat & Messaging',
        ]}
        active={page}
      />
      <div className='userSettingsContent'>
        <h2 className='text-base my-5'>Account Settings</h2>
        <Section sectionTitle='Account preferences'>
          <Card title='Email' description='reem.khatab02@rng-st.cu.edu.eg'>
            <RoundedButton
              buttonBorderColor='blue'
              buttonColor='white'
              buttonText='change'
              buttonTextColor='blue'
            />
          </Card>
          <Card title='Email' description='Ahmed.khatab02@rng-st.cu.edu.eg'>
            <RoundedButton
              buttonBorderColor='blue'
              buttonColor='white'
              buttonText='change'
              buttonTextColor='blue'
            />
          </Card>
        </Section>
        <Section sectionTitle='Account preferences'>
          <Card title='Email' description='reem.khatab02@rng-st.cu.edu.eg'>
            <RoundedButton
              buttonBorderColor='blue'
              buttonColor='white'
              buttonText='change'
              buttonTextColor='blue'
            />
          </Card>
          <Card title='Email' description='Ahmed.khatab02@rng-st.cu.edu.eg'>
            <RoundedButton
              buttonBorderColor='blue'
              buttonColor='white'
              buttonText='change'
              buttonTextColor='blue'
            />
          </Card>
        </Section>
        <DropDownButton />
        <SwitchButton />
      </div>
    </div>
  );
};

export default UserSettings;
