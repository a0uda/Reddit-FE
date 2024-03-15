import React from 'react';
import Card from './Containers/Card';
import RoundedButton from '../../Components/RoundedButton';
import DropDownButton from './Containers/DropDownButton';
import Section from './Containers/Section';

function ChatsandMessaging() {
  return (
    <div>
      <h2 className='text-xl my-8 font-semibold'>Chat & Messaging</h2>
      <Section sectionTitle=''>
        <Card title='Who can send you chat requests' description=''>
          <DropDownButton />
        </Card>
        <Card
          title='Who can send you private messages'
          description='Heads up—Reddit admins and moderators of communities you’ve joined can message you even if they’re not approved.'
        >
          <DropDownButton />
        </Card>
        <Card
          title='Mark all as read'
          description='Mark all conversations and invites as read.'
        >
          <RoundedButton
            buttonBorderColor='blue-600'
            buttonColor='white'
            buttonText='Mark as read'
            buttonTextColor='blue'
          />
        </Card>
      </Section>
    </div>
  );
}

export default ChatsandMessaging;
