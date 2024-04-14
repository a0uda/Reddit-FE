import PostReply from './Containers/PostReply';
import ContentContainer from './Containers/ContentContainer';
import { useQuery } from 'react-query';
import { fetchRequest } from '../../API/User';

const Sent = () => {
  const { data, error, isLoading } = useQuery('postReplies', () =>
    fetchRequest('messages/get-post-replies')
  );
  console.log(data);
  // createDate: Date;
  // senderUsername: string;
  // postCreator: string;
  // postCreatorType: string;
  // postSubject: string;
  // replyContent: string;
  // replyId: string;

  return (
    <ContentContainer>
      <div className=''>
        {!!data?.data &&
          data?.data.map((reply, i) => (
            <PostReply
              createDate={reply['created_at']}
              senderUsername={reply['senderUsername']}
              postCreator={reply['postCreator']}
              postCreatorType={reply['postCreatorType']}
              postSubject={reply['postSubject']}
              replyContent={reply['replyContent']}
              replyId={reply['replyId']}
              unread={reply['unread']}
              commentsCount={reply['commentsCount']}
              key={reply['replyId']}
              vote={reply['vote']}

              // unread={reply['unread_flag']}
              // type='sent'
              // isSent
              // messageContent={reply.message}
              // senderType={reply['sender_type']}
              // receiverType={reply['receiver_type']}
              // receiverUsername={reply['receiver_username']}
              // senderUsername={reply['sender_username']}
              // sendingDate={new Date(reply['created_at'])}
              // subject={reply['subject']}
              // isReply={reply['isReply']}
              // repliesArr={reply['replies'] || null}
              // messageId={reply['_id']}
              // key={reply['_id']}
              // senderVia={reply['senderVia']}
            />
          ))}
        {/* <Message type='message' />
        <Message /> */}
      </div>
    </ContentContainer>
  );
};

export default Sent;
