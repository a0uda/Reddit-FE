import Message from './Containers/Message';
import ContentContainer from './Containers/ContentContainer';
import { useQuery } from 'react-query';
import { fetchRequest } from '../../API/User';
import LoadingProvider from '../../Components/LoadingProvider';
import { useEffect, useState } from 'react';

const Messages = () => {
  const [parentChildrenMap, setParentChildrenMap] = useState([]);
  const response = useQuery(
    'getAllMessages',
    () => fetchRequest('messages/read-all-messages'),
    {
      onSuccess: (data) => {
        console.log(data.data.messages, 'felonsuccess');

        setParentChildrenMap(
          data?.data.messages.reduce((acc, message) => {
            if (
              message.parentMessageId != null ||
              message.parentMessageId != undefined
            ) {
              if (acc[message.parentMessageId]) {
                acc[message.parentMessageId].push(message);
              } else {
                acc[message.parentMessageId] = [message];
              }
            }
            return acc;
          }, {})
        );
        console.log(parentChildrenMap, 'parentChildrenMap');
        // console.log(parentChildrenMap['663669e084f87cfbd0848f24'], 'middd');
      },
    }
  );

  // const parentIds = data?.data
  //   .filter((message) => message.parentMessageId === null)
  //   .map((message) => message._id);
  // console.log(, 'loading');

  return (
    <LoadingProvider error={response.isError} isLoading={response.isLoading}>
      <ContentContainer length={response.data?.data.messages.length}>
        <div className=''>
          {!!response.data?.data.messages &&
            response.data?.data.messages.map((mess) => {
              console.log(parentChildrenMap, 'messs');

              if (mess.parentMessageId == null) {
                return (
                  <Message
                    unread={mess['unread_flag']}
                    type='message'
                    isSent={mess['isSent']}
                    messageContent={mess.message}
                    senderType={mess['sender_type']}
                    receiverType={mess['receiver_type']}
                    receiverUsername={mess['receiver_username']}
                    senderUsername={mess['sender_username']}
                    sendingDate={new Date(mess['created_at'])}
                    subject={mess['subject']}
                    isReply={mess['isReply']}
                    repliesArr={
                      parentChildrenMap != undefined
                        ? parentChildrenMap[mess['_id']]
                        : []
                    }
                    messageId={mess['_id']}
                    key={mess['_id']}
                    senderVia={mess['senderVia']}
                    refetch={response.refetch}
                    parentMessageId={mess['parentMessageId'] || null}
                    query='messages'
                  />
                );
              }
            })}
          {/* <Message type='message' />
        <Message /> */}
        </div>
      </ContentContainer>
    </LoadingProvider>
  );
};

export default Messages;
