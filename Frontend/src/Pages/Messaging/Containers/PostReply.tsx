import React from 'react';
import {
  getTimeDifferenceAsString,
  addPrefixToUsername,
} from '../../../utils/helper_functions';
import { Link } from 'react-router-dom';
import { ReportModal, ThankYouModal } from './Message';
import { Button } from '@material-tailwind/react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

const PostReply = (props: {
  createDate: Date;
  senderUsername: string;
  postCreator: string;
  postCreatorType: string;
  postSubject: string;
  replyContent: string;
  replyId: string;
  unread: boolean;
  commentsCount: number;
  vote: number;
}) => {
  const [msgUnread, setMsgUnead] = React.useState(props.unread);
  const [reply, setReply] = React.useState('');
  const [replyBool, setReplyBool] = React.useState(false);
  const [removeBool, setRemoveBool] = React.useState(false);
  const [spamBool, setSpamBool] = React.useState(false);
  const [blockBool, setBlockeBool] = React.useState(false);
  const [reportModal, setReportModal] = React.useState(false);
  const [thankyouModal, setThankyouModal] = React.useState(false);
  const [vote, setVote] = React.useState(props.vote);
  // const [isExpandedAll, setIsExpandedAll] = React.useState(true);
  //   const [isExpandedMain, setIsExpandedMain] = React.useState(true);

  const handleThankyouModal = () => {
    setThankyouModal(!thankyouModal);
  };
  const handleReportModal = () => {
    setReportModal(!reportModal);
  };
  //   React.useEffect(() => {
  //     setIsExpandedMain(isExpandedAll);
  //   }, [isExpandedAll]);
  // const repliesArr = [
  //   { recieverUsername: 'mido', reply: 'this is a reply' },
  //   { recieverUsername: 'mido', reply: 'this is a reply' },
  //   { recieverUsername: 'mido', reply: 'this is a reply' },
  // ];

  return (
    <div
      onClick={() => {
        setMsgUnead(false);
      }}
      className='w-full odd:bg-[#f6f7f8] px-4 py-3'
    >
      <h3 className='font-bold'>
        post reply:
        {' ' + props.postSubject}
      </h3>
      <div className='flex'>
        <div className='pt-3'>
          <ArrowUpIcon
            color={vote === 1 ? 'orange' : '#888'}
            strokeWidth={4.5}
            className='w-[15px] cursor-pointer'
            onClick={() => {
              if (vote === 1) {
                setVote(0);
              } else {
                setVote(1);
              }
            }}
          />
          <ArrowDownIcon
            color={vote === -1 ? 'violet' : '#888'}
            strokeWidth={4.5}
            className='w-[15px] cursor-pointer'
            onClick={() => {
              if (vote === -1) {
                setVote(0);
              } else {
                setVote(-1);
              }
            }}
          />
        </div>

        <div
          className={`px-5 py-2 ${msgUnread ? 'bg-[#edeff1]' : ''} mt-2 flex-grow`}
        >
          <p
            className={`text-xs ${msgUnread ? 'text-danger-red font-bold' : ''}`}
          >
            <span>
              {' '}
              from{' '}
              <Link to='/' className='text-[#80bce9] hover:underline'>
                {addPrefixToUsername(props.senderUsername, 'user')}
              </Link>{' '}
            </span>

            <span>
              {' '}
              via{' '}
              <Link className='text-[#228822] hover:underline' to='/'>
                {addPrefixToUsername(
                  props.postCreator || '',
                  props.postCreatorType
                )}
              </Link>{' '}
            </span>

            <span>sent {getTimeDifferenceAsString(props.createDate)}</span>
          </p>

          <p dangerouslySetInnerHTML={{ __html: props.replyContent }}>
            {/* {props.replyContent} */}
          </p>

          <ul className='flex gap-3 mt-3 text-xs text-[#888] font-bold'>
            <li className='cursor-pointer hover:underline'>Context</li>
            <li className='cursor-pointer hover:underline'>
              Full Comments ({props.commentsCount})
            </li>
            {!spamBool ? (
              <li
                onClick={() => {
                  setSpamBool(true);
                }}
                className='cursor-pointer hover:underline'
              >
                Spam
              </li>
            ) : (
              <li className='text-danger-red font-normal'>
                are you sure?{' '}
                <span className='cursor-pointer hover:underline text-[#888] font-bold'>
                  Yes
                </span>{' '}
                /{' '}
                <span
                  className='text-[#888] font-bold cursor-pointer hover:underline'
                  onClick={() => {
                    setSpamBool(false);
                  }}
                >
                  No
                </span>
              </li>
            )}

            {!removeBool ? (
              <li
                onClick={() => {
                  setRemoveBool(true);
                }}
                className='cursor-pointer hover:underline'
              >
                Remove
              </li>
            ) : (
              <li className='text-danger-red font-normal'>
                are you sure?{' '}
                <span className=' cursor-pointer hover:underline text-[#888] font-bold'>
                  Yes
                </span>{' '}
                /{' '}
                <span
                  className='text-[#888] font-bold cursor-pointer hover:underline'
                  onClick={() => {
                    setRemoveBool(false);
                  }}
                >
                  No
                </span>
              </li>
            )}

            {
              <li
                onClick={handleReportModal}
                className='cursor-pointer hover:underline'
              >
                Report
              </li>
            }
            <ReportModal
              handleOpen={handleReportModal}
              open={reportModal}
              handleThankyouModal={handleThankyouModal}
            />
            <ThankYouModal
              handleOpen={handleThankyouModal}
              open={thankyouModal}
              senderUsername={props.senderUsername}
            />

            {!blockBool ? (
              <li
                onClick={() => {
                  setBlockeBool(true);
                }}
                className='cursor-pointer hover:underline'
              >
                Block User
              </li>
            ) : (
              <li className='text-danger-red font-normal'>
                are you sure?{' '}
                <span className=' cursor-pointer hover:underline text-[#888] font-bold'>
                  Yes
                </span>{' '}
                /{' '}
                <span
                  className='text-[#888] font-bold cursor-pointer hover:underline'
                  onClick={() => {
                    setBlockeBool(false);
                  }}
                >
                  No
                </span>
              </li>
            )}
            {!msgUnread && (
              <li
                onClick={(e) => {
                  e.stopPropagation();
                  setMsgUnead(true);
                }}
                className='cursor-pointer hover:underline'
              >
                Mark Unread
              </li>
            )}
            <li
              onClick={() => {
                setReplyBool(true);
              }}
              className='cursor-pointer hover:underline'
            >
              Reply
            </li>
          </ul>

          {replyBool && (
            <div>
              <textarea
                value={reply}
                onChange={(e) => {
                  setReply(e.target.value);
                }}
                className='w-[25rem] h-[6rem] mt-7 p-2 border-[1px] border-gray-500'
              ></textarea>
              <div className='flex gap-2 mt-2'>
                <Button
                  // onClick={handleOnClick}
                  className='rounded-sm bg-blue-light text-[1rem] px-4 py-1 uppercase'
                >
                  save
                </Button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    setReplyBool(false);
                  }}
                  className='rounded-sm bg-blue-light text-[1rem] px-4 py-1 uppercase'
                >
                  cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostReply;
