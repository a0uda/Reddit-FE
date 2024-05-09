import Message from './Containers/Message';
import ContentContainer from './Containers/ContentContainer';
import { useQuery } from 'react-query';
import { fetchRequest } from '../../API/User';
import LoadingProvider from '../../Components/LoadingProvider';
import { MessageType } from '../../types/types';

const Sent = () => {
  const { data, isError, isLoading, refetch } = useQuery('sentMessages', () =>
    fetchRequest('messages/sent/')
  );
  console.log(data);

  const sortedMessages = data?.data.messages.sort(
    (a: MessageType, b: MessageType) => {
      const dateA = new Date(a['created_at']);
      const dateB = new Date(b['created_at']);
      return dateB.getTime() - dateA.getTime(); // descending order
    }
  );

  return (
    <LoadingProvider error={isError} isLoading={isLoading}>
      <ContentContainer length={data?.data.messages.length}>
        <div className=''>
          {!!sortedMessages &&
            sortedMessages.map((mess: MessageType) => (
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
                repliesArr={undefined}
                messageId={mess['_id']}
                key={mess['_id']}
                senderVia={mess['senderVia']}
                is_invitation={mess['is_invitation']}
                refetch={refetch}
                parentMessageId={mess['parentMessageId']}
              />
            ))}
          {/* <Message type='message' />
        <Message /> */}
        </div>
      </ContentContainer>
    </LoadingProvider>
  );
};

export default Sent;
