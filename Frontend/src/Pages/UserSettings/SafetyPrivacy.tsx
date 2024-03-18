import React from 'react';
import Section from './Containers/Section';
import Card from './Containers/Card';
import InputWButton from './Containers/InputWButton';
import { useMutation, useQuery } from 'react-query';
import { postRequest } from '../../API/User';
import { AxiosPromise } from 'axios';
import moment from 'moment';
import { Typography } from '@material-tailwind/react';
const ListCard = (props: {
  avatar: string;
  name: string;
  date: Date;
  id: number;
  refetch?: () => Promise<AxiosPromise>;
}) => {
  // const [timeDifference, setTimeDifference] = React.useState('');
  const postReq = useMutation(postRequest, {
    onSuccess: () => {
      props.refetch();
    },
  });
  const momDate = moment(props.date);
  const timeDifference = momDate.fromNow();
  const handleRemove = () => {
    postReq.mutate({
      endPoint: '/users/block-unblock-user',
      data: { id: props.id, block: false },
    });
  };
  return (
    <div className='flex justify-between w-full'>
      <div className='flex gap-2'>
        <img src={props.avatar} className='w-2.5 h-2.5' />

        <Typography>{props.name}</Typography>
        <Typography variant='small' color='gray'>
          {timeDifference}
        </Typography>
      </div>
      <div
        className='uppercase text-blue-light font-bold'
        onClick={handleRemove}
      >
        REMOVE
      </div>
    </div>
  );
};

function SafetyPrivacy() {
  return (
    <>
      <h2 className='text-xl my-8 font-semibold'>Safety & Privacy</h2>
      <Section sectionTitle='SAFETY'>
        <Card
          title='People You’ve Blocked'
          description='Blocked people can’t send you chat requests or private messages.'
        ></Card>
        <div>
          <InputWButton label='BLOCK NEW USER' buttonText='ADD' />
          <div className='mt-4 flex flex-col gap-2 w-full'>
            <ListCard
              avatar='avatar'
              date={new Date('2023/10/10')}
              id={1}
              name='Ahmed'
            />
            <ListCard
              avatar='avatar'
              date={new Date('2023/10/10')}
              id={1}
              name='Ahmed'
            />
          </div>
        </div>
        <Card
          title="Communities You've Muted"
          description="Posts from muted communities won't show up in your feeds or recommendations."
        ></Card>
        {/* <Card> */}
        <InputWButton label='MUTE NEW COMMUNITY' buttonText='ADD' />
        {/* </Card> */}
      </Section>
    </>
  );
}

export default SafetyPrivacy;
