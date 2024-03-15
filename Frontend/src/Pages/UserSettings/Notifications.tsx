import React from 'react';
import Section from './Containers/Section';
import Card from './Containers/Card';
import SwitchButton from './Containers/SwitchButton';

export default function Notifications() {
  return (
    <div>
      <h2 className='text-base my-8'>Notification settings</h2>
      <Section sectionTitle='MESSAGES'>
        <Card title='Private Messages' description=''>
          <SwitchButton />
        </Card>
        <Card title='Chat messages' description=''>
          <SwitchButton />
        </Card>
        <Card title='Chat requests' description=''>
          <SwitchButton />
        </Card>
      </Section>
      <Section sectionTitle='ACTIVITY'>
        <Card title='Mentions of u/username' description=''>
          <SwitchButton />
        </Card>
        <Card title='Comments on your posts' description=''>
          <SwitchButton />
        </Card>
        <Card title='Upvotes on your posts' description=''>
          <SwitchButton />
        </Card>
        <Card title='Upvotes on your comments' description=''>
          <SwitchButton />
        </Card>
        <Card title='Replies to your comments' description=''>
          <SwitchButton />
        </Card>
        <Card title='New followers' description=''>
          <SwitchButton />
        </Card>
        <Card title='Invtations' description=''>
          <SwitchButton />
        </Card>
        <Card title='Posts you follow' description=''>
          <SwitchButton />
        </Card>
      </Section>
    </div>
  );
}
