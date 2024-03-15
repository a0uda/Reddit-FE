import React from 'react';
import SwitchButton from './Containers/SwitchButton';
import Card from './Containers/Card';
import Section from './Containers/Section';

function Email() {
  return (
    <div>
      <h2 className='text-base my-8'>Manage Emails</h2>
      <Section sectionTitle='MESSAGES'>
        <Card title='Chat requests' description=''>
          <SwitchButton />
        </Card>
      </Section>
      <Section sectionTitle='ACTIVITY'>
        <Card title='New followers' description=''>
          <SwitchButton />
        </Card>
      </Section>
      <Section sectionTitle=''>
        <Card title='Unsubscribe from all emails' description=''>
          <SwitchButton />
        </Card>
      </Section>
    </div>
  );
}

export default Email;
