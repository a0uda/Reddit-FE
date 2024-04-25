import React from 'react';
import Section from './Containers/Section';
import Card from './Containers/Card';
import SwitchButton from '../../Components/SwitchButton';
import { useMutation, useQuery } from 'react-query';
import { fetchRequest, patchRequest } from '../../API/User';
import { Spinner } from '@material-tailwind/react';
import LoadingProvider from './Containers/LoadingProvider';
import { useAlert } from '../../Providers/AlertProvider';

function Notifications() {
  const { data, error, isLoading, refetch } = useQuery(
    'notifications settings',
    () => fetchRequest('users/notification-settings')
  );
  const { trigger, setTrigger, setAlertMessage, setIsError } = useAlert();

  const mutation = useMutation(patchRequest, {
    onSuccess: () => {
      refetch();
      setTrigger(!trigger);
      setIsError(false);
      setAlertMessage('User Settings Updated Successfully');
    },
    onError: (error) => {
      const errorObj = JSON.parse(error.message);

      setTrigger(!trigger);
      setIsError(true);
      setAlertMessage(errorObj.data);
    },
  });

  const handleToggleSwitch = (settingName, value) => {
    const newSettings = {
      notifications_settings: {
        [settingName]: value,
      },
    };

    mutation.mutate({
      endPoint: 'users/change-notification-settings',
      newSettings: newSettings,
    });
  };
  const {
    private_messages,
    chat_messages,
    chat_requests,
    mentions,
    comments,
    upvotes_posts,
    upvotes_comments,
    replies,
    new_followers,
    invitations,
    posts,
  } = data?.data || {};

  return (
    <LoadingProvider error={error} isLoading={isLoading}>
      <h2 className='text-xl my-8 font-semibold'>Notification settings</h2>
      <Section sectionTitle='MESSAGES'>
        <Card title='Private Messages' description=''>
          <SwitchButton
            checked={private_messages}
            onChange={(value) => handleToggleSwitch('private_messages', value)}
          />
        </Card>
        <Card title='Chat messages' description=''>
          <SwitchButton
            checked={chat_messages}
            onChange={(value) => handleToggleSwitch('chat_messages', value)}
          />
        </Card>
        <Card title='Chat requests' description=''>
          <SwitchButton
            checked={chat_requests}
            onChange={(value) => handleToggleSwitch('chat_requests', value)}
          />
        </Card>
      </Section>
      <Section sectionTitle='ACTIVITY'>
        <Card title='Mentions of u/username' description=''>
          <SwitchButton
            checked={mentions}
            onChange={(value) => handleToggleSwitch('mentions', value)}
          />
        </Card>
        <Card title='Comments on your posts' description=''>
          <SwitchButton
            checked={comments}
            onChange={(value) => handleToggleSwitch('comments', value)}
          />
        </Card>
        <Card title='Upvotes on your posts' description=''>
          <SwitchButton
            checked={upvotes_posts}
            onChange={(value) => handleToggleSwitch('upvotes_posts', value)}
          />
        </Card>
        <Card title='Upvotes on your comments' description=''>
          <SwitchButton
            checked={upvotes_comments}
            onChange={(value) => handleToggleSwitch('upvotes_comments', value)}
          />
        </Card>
        <Card title='Replies to your comments' description=''>
          <SwitchButton
            checked={replies}
            onChange={(value) => handleToggleSwitch('replies', value)}
          />
        </Card>
        <Card title='New followers' description=''>
          <SwitchButton
            checked={new_followers}
            onChange={(value) => handleToggleSwitch('new_followers', value)}
          />
        </Card>
        <Card title='Invtations' description=''>
          <SwitchButton
            checked={invitations}
            onChange={(value) => handleToggleSwitch('invitations', value)}
          />
        </Card>
        <Card title='Posts you follow' description=''>
          <SwitchButton
            checked={posts}
            onChange={(value) => handleToggleSwitch('posts', value)}
          />
        </Card>
      </Section>
    </LoadingProvider>
  );
}

export default Notifications;
