import React from 'react';
import SwitchButton from './Containers/SwitchButton';
import Card from './Containers/Card';
import Section from './Containers/Section';
import { fetchRequest, patchRequest } from '../../API/User';
import { useMutation, useQuery } from 'react-query';
import { Spinner } from '@material-tailwind/react';

function Email() {
  const { data, error, isLoading, refetch } = useQuery('email data', () =>
    fetchRequest('users/email-settings')
  );
  console.log(data);
  const mutation = useMutation(patchRequest, {
    onSuccess: () => {
      refetch();
    },
  });

  const handleToggleSwitch = (settingName, value) => {
    const notificationsSettings = data?.data || {};
    const newSettings = {
      ...notificationsSettings,
      [settingName]: value,
    };

    mutation.mutate({
      endPoint: 'users/change-email-settings',
      newSettings: newSettings,
    });
  };
  const {
    new_follower_email,
    chat_request_email,
    unsubscribe_from_all_emails,
  } = data?.data || {};

  return isLoading ? (
    <div className='w-full h-[30rem] flex items-center justify-center'>
      <Spinner className='h-16 w-16 text-gray-200' />
    </div>
  ) : data ? (
    <div>
      <h2 className='text-xl my-8 font-semibold'>Manage Emails</h2>
      <Section sectionTitle='MESSAGES'>
        <Card title='Chat requests' description=''>
          <SwitchButton
            checked={chat_request_email}
            onChange={(value) =>
              handleToggleSwitch('chat_request_email', value)
            }
          />
        </Card>
      </Section>
      <Section sectionTitle='ACTIVITY'>
        <Card title='New followers' description=''>
          <SwitchButton
            checked={new_follower_email}
            onChange={(value) =>
              handleToggleSwitch('new_follower_email', value)
            }
          />
        </Card>
      </Section>
      <Section sectionTitle=''>
        <Card title='Unsubscribe from all emails' description=''>
          <SwitchButton
            checked={unsubscribe_from_all_emails}
            onChange={(value) =>
              handleToggleSwitch('unsubscribe_from_all_emails', value)
            }
          />
        </Card>
      </Section>
    </div>
  ) : (
    <></>
  );
}

export default Email;
