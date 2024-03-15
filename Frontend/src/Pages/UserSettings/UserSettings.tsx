import React, { ReactNode } from 'react';

import './Settings.css';
import { Link, useParams } from 'react-router-dom';
import Account from './Account';
import Notifications from './Notifications';
import SafetyPrivacy from './SafetyPrivacy';
import InputBox from './Containers/InputWButton';
import Profile from './Profile';
import Email from './Email';

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
        <Account />
      </div>
    </div>
  );
};

export default UserSettings;
