import React from 'react';
import Section from './Containers/Section';
import RoundedButton from '../../Components/RoundedButton';
import Card from './Containers/Card';
import SwitchButton from './Containers/SwitchButton';
import DropDownButton from './Containers/DropDownButton';

function FeedSettings() {
  return (
    <div>
      <h2 className='text-xl my-8 font-semibold'>Feed Settings</h2>
      <Section sectionTitle='CONTENT PREFERENCES'>
        <Card
          title='Show mature (18+) content'
          description='See NSFW (Not Safe for Work) mature and adult images, videos, written content, and other media in your Reddit feeds and search results.'
        >
          <SwitchButton />
        </Card>
        <Card
          title='Autoplay media'
          description='Play videos and gifs automatically when in the viewport.'
        >
          <SwitchButton />
        </Card>
        <Card
          title='Community themes'
          description='Use custom themes for all communities. You can also turn this off on a per community basis.'
        >
          <SwitchButton />
        </Card>
        <Card
          title='Community content sort'
          description='Choose how you would like content organized in communities you visit. This will not affect global feeds such as Home, or Popular.'
        >
          <DropDownButton
            buttonText='HOT'
            buttonList={['HOT', 'NEW', 'TOP', 'RISING']}
          />
          <Card
            title='Remember per community'
            description='Enable if you would like each community to remember and use the last content sort you selected for that community.'
          >
            <SwitchButton />
          </Card>
        </Card>
        <Card
          title='Global content view'
          description='Choose how you would like content displayed in feeds. This control is also found above your feed.'
        >
          <DropDownButton
            buttonText='Card'
            //comment : missing icons
            buttonList={['CARD', 'CLASSIC', 'COMPACT']}
          />
          {/* comment:check again */}
          <Card
            title='Remember per community'
            description='Enable if you would like each community to remember and use the last content sort you selected for that community.'
          >
            <SwitchButton />
          </Card>
        </Card>
        <Card
          title='Open posts in new tab'
          description='Enable to always open posts in a new tab.'
        >
          <SwitchButton />
        </Card>
      </Section>
    </div>
  );
}

export default FeedSettings;
