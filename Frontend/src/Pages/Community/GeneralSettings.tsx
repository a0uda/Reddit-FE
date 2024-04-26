import { useQuery } from 'react-query';
import { fetchRequest } from '../../API/User';
import RoundedButton from '../../Components/RoundedButton';
import SwitchButton from '../../Components/SwitchButton';
import Card from '../UserSettings/Containers/Card';
import Section from '../UserSettings/Containers/Section';

function GeneralSettings() {
  const { data, error, isLoading, refetch } = useQuery('profile data', () =>
    fetchRequest('communities/get-general-settings')
  );
  return (
    <>
      <div className='flex justify-end my-4'>
        <RoundedButton
          buttonText='Save changes'
          buttonBorderColor=''
          buttonColor='bg-[#0079D3]'
          buttonTextColor='white'
        ></RoundedButton>
      </div>
      <h2 className='text-xl my-4 font-semibold'>Community settings</h2>
      <Section sectionTitle='Community Profile'>
        <Card title='Community name' description=''></Card>
        <Card title='' description=''>
          <input
            // onBlur={() => {
            //   patchReq.mutate({
            //     endPoint: 'users/change-profile-settings',
            //     newSettings: {
            //       profile_settings: { display_name: displayName },
            //     },
            //   });
            // }}
            // onChange={(e) => {
            //   setDisplayName(e.target.value);
            // }}
            value='reem'
            placeholder='Display Name (Optional)'
            className='!border border-[#EDEFF1] rounded bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 w-full p-2 pt-3'
          />
        </Card>
        <Card
          title='Community description'
          description='This is how new members come to understand your community.'
        ></Card>
        <Card title='' description=''>
          <input
            // onBlur={() => {
            //   patchReq.mutate({
            //     endPoint: 'users/change-profile-settings',
            //     newSettings: {
            //       profile_settings: { display_name: displayName },
            //     },
            //   });
            // }}
            // onChange={(e) => {
            //   setDisplayName(e.target.value);
            // }}
            value='reem'
            placeholder='Display Name (Optional)'
            className='!border border-[#EDEFF1] rounded bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 w-full p-2 pt-3'
          />
        </Card>
        <Card
          title='Send welcome message to new members'
          description='Create a custom welcome message to greet people the instant they join your community. New community members will see this in a direct message 1 hour after joining.'
        >
          <SwitchButton
            checked={true}
            onChange={(value) => {
              value = false;
            }}
          />
        </Card>
        <Card title='' description=''>
          <input
            // onBlur={() => {
            //   patchReq.mutate({
            //     endPoint: 'users/change-profile-settings',
            //     newSettings: {
            //       profile_settings: { display_name: displayName },
            //     },
            //   });
            // }}
            // onChange={(e) => {
            //   setDisplayName(e.target.value);
            // }}
            placeholder="Welcome to our community! We're here to discuss our passion for all things
             related to grated cheese. Heads up-we're a text-only community, so sorry no image posts. 
             get started by introducing yourself in our post fro newbies, then check out our rules 
             to learn more and dive in"
            className='!border border-[#EDEFF1] rounded bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 w-full p-2 pt-3'
          />
        </Card>
      </Section>
    </>
  );
}

export default GeneralSettings;
