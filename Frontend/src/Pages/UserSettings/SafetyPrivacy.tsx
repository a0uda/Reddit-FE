import React from 'react';
import Section from './Containers/Section';
import Card from './Containers/Card';

import InputWButton from './Containers/InputWButton';

export default function SafetyPrivacy() {
  return (
    <>
      <h2 className='text-xl my-8 font-semibold'>Safety & Privacy</h2>
      <Section sectionTitle='SAFETY'>
        <Card
          title='People You’ve Blocked'
          description='Blocked people can’t send you chat requests or private messages.'
        ></Card>

        <Card>
          <InputWButton label='BLOCK NEW USER' buttonText='ADD' />
        </Card>
        <Card
          title="Communities You've Muted"
          description="Posts from muted communities won't show up in your feeds or recommendations."
        ></Card>
        <Card>
          <InputWButton label='MUTE NEW COMMUNITY' buttonText='ADD' />
        </Card>
      </Section>
    </>
  );
}
