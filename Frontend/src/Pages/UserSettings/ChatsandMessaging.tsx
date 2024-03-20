import React from 'react';
import Card from './Containers/Card';
import DropDownButton from './Containers/DropDownButton';
import Section from './Containers/Section';
import { useMutation, useQuery } from 'react-query';
import { fetchRequest, patchRequest } from '../../API/User';
import LoadingProvider from './Containers/LoadingProvider';

function ChatsandMessaging() {
  const { data, error, isLoading, refetch } = useQuery(
    'Chat & Messaging data',
    () => fetchRequest('users/chats-and-msgs-settings')
  );

  const mutation = useMutation(patchRequest, {
    onSuccess: () => {
      refetch();
    },
  });

  const handleToggleSwitch = (newSettings: object) => {
    mutation.mutate({
      endPoint: 'users/change-chats-and-msgs-settings',
      newSettings: newSettings,
    });
  };
  const { who_send_chat_request_flag, who_send_private_messages_flag } =
    data?.data || {};

  return (
    <LoadingProvider error={error} isLoading={isLoading}>
      <h2 className='text-xl my-8 font-semibold'>Chat & Messaging</h2>
      <Section sectionTitle=''>
        <Card title='Who can send you chat requests' description=''>
          <DropDownButton
            selected={who_send_chat_request_flag}
            buttonList={['Everyone', 'Accounts older than 30 days', 'Nobody']}
            handleSelectionChange={(selectedItem) =>
              handleToggleSwitch({
                who_send_chat_request_flag: selectedItem,
              })
            }
          />
        </Card>
        <Card
          title='Who can send you private messages'
          description='Heads up—Reddit admins and moderators of communities you’ve joined can message you even if they’re not approved.'
        >
          <DropDownButton
            selected={who_send_private_messages_flag}
            buttonList={['Everyone', 'Nobody']}
            handleSelectionChange={(selectedItem) =>
              handleToggleSwitch({
                who_send_private_messages_flag: selectedItem,
              })
            }
          />
        </Card>
      </Section>
    </LoadingProvider>
  );
}

export default ChatsandMessaging;
