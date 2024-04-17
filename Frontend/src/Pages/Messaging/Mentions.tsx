import PostReply from './Containers/PostReply';
import ContentContainer from './Containers/ContentContainer';
import { useQuery } from 'react-query';
import { fetchRequest } from '../../API/User';
import LoadingProvider from '../../Components/LoadingProvider';

const Sent = () => {
  const { data, isError, isLoading, refetch } = useQuery(
    'usernameMentions',
    () => fetchRequest('messages/get-user-mentions')
    // /messages/get-user-mentions
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
    <LoadingProvider error={isError} isLoading={isLoading}>
      <ContentContainer length={data?.data.length}>
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
                replyId={reply['id']}
                unread={reply['unread']}
                commentsCount={reply['commentsCount']}
                key={reply['id']}
                vote={reply['rank']}
                query='usernameMentions'
                refetch={refetch}
              />
            ))}
        </div>
      </ContentContainer>
    </LoadingProvider>
  );
};

export default Sent;
