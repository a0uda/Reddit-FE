import React, { ReactNode } from 'react';

import './Settings.css';
import { Link, useParams } from 'react-router-dom';
import Account from './Account';
import Notifications from './Notifications';
import SafetyPrivacy from './SafetyPrivacy';
import InputBox from './Containers/InputWButton';
import Profile from './Profile';
import Email from './Email';
import FeedSettings from './FeedSettings';
import ChatsandMessaging from './ChatsandMessaging';

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
    <div className='flex border-b-[1px] border-[#EDEFF1] flex-wrap'>
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
  console.log(page, 'hi');

  return (
    <div className='px-[16px] pb-[40px] mx-0 md:!mx-[3rem]'>
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
      <div className='max-w-[46rem]'>
        {page == 'account' ? (
          <Account />
        ) : page == 'profile' ? (
          <Profile />
        ) : page == 'email' ? (
          <Email />
        ) : page == 'notifications' ? (
          <Notifications />
        ) : page == 'privacy' ? (
          <SafetyPrivacy />
        ) : page == 'feed' ? (
          <FeedSettings />
        ) : (
          <ChatsandMessaging />
        )}
      </div>
    </div>
  );
};

export default UserSettings;
