import Message from './Containers/Message';
import ContentContainer from './Containers/ContentContainer';
import { useQuery } from 'react-query';
import { fetchRequest } from '../../API/User';
import LoadingProvider from '../../Components/LoadingProvider';
import { useEffect } from 'react';

const Messages = () => {
  let parentChildrenMap: [];
  const response = useQuery(
    'getAllMessages',
    () => fetchRequest('messages/read-all-messages'),
    {
      onSuccess: (data) => {
        console.log(data.data.messages, 'felonsuccess');

        parentChildrenMap = data?.data.messages.reduce((acc, message) => {
          if (
            message.parent_message_id != null ||
            message.parent_message_id != undefined
          ) {
            if (acc[message.parent_message_id]) {
              acc[message.parent_message_id].push(message);
            } else {
              acc[message.parent_message_id] = [message];
            }
          }
          return acc;
        }, {});
        console.log(parentChildrenMap, 'parentChildrenMap');
      },
    }
  );
  console.log(response.data?.data, 'middd');

  // const parentIds = data?.data
  //   .filter((message) => message.parent_message_id === null)
  //   .map((message) => message._id);
  // console.log(, 'loading');

  return (
    <LoadingProvider error={response.isError} isLoading={response.isLoading}>
      <ContentContainer length={response.data?.data.messages.length}>
        <div className=''>
          {!!response.data?.data.messages &&
            response.data?.data.messages.map((mess) => {
              console.log(parentChildrenMap, 'messs');

              if (mess.parent_message_id == null) {
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
                    parent_message_id={mess['parent_message_id'] || null}
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
