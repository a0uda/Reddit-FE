import React from 'react';
import Section from './Containers/Section';
import Card from './Containers/Card';
import InputWButton from './Containers/InputWButton';
import { useMutation, useQuery } from 'react-query';
import { fetchRequest, postRequest } from '../../API/User';
import moment from 'moment';
import LoadingProvider from '../../Components/LoadingProvider';
import { useAlert } from '../../Providers/AlertProvider';

const ListCard = (props: {
  avatar: string;
  name: string;
  date: Date;
  id: string;
  endPoint: string;
  data: object;
  refetch?: () => void;
}) => {
  // const [timeDifference, setTimeDifference] = React.useState('');
  const { trigger, setTrigger, setAlertMessage, setIsError } = useAlert();

  const postReq = useMutation(postRequest, {
    onSuccess: () => {
      if (props.refetch) {
        props.refetch();
      }
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
        <img
          src={
            props.avatar ||
            'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_4.png'
          }
          className='w-4 h-4'
        />

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
  const [blocked_users, setBlockedUsers] = React.useState([]);
  const [muted_communities, setMutedCommunities] = React.useState([]);
  const { data, isError, isLoading, refetch } = useQuery(
    'safety',
    () => fetchRequest('users/safety-settings'),
    {
      onSuccess: (data) => {
        setBlockedUsers(
          data?.data.content.safety_and_privacy_settings.blocked_users
        );
        setMutedCommunities(
          data?.data.content.safety_and_privacy_settings.muted_communities
        );
        console.log(data?.data, 'dataaaa');
      },
    }
  );

  const postReq = useMutation(postRequest, {
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
  const handleAddButton = (endPoint: string, data: unknown) => {
    postReq.mutate({ endPoint: endPoint, data: data });
  };
  console.log(!data);

  return (
    <LoadingProvider error={isError} isLoading={isLoading}>
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
              handleAddButton(`users/block-unblock-user`, {
                blocked_username: blockVal,
              });
              setBlockVal('');
            }}
          />
          <div className='mt-4 flex flex-col gap-2 w-full'>
            {blocked_users.map(
              (
                user: {
                  profile_picture: string;
                  blocked_date: Date;
                  id: string;
                  username: string;
                },
                i: number
              ) => (
                <ListCard
                  avatar={user.profile_picture}
                  date={user.blocked_date}
                  id={user.id}
                  name={user.username}
                  endPoint={`users/block-unblock-user`}
                  data={{ blocked_username: user.username }}
                  key={user.id + user.username + i}
                  refetch={refetch}
                />
              )
            )}
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
                community_name: muteComm,
              });
              setMuteComm('');
            }}
          />
          <div className='mt-4 flex flex-col gap-2 w-full'>
            {muted_communities.map(
              (
                comm: {
                  profile_picture: string;
                  muted_date: Date;
                  id: string;
                  name: string;
                },
                i: number
              ) => (
                <ListCard
                  avatar={comm.profile_picture}
                  date={comm.muted_date}
                  id={comm.id}
                  name={comm.name}
                  data={{
                    community_name: comm.name,
                    mute: false,
                  }}
                  endPoint='users/mute-unmute-community'
                  key={comm.id + comm.name + i}
                  refetch={refetch}
                />
              )
            )}
          </div>
        </div>
      </Section>
    </LoadingProvider>
  );
}

export default SafetyPrivacy;
