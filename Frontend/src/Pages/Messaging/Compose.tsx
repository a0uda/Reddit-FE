import React from 'react';
import ContentContainer from './Containers/ContentContainer';
import { Button } from '@material-tailwind/react';
import { useMutation, useQuery } from 'react-query';
import { fetchRequest, postRequest } from '../../API/User';
import { addPrefixToUsername } from '../../utils/helper_functions';
import useSession from '../../hooks/auth/useSession';

const Compose = () => {
  const { user } = useSession();
  const [from, setFrom] = React.useState(user?.username);
  const [fromFeedback, setFromFeedback] = React.useState('');
  const [to, setTo] = React.useState('');
  const [subject, setSubject] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [fromBool, setfromBool] = React.useState(false);
  const [toBool, setToBool] = React.useState(false);
  const [subjectBool, setSubjectBool] = React.useState(false);
  const [messageBool, setMessageBool] = React.useState(false);
  const [toFeedback, setToFeedback] = React.useState('');
  React.useEffect(() => {
    setFrom(user?.username);
  }, [user]);

  const getCommResponse = useQuery('getModeratedCommunities', () =>
    fetchRequest('users/moderated-communities2')
  );
  console.log(getCommResponse.data, 'getCommResponse.data');

  const postReq = useMutation(postRequest, {
    onSuccess: () => {},
    onError: (error) => {
      const errorObj = JSON.parse(error.message);
      console.log(errorObj);

      if (errorObj.status == 400) {
        setToFeedback(errorObj.data);
        setToBool(true);
      }
      // Handle the error here
    },
  });

  const handleOnClick = () => {
    setToBool(false);
    setSubjectBool(false);
    setMessageBool(false);
    setfromBool(false);

    if (!to) {
      setToFeedback('Please Enter a Username');
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
    const moderatedCommunityNames = getCommResponse.data?.data.map(
      (com) => com.name
    );
    console.log(moderatedCommunityNames, 'mmmmm');
    const senderType = moderatedCommunityNames.includes(from)
      ? 'moderator'
      : 'user';
    const recType = to.includes('r/') ? 'moderator' : 'user';
    if (senderType == 'moderator' && recType == 'moderator') {
      setFromFeedback(
        "You can't send a message from a Subreddit to another Subreddit"
      );
      setfromBool(true);
      return;
    }
    const splitted = to.split('/');
    const recUsername = splitted[splitted.length - 1];
    postReq.mutate({
      endPoint: 'messages/compose/',
      data: {
        sender_username: from,
        sender_type: senderType,
        receiver_username: recUsername,
        receiver_type: recType,
        subject: subject,
        message: message,
        created_at: new Date(),
        deleted_at: null,
        unread_flag: false,
        senderVia: from,
      },
    });
  };

  return (
    <ContentContainer length={1}>
      <div className='px-5 py-3'>
        <h1 className='text-lg mb-3'>Send A Private Message</h1>
        <div className='mb-3'>
          <p className='text-lg'>from</p>
          <select
            value={from}
            onChange={(e) => {
              setFrom(e.target.value);
            }}
            // defaultValue={user?.username}
            className='w-[27rem] p-1 text-lg border-[1px] border-gray-500'
          >
            <option value={user?.username}>
              {addPrefixToUsername(user?.username || '', 'user')}
            </option>
            {getCommResponse.data?.data &&
              getCommResponse.data?.data.map((com, i) => (
                <option key={com.name} value={com.name}>
                  {addPrefixToUsername(com.name, 'moderator')}
                </option>
              ))}
            {/* <option value='op1'>op1</option>
            <option>op2</option>
            <option>op3</option> */}
          </select>
          {fromBool && (
            <p className='text-danger-red text-sm'>{fromFeedback}</p>
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
          {toBool && <p className='text-danger-red text-sm'>{toFeedback}</p>}
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
          <span className='font-normal text-sm'>
            {postReq.isLoading
              ? 'Submitting'
              : postReq.error
                ? 'An error occured while submitting message'
                : postReq.data
                  ? 'Message delivered successfully'
                  : ''}
          </span>
        </div>
      </div>
    </ContentContainer>
  );
};

export default Compose;
