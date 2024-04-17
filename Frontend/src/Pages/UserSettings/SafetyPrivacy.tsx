import React from 'react';
import Section from './Containers/Section';
import Card from './Containers/Card';
import InputWButton from './Containers/InputWButton';
import { useMutation, useQuery } from 'react-query';
import { fetchRequest, postRequest } from '../../API/User';
import { AxiosPromise } from 'axios';
import moment from 'moment';
import { Typography } from '@material-tailwind/react';
import LoadingProvider from './Containers/LoadingProvider';
import { useAlert } from '../../Providers/AlertProvider';

const ListCard = (props: {
  avatar: string;
  name: string;
  date: Date;
  id: number;
  endPoint: string;
  data: object;
  refetch?;
}) => {
  // const [timeDifference, setTimeDifference] = React.useState('');
  const { trigger, setTrigger, setAlertMessage, setIsError } = useAlert();

  const postReq = useMutation(postRequest, {
    onSuccess: () => {
      props.refetch();
      setTrigger(!trigger);
      setIsError(false);
      setAlertMessage('User Settings Updated Successfully');
    },
    onError: (error) => {
      setTrigger(!trigger);
      setIsError(true);
      setAlertMessage(error.message);
    },
  });
  const momDate = moment(props.date);
  const timeDifference = momDate.fromNow();
  const handleRemove = () => {
    postReq.mutate({
      endPoint: props.endPoint,
      data: props.data,
    });
  };
  return (
    <div className='flex justify-between w-full'>
      <div className='flex gap-2 items-center'>
        <img src={props.avatar} className='w-4 h-4' />

        <div className='text-base'>{props.name}</div>
        <div className='text-xs text-gray-light'>{timeDifference}</div>
      </div>
      <div
        className='uppercase text-blue-light font-bold cursor-pointer'
        onClick={handleRemove}
      >
        REMOVE
      </div>
    </div>
  );
};

function SafetyPrivacy() {
  const [blockVal, setBlockVal] = React.useState('');
  const [muteComm, setMuteComm] = React.useState('');
  const { trigger, setTrigger, setAlertMessage, setIsError } = useAlert();

  const { data, error, isLoading, refetch } = useQuery('safety', () =>
    fetchRequest('users/safety-settings')
  );

  const blocked_users = data?.data?.blocked_users ?? [];
  const muted_communities = data?.data?.muted_communities ?? [];

  const postReq = useMutation(postRequest, {
    onSuccess: () => {
      refetch();
      setTrigger(!trigger);
      setIsError(false);
      setAlertMessage('User Settings Updated Successfully');
    },
    onError: (error) => {
      setTrigger(!trigger);
      setIsError(true);
      setAlertMessage(error.message);
    },
  });
  const handleAddButton = (endPoint, data) => {
    postReq.mutate({ endPoint: endPoint, data: data });
  };
  console.log(!data);

  return (
    <LoadingProvider error={error} isLoading={isLoading}>
      <h2 className='text-xl my-8 font-semibold'>Safety & Privacy</h2>
      <Section sectionTitle='SAFETY'>
        <Card
          title='People You’ve Blocked'
          description='Blocked people can’t send you chat requests or private messages.'
        ></Card>
        <div>
          <InputWButton
            label='BLOCK NEW USER'
            buttonText='ADD'
            inputValue={blockVal}
            setInputValue={setBlockVal}
            onClick={() => {
              handleAddButton('users/block-unblock-user', {
                block: true,
                blocked_username: blockVal,
              });
              setBlockVal('');
            }}
          />
          <div className='mt-4 flex flex-col gap-2 w-full'>
            {blocked_users.map((user, i) => (
              <ListCard
                avatar={user.profile_picture}
                date={user.blocked_date}
                id={user.id}
                name={user.username}
                endPoint='users/block-unblock-user'
                data={{ blocked_username: user.username, block: false }}
                key={user.id + user.username + i}
                refetch={refetch}
              />
            ))}
          </div>
        </div>
        <Card
          title="Communities You've Muted"
          description="Posts from muted communities won't show up in your feeds or recommendations."
        ></Card>
        <div>
          <InputWButton
            label='MUTE NEW COMMUNITY'
            buttonText='ADD'
            inputValue={muteComm}
            setInputValue={setMuteComm}
            onClick={() => {
              handleAddButton('users/mute-unmute-community', {
                mute: true,
                'community-title': muteComm,
              });
              setMuteComm('');
            }}
          />
          <div className='mt-4 flex flex-col gap-2 w-full'>
            {muted_communities.map((comm, i) => (
              <ListCard
                avatar={comm.profile_picture}
                date={comm.muted_date}
                id={comm.id}
                name={comm['community-title']}
                data={{
                  'community-title': comm['community-title'],
                  mute: false,
                }}
                endPoint='users/mute-unmute-community'
                key={comm.id + comm.community_title + i}
                refetch={refetch}
              />
            ))}
          </div>
        </div>
      </Section>
    </LoadingProvider>
  );
}

export default SafetyPrivacy;
