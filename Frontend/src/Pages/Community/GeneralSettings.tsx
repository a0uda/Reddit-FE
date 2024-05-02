import { useMutation, useQuery } from 'react-query';
import { fetchRequest, patchRequest } from '../../API/User';
import RoundedButton from '../../Components/RoundedButton';
import SwitchButton from '../../Components/SwitchButton';
import Card from '../UserSettings/Containers/Card';
import Section from '../UserSettings/Containers/Section';
import { useEffect, useState } from 'react';
import { useAlert } from '../../Providers/AlertProvider';
import { Radio, Typography } from '@material-tailwind/react';
import { UserIcon, EyeIcon, LockClosedIcon } from '@heroicons/react/24/solid';
import DropDownButton from '../UserSettings/Containers/DropDownButton';
import LoadingProvider from '../../Components/LoadingProvider';
import { useParams } from 'react-router-dom';

function GeneralSettings() {
  const { community_name } = useParams();
  const [communityTitle, setCommunityTitle] = useState('');
  const [communityDescription, setCommunityDescription] = useState('');
  const [sendWelcomeMessage, setSendWelcomeMessage] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [nsfw, setNsfw] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [joinRequest, setJoinRequest] = useState(false);
  const [postRequest, setPostRequest] = useState(false);
  const [approvedAbility, setApprovedAbility] = useState('');
  const [restrictedd, setRestricted] = useState(false);
  const [privatee, setPrivate] = useState(false);
  const handleOptionChange = (option) => {
    setSelectedOption(option);
    if (option == 'Restricted') {
      setRestricted(true);
      setPrivate(false);
    }
    if (option == 'Private') {
      setRestricted(false);
      setPrivate(true);
    }
    if (option == 'Public') {
      setRestricted(false);
      setPrivate(false);
    }
  };

  const { data, isError, isLoading, refetch } = useQuery(
    'general settings',
    () => fetchRequest(`communities/get-general-settings/${community_name}`)
  );
  useEffect(() => {
    if (data?.data) {
      setCommunityDescription(data.data.description);
      setSendWelcomeMessage(
        data.data.welcome_message.send_welcome_message_flag
      );
      setWelcomeMessage(data.data.welcome_message.message);
      setNsfw(data.data.nsfw_flag);

      if (data.data.type == 'Public') {
        setSelectedOption('Public');
      } else if (data.data.type == 'Restricted') {
        setSelectedOption('Restricted');
      } else {
        setSelectedOption('Private');
      }
      setApprovedAbility(data.data.approved_users_have_the_ability_to);
      setCommunityTitle(data.data.title);
    }
  }, [data]);

  const { trigger, setTrigger, setAlertMessage, setIsError } = useAlert();
  const patchReq = useMutation(patchRequest, {
    onSuccess: () => {
      refetch();
      setTrigger(!trigger);
      setIsError(false);
      setAlertMessage('General Settings Updated Successfully');
    },
    onError: (error) => {
      setTrigger(!trigger);
      setIsError(true);
      setAlertMessage(error.message);
    },
  });
  const handleSaveChanges = () => {
    patchReq.mutate({
      endPoint: `communities/change-general-settings/${community_name}`,
      newSettings: {
        title: communityTitle,
        welcome_message: {
          send_welcome_message_flag: sendWelcomeMessage,
          message: welcomeMessage,
        },
        description: communityDescription,
        type: selectedOption,
        nsfw_flag: nsfw,
        approved_users_have_the_ability_to: approvedAbility,
        accepting_new_requests_to_post: postRequest,
        accepting_requests_to_join: joinRequest,
      },
    });
  };

  ///character length validation
  const maxCommunityNameLength = 100;
  const remainingCommunityNameCharacters =
    maxCommunityNameLength - communityTitle.length;

  const maxCommunityDescriptionLength = 500;
  const remainingCommunityDescriptionCharacters =
    maxCommunityDescriptionLength - communityDescription.length;

  const maxWelcomeMessageLength = 5000;
  const remainingWelcomeMessageCharacters =
    maxWelcomeMessageLength - welcomeMessage.length;

  return (
    <LoadingProvider error={isError} isLoading={isLoading}>
      <div className='flex justify-end my-4'>
        <RoundedButton
          buttonText='Save changes'
          buttonBorderColor=''
          buttonColor='bg-[#0079D3]'
          buttonTextColor='white'
          onClick={handleSaveChanges}
        ></RoundedButton>
      </div>
      <h2 className='text-xl my-4 font-semibold'>Community settings</h2>
      <Section sectionTitle='Community Profile'>
        <Card title='Community name' description=''></Card>
        <Card title='' description=''>
          <input
            value={communityTitle}
            placeholder='Display Name (Optional)'
            className='!border border-[#EDEFF1] rounded bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 w-full p-2 pt-3'
            onChange={(e) => setCommunityTitle(e.target.value)}
          />
        </Card>
        <div className='text-sm text-gray-500'>
          {remainingCommunityNameCharacters} characters remaining
        </div>
        <Card
          title='Community description'
          description='This is how new members come to understand your community.'
        ></Card>
        <Card title='' description=''>
          <input
            value={communityDescription}
            placeholder='Display Name (Optional)'
            className='!border border-[#EDEFF1] rounded bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 w-full p-2 pt-3'
            onChange={(e) => setCommunityDescription(e.target.value)}
          />
        </Card>
        <div className='text-sm text-gray-500'>
          {remainingCommunityDescriptionCharacters} characters remaining
        </div>
        <Card
          title='Send welcome message to new members'
          description='Create a custom welcome message to greet people the instant they join your community. New community members will see this in a direct message 1 hour after joining.'
        >
          <SwitchButton
            checked={sendWelcomeMessage}
            onChange={(value) => setSendWelcomeMessage(value)}
          />
        </Card>
        {sendWelcomeMessage && (
          <>
            <Card title='' description=''>
              <input
                value={welcomeMessage}
                placeholder="Welcome to our community! We're here to discuss our passion for all things
             related to grated cheese. Heads up-we're a text-only community, so sorry no image posts. 
             get started by introducing yourself in our post fro newbies, then check out our rules 
             to learn more and dive in"
                className='!border border-[#EDEFF1] rounded bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 w-full p-2 pt-3'
                onChange={(e) => setWelcomeMessage(e.target.value)}
              />
            </Card>
            <div className='text-sm text-gray-500'>
              {remainingWelcomeMessageCharacters} characters remaining
            </div>
          </>
        )}
      </Section>
      <Section sectionTitle='Community Type'>
        <Card title='Type of community' description=''></Card>
        <Card title='' description=''>
          <div className='flex flex-col gap-4'>
            <div className='flex items-center'>
              <input
                type='radio'
                id='Public'
                name='Public'
                value='Public'
                checked={selectedOption === 'Public'}
                onChange={() => handleOptionChange('Public')}
                className='mr-2'
              />
              <Typography
                color='black'
                className='font-normal flex text-base gap-2 items-center'
              >
                <UserIcon
                  strokeWidth={2.5}
                  className='h-3.5 w-3.5 mr-2'
                  color='gray'
                />
                Public
                <Typography color='gray' className='font-normal text-xs'>
                  Anyone can view, post, and comment to this community
                </Typography>
              </Typography>
            </div>
            <div className='flex items-center'>
              <input
                type='radio'
                id='Restricted'
                name='Restricted'
                value='Restricted'
                checked={selectedOption === 'Restricted'}
                onChange={() => handleOptionChange('Restricted')}
                className='mr-2'
              />
              <Typography
                color='black'
                className='font-normal flex text-base gap-2 items-center'
              >
                <EyeIcon
                  strokeWidth={2.5}
                  className='h-3.5 w-3.5 mr-2'
                  color='gray'
                />
                Restricted
                <Typography color='gray' className='font-normal text-xs'>
                  Anyone can view this community, but only approved users can
                  post
                </Typography>
              </Typography>
            </div>
            <div className='flex items-center'>
              <input
                type='radio'
                id='Private'
                name='Private'
                value='Private'
                checked={selectedOption === 'Private'}
                onChange={() => handleOptionChange('Private')}
                className='mr-2'
              />
              <Typography
                color='black'
                className='font-normal flex text-base gap-2 items-center'
              >
                <LockClosedIcon
                  strokeWidth={2.5}
                  className='h-3.5 w-3.5 mr-2'
                  color='gray'
                />
                Private
                <Typography color='gray' className='font-normal text-xs'>
                  Only approved users can view and submit to this community
                </Typography>
              </Typography>
            </div>
          </div>
        </Card>
        <Card
          title='18+ year old community'
          description='When your community is marked as an 18+ community, users must be flagged as 18+ in their user settings'
        >
          <SwitchButton checked={nsfw} onChange={(value) => setNsfw(value)} />
        </Card>
      </Section>
      {privatee && (
        <Section sectionTitle='PRIVATE COMMUNITY SETTINGS'>
          <Card
            title='Accepting requests to join'
            description='Display a button on your private subreddit that allows users to request to join. Users may still send your subreddit modmail whether this is on or off.'
          >
            <SwitchButton
              checked={joinRequest}
              onChange={(value) => setJoinRequest(value)}
            />
          </Card>
        </Section>
      )}
      {restrictedd && (
        <Section sectionTitle='RESTRICTED COMMUNITY SETTINGS'>
          <Card
            title='Gender'
            description='This information may be used to improve your recommendations and ads.'
          >
            <DropDownButton
              buttonList={[
                'Post Only (Default)',
                'Comment Only',
                'Post & Comment',
              ]}
              buttonText={approvedAbility}
              selected={approvedAbility}
              handleSelectionChange={(value) => setApprovedAbility(value)}
            />
          </Card>
          <Card title='Accepting new requests to post' description=''>
            <SwitchButton
              checked={postRequest}
              onChange={(value) => setPostRequest(value)}
            />
          </Card>
        </Section>
      )}
    </LoadingProvider>
  );
}

export default GeneralSettings;
