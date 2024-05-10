import Card from './Containers/Card';
import DropDownButton from './Containers/DropDownButton';
import Section from './Containers/Section';
import { useMutation, useQuery } from 'react-query';
import { fetchRequest, patchRequest } from '../../API/User';
import LoadingProvider from '../../Components/LoadingProvider';
import { useAlert } from '../../Providers/AlertProvider';
import { useState } from 'react';

function ChatsandMessaging() {
  const [who_send_chat_requests_flag, setWho_send_chat_request_flag] =
    useState('');
  const [who_send_private_messages_flag, setWho_send_private_messages_flag] =
    useState('');
  const { isError, isLoading, refetch } = useQuery(
    'Chat & Messaging data',
    () => fetchRequest('users/chats-and-msgs-settings'),
    {
      onSuccess: (data) => {
        console.log(data?.data, 'dataaaa');

        setWho_send_chat_request_flag(data?.data.who_send_chat_requests_flag);
        setWho_send_private_messages_flag(
          data?.data.who_send_private_messages_flag
        );
      },
    }
  );
  const { trigger, setTrigger, setAlertMessage, setIsError } = useAlert();
  const mutation = useMutation(patchRequest, {
    onSuccess: () => {
      refetch();
      setTrigger(!trigger);
      setIsError(false);
      setAlertMessage('User Settings Updated Successfully');
    },
    onError: (error: string) => {
      setTrigger(!trigger);
      setIsError(true);
      setAlertMessage(error);
    },
  });

  const handleToggleSwitch = (newSettings: object) => {
    mutation.mutate({
      endPoint: 'users/change-chats-and-msgs-settings',
      newSettings: { chat_and_messaging_settings: newSettings },
    });
  };

  return (
    <LoadingProvider error={isError} isLoading={isLoading}>
      <h2 className='text-xl my-8 font-semibold'>Chat & Messaging</h2>
      <Section sectionTitle=''>
        <Card title='Who can send you chat requests' description=''>
          <DropDownButton
            selected={who_send_chat_requests_flag}
            buttonList={['Everyone', 'Nobody']}
            handleSelectionChange={(selectedItem) =>
              handleToggleSwitch({
                who_send_chat_requests_flag: selectedItem,
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
