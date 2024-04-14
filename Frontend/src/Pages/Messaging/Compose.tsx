import React from 'react';
import ContentContainer from './Containers/ContentContainer';
import { Button } from '@material-tailwind/react';
import { useQuery } from 'react-query';
import { fetchRequest } from '../../API/User';
import { addPrefixToUsername } from '../../utils/helper_functions';

const Compose = () => {
  const [from, setFrom] = React.useState('');
  const [to, setTo] = React.useState('');
  const [subject, setSubject] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [fromBool, setfromBool] = React.useState(true);
  const [toBool, setToBool] = React.useState(false);
  const [subjectBool, setSubjectBool] = React.useState(false);
  const [messageBool, setMessageBool] = React.useState(false);
  const getCommResponse = useQuery('getCommunities', () =>
    fetchRequest('users/moderated-communities')
  );

  const handleOnClick = () => {
    setToBool(false);
    setSubjectBool(false);
    setMessageBool(false);

    if (!to) {
      setToBool(true);
      return;
    }
    if (!subject) {
      setSubjectBool(true);
      return;
    }
    if (!message) {
      setMessageBool(true);
      return;
    }
  };

  return (
    <ContentContainer>
      <div className='px-5 py-3'>
        <h1 className='text-lg mb-3'>Send A Private Message</h1>
        <div className='mb-3'>
          <p className='text-lg'>from</p>
          <select
            value={from}
            onChange={(e) => {
              setFrom(e.target.value);
            }}
            className='w-[27rem] p-1 text-lg border-[1px] border-gray-500'
          >
            {getCommResponse.data?.data.moderated_communities &&
              getCommResponse.data?.data.moderated_communities.map((com, i) => (
                <option key={com.name}>
                  {addPrefixToUsername(com.name, 'moderator')}
                </option>
              ))}
            {/* <option value='op1'>op1</option>
            <option>op2</option>
            <option>op3</option> */}
          </select>
          {fromBool && (
            <p className='text-danger-red text-sm'>
              You can&apos;t send a message from a Subreddit to another
              Subreddit
            </p>
          )}
        </div>
        <div className='mb-3'>
          <p className='text-lg'>
            to{' '}
            <span className='text-[#878a8c]'>
              (username, or /r/name for that subreddit&apos;s moderators)
            </span>
          </p>
          <input
            value={to}
            onChange={(e) => {
              setTo(e.target.value);
            }}
            type='text'
            className='w-[27rem] p-1 text-lg border-[1px] border-gray-500'
          />
          {toBool && (
            <p className='text-danger-red text-sm'>Please Enter a Username</p>
          )}
        </div>
        <div className='mb-3'>
          <p className='text-lg'>subject</p>
          <input
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
            }}
            type='text'
            className='w-[27rem] p-1 text-lg border-[1px] border-gray-500'
          />
          {subjectBool && (
            <p className='text-danger-red text-sm'>Please Enter a Subject</p>
          )}
        </div>
        <div className='mb-3'>
          <p className='text-lg'>message</p>
          <textarea
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            className='w-[27rem] min-h-[7rem] p-1 text-lg border-[1px] border-gray-500'
          />
          {messageBool && (
            <p className='text-danger-red text-sm'>We Need Something Here</p>
          )}
        </div>
        <div className='flex gap-2 items-center'>
          <Button
            onClick={handleOnClick}
            className='rounded-sm bg-blue-light text-[1rem] px-4 py-1'
          >
            Send
          </Button>
          {/* <span className='font-normal text-sm'>
            {isLoading
              ? 'Submitting'
              : error
                ? 'An error occured while submitting message'
                : data
                  ? 'Message delivered successfully'
                  : ''}
          </span> */}
        </div>
      </div>
    </ContentContainer>
  );
};

export default Compose;
