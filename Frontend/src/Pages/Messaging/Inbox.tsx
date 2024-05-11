import Message from './Containers/Message';
import ContentContainer from './Containers/ContentContainer';
import { useQuery } from 'react-query';
import { fetchRequest } from '../../API/User';
import PostReply from './Containers/PostReply';
import LoadingProvider from '../../Components/LoadingProvider';
import { MessageType, PostReplyType } from '../../types/types';

const Sent = () => {
  const { data, isError, isLoading, refetch } = useQuery('inbox', () =>
    fetchRequest('messages/inbox')
  );

  // Sort messages by created_at in descending order
  const sortedMessages = data?.data.messages.sort(
    (a: MessageType, b: MessageType) => {
      const dateA = new Date(a['created_at']);
      const dateB = new Date(b['created_at']);
      return dateB.getTime() - dateA.getTime(); // descending order
    }
  );

  return (
    <LoadingProvider error={isError} isLoading={isLoading}>
      <ContentContainer length={sortedMessages?.length}>
        <div className=''>
          {sortedMessages?.map((mess: never) => {
            if ('postCreator' in mess && 'postSubject' in mess) {
              const postReply = mess as PostReplyType;
              return (
                <PostReply
                  createDate={postReply.created_at}
                  senderUsername={postReply.senderUsername}
                  postCreator={postReply.postCreator}
                  postCreatorType={postReply.postCreatorType}
                  postSubject={postReply.postSubject}
                  replyContent={postReply.replyContent}
                  replyId={postReply._id}
                  unread={false}
                  commentsCount={postReply.commentsCount}
                  key={postReply._id}
                  is_username_mention={postReply.is_username_mention}
                  query='inbox'
                  vote={postReply.rank}
                  refetch={refetch}
                />
              );
            } else {
              const message = mess as MessageType;
              return (
                <Message
                  unread={message.unread_flag}
                  type='received'
                  isSent={false}
                  messageContent={message.message}
                  senderType={message.sender_type}
                  receiverType={message.receiver_type}
                  receiverUsername={message.receiver_username}
                  senderUsername={message.sender_username}
                  sendingDate={new Date(message.created_at)}
                  subject={message.subject}
                  isReply={message.isReply}
                  messageId={message._id}
                  key={message._id}
                  senderVia={message.senderVia}
                  refetch={refetch}
                  parentMessageId={message.parentMessageId}
                  is_invitation={message.is_invitation}
                  query='inbox'
                />
              );
            }
          })}
        </div>
      </ContentContainer>
    </LoadingProvider>
  );
};

export default Sent;
