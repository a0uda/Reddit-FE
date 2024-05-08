import PostReply from './Containers/PostReply';
import ContentContainer from './Containers/ContentContainer';
import { useQuery } from 'react-query';
import { fetchRequest } from '../../API/User';
import LoadingProvider from '../../Components/LoadingProvider';

const Sent = () => {
  const { data, isError, isLoading, refetch } = useQuery('postReplies', () =>
    fetchRequest('messages/get-user-post-replies')
  );
  console.log(data, 'messages/get-user-post-replies');
  // createDate: Date;
  // senderUsername: string;
  // postCreator: string;
  // postCreatorType: string;
  // postSubject: string;
  // replyContent: string;
  // replyId: string;

  const sortedReplies = data?.data.replies.sort((a, b) => {
    const dateA = new Date(a['created_at']);
    const dateB = new Date(b['created_at']);
    return dateB - dateA; // descending order
  });

  return (
    <LoadingProvider error={isError} isLoading={isLoading}>
      <ContentContainer length={data?.data.replies.length}>
        <div className=''>
          {sortedReplies &&
            sortedReplies.map((reply, i) => (
              <PostReply
                createDate={reply['created_at']}
                senderUsername={reply['senderUsername']}
                postCreator={reply['postCreator']}
                postCreatorType={reply['postCreatorType']}
                postSubject={reply['postSubject']}
                replyContent={reply['replyContent']}
                replyId={reply['_id']}
                unread={reply['unread']}
                commentsCount={reply['commentsCount']}
                key={reply['_id']}
                vote={reply['rank']}
                is_username_mention={false}
                query='postReplies'
                refetch={refetch}

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
    </LoadingProvider>
  );
};

export default Sent;
