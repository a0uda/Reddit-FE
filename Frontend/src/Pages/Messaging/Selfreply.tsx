import PostReply from './Containers/PostReply';
import ContentContainer from './Containers/ContentContainer';
import { useQuery } from 'react-query';
import { fetchRequest } from '../../API/User';
import LoadingProvider from '../../Components/LoadingProvider';
import { PostReplyType } from '../../types/types';

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

  const sortedReplies = data?.data.replies.sort(
    (a: PostReplyType, b: PostReplyType) => {
      const dateA = new Date(a['created_at']);
      const dateB = new Date(b['created_at']);
      return dateB.getTime() - dateA.getTime(); // descending order
    }
  );

  return (
    <LoadingProvider error={isError} isLoading={isLoading}>
      <ContentContainer length={data?.data.replies.length}>
        <div className=''>
          {sortedReplies &&
            sortedReplies.map((reply: PostReplyType) => (
              <PostReply
                createDate={reply['created_at']}
                senderUsername={reply['senderUsername']}
                postCreator={reply['postCreator']}
                postCreatorType={reply['postCreatorType']}
                postSubject={reply['postSubject']}
                replyContent={reply['replyContent']}
                replyId={reply['_id']}
                unread={false}
                commentsCount={reply['commentsCount']}
                key={reply['_id']}
                vote={reply['rank']}
                is_username_mention={false}
                query='postReplies'
                refetch={refetch}
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
