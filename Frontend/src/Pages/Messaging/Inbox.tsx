import Message from './Containers/Message';
import ContentContainer from './Containers/ContentContainer';
import { useQuery } from 'react-query';
import { fetchRequest } from '../../API/User';
import PostReply from './Containers/PostReply';
import LoadingProvider from '../../Components/LoadingProvider';

const Sent = () => {
  const { data, isError, isLoading, refetch } = useQuery('inbox', () =>
    fetchRequest('messages/inbox')
  );

  // Sort messages by created_at in descending order
  const sortedMessages = data?.data.messages.sort((a, b) => {
    const dateA = new Date(a['created_at']);
    const dateB = new Date(b['created_at']);
    return dateB - dateA; // descending order
  });

  return (
    <LoadingProvider error={isError} isLoading={isLoading}>
      <ContentContainer length={sortedMessages?.length}>
        <div className=''>
          {sortedMessages?.map((mess) => {
            console.log(mess.postCreator, 'mess.postCreator');

            if (
              mess.postCreator == undefined &&
              mess.postSubject == undefined
            ) {
              return (
                <Message
                  unread={mess['unread_flag']}
                  type='received'
                  isSent={false}
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
                  is_invitation={mess['is_invitation']}
                  query='inbox'
                />
              );
            } else {
              return (
                <PostReply
                  createDate={mess['created_at']}
                  senderUsername={mess['senderUsername']}
                  postCreator={mess['postCreator']}
                  postCreatorType={mess['postCreatorType']}
                  postSubject={mess['postSubject']}
                  replyContent={mess['replyContent']}
                  replyId={mess['_id']}
                  unread={mess['unread']}
                  commentsCount={mess['commentsCount']}
                  key={mess['_id']}
                  vote={mess['vote']}
                  is_username_mention={mess.is_username_mention}
                  query='inbox'
                  vote={mess['rank']}
                  refetch={refetch}
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
