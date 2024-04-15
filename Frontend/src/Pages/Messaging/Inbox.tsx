import Message from './Containers/Message';
import ContentContainer from './Containers/ContentContainer';
import { useQuery } from 'react-query';
import { fetchRequest } from '../../API/User';
import PostReply from './Containers/PostReply';

const Sent = () => {
  const { data, error, isLoading, refetch } = useQuery('inbox', () =>
    fetchRequest('messages/inbox')
  );
  console.log(data);

  return (
    <ContentContainer>
      <div className=''>
        {!!data?.data &&
          data?.data.map((mess) => {
            console.log(mess.postCreator, 'mess.postCreator');

            if (mess.postCreator == undefined) {
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
                  replyId={mess['replyId']}
                  unread={mess['unread']}
                  commentsCount={mess['commentsCount']}
                  key={mess['replyId']}
                  vote={mess['vote']}
                />
              );
            }
          })}
        {/* <Message type='message' />
        <Message /> */}
      </div>
    </ContentContainer>
  );
};

export default Sent;
