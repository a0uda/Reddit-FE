import React from 'react';
import Message from './Containers/Message';
import ContentContainer from './Containers/ContentContainer';
import { useQuery } from 'react-query';
import { fetchRequest } from '../../API/User';

const Sent = () => {
  const { data, error, isLoading, refetch } = useQuery('sentMessages', () =>
    fetchRequest('messages/sent/')
  );
  console.log(data);

  return (
    <ContentContainer>
      <div className=''>
        {!!data?.data &&
          data?.data.map((mess) => (
            <Message
              unread={mess['unread_flag']}
              type='sent'
              isSent
              messageContent={mess.message}
              senderType={mess['sender_type']}
              receiverType={mess['receiver_type']}
              receiverUsername={mess['receiver_username']}
              senderUsername={mess['sender_username']}
              sendingDate={new Date(mess['created_at'])}
              subject={mess['subject']}
              isReply={mess['isReply']}
              repliesArr={mess['replies'] || null}
              messageId={mess['_id']}
              key={mess['_id']}
              senderVia={mess['senderVia']}
              refetch={refetch}
              parentMessageId={mess['parentMessageId']}
            />
          ))}
        {/* <Message type='message' />
        <Message /> */}
      </div>
    </ContentContainer>
  );
};

export default Sent;
