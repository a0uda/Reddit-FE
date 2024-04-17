import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
} from '@material-tailwind/react';
import { CheckCircleIcon, NoSymbolIcon } from '@heroicons/react/24/solid';
import RoundedButton from '../../../Components/RoundedButton';
import SwitchButton from '../../../Components/SwitchButton';
import {
  getTimeDifferenceAsString,
  addPrefixToUsername,
} from '../../../utils/helper_functions';
import { useMutation, useQueryClient } from 'react-query';
import { postRequest } from '../../../API/User';
import { useAlert } from '../../../Providers/AlertProvider';

function Butt(props: {
  buttonText: string;
  onClick?: () => void;
  active: boolean;
}) {
  return (
    <Button
      onClick={props.onClick}
      style={{
        //backgroundColor: props.buttonColor,
        // color: props.buttonTextColor,
        width: 'max-content',
      }}
      type='button'
      // color='black'
      className={`!border !normal-case ${props.active ? ' bg-[#42adf0] border-[#42adf0] text-white' : ' bg-white border-gray-light text-gray-light'} text-sm font-bold hover:bg-[#42adf0] hover:text-white hover:border-[#42adf0] active:brightness-150 rounded-full hover:shadow-none focus:shadow-none shadow-none `}
      size='sm'
      ripple={false}
    >
      <div className='flex justify-between items-center gap-1'>
        {props.buttonText}
      </div>
    </Button>
  );
}
export const ReportModal = (props: {
  handleOpen: () => void;
  open: boolean;
  handleThankyouModal: () => void;
  username: string;
  senderType: string;
  id: string;
  type: string;
}) => {
  const reportMsgArr = [
    'Harassment',
    'Threatening violence',
    'Hate',
    'Minor abuse or sexualization',
    'Sharing personal information',
    'Non-consensual intimate media',
    'Prohibited transaction',
    'Impersonation',
    'Copyright violation',
    'Trademark violation',
    'Self-harm or suicide',
    'Spam',
  ];
  const reportMsgObj: { [key: string]: string } = {
    Harassment:
      'Harassing, bullying, intimidating, or abusing an individual or group of people with the result of discouraging them from participating.',
    'Threatening violence':
      'Encouraging, glorifying, or inciting violence or physical harm against individuals or groups of people, places, or animals.',
    Hate: 'Promoting hate or inciting violence based on identity or vulnerability.',
    'Minor abuse or sexualization':
      'Sharing or soliciting content involving abuse, neglect, or sexualization of minors or any predatory or inappropriate behavior towards minors.',
    'Sharing personal information':
      'Sharing or threatening to share private, personal, or confidential information about someone.',
    'Non-consensual intimate media':
      'Sharing, threatening to share, or soliciting intimate or sexually-explicit content of someone without their consent (including fake or "lookalike" pornography).',
    'Prohibited transaction':
      'Soliciting or facilitating transactions or gifts of illegal or prohibited goods and services.',
    Impersonation:
      'Impersonating an individual or entity in a misleading or deceptive way. This includes deepfakes, manipulated content, or false attributions.',
    'Copyright violation':
      'Content posted to Reddit that infringes a copyright you own or control. (Note: Only the copyright owner or an authorized representative can submit a report.)',
    'Trademark violation':
      'Content posted to Reddit that infringes a trademark you own or control. (Note: Only the trademark owner or an authorized representative can submit a report.)',
    'Self-harm or suicide':
      'Behavior or comments that make you think someone may be considering suicide or seriously hurting themselves.',
    Spam: 'Repeated, unwanted, or unsolicited manual or automated actions that negatively affect redditors, communities, and the Reddit platform.',
  };
  const [chosenMsg, setChosenMsg] = React.useState('');
  const postReq = useMutation(postRequest);

  return (
    <>
      <Dialog size='md' open={props.open} handler={props.handleOpen}>
        <DialogHeader className='!block text-center border-b border-lines-color p-5'>
          <h6 className='flex items-center text-base text-gray-600 font-bold'>
            Submit a Report
          </h6>
          <IconButton
            color='blue-gray'
            size='sm'
            variant='text'
            onClick={() => {
              setChosenMsg('');
              props.handleOpen();
            }}
            className='!absolute right-[10px] top-[10px]'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
              className='h-5 w-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </IconButton>
        </DialogHeader>
        <DialogBody className='flex gap-6 p-5 flex-col'>
          <p className='text-black'>
            Thanks for looking out for yourself and your fellow redditors by
            reporting things that break the rules. Let us know what&apos;s
            happening, and we&apos;ll look into it.
          </p>
          <div className='flex gap-1 flex-wrap'>
            {reportMsgArr.map((rep, i) => (
              <Butt
                key={rep + i}
                buttonText={rep}
                onClick={() => {
                  setChosenMsg(rep);
                }}
                active={rep === chosenMsg}
              />
            ))}
          </div>
        </DialogBody>
        <DialogFooter>
          <div className='flex gap-5'>
            <div>
              <h3 className='text-lg text-black font-bold'>{chosenMsg}</h3>
              <p className='text-[#9fa1a3] leading-tight'>
                {reportMsgObj[chosenMsg]}
              </p>
            </div>
            <div className='flex items-end'>
              <RoundedButton
                buttonBorderColor='border-blue-light'
                buttonColor='bg-blue-light'
                buttonText='NEXT'
                buttonTextColor='text-white font-bold px-8'
                disabled={!chosenMsg}
                onClick={() => {
                  if (props.type != 'postReply') {
                    postReq.mutate(
                      {
                        endPoint: 'messages/report-msg',
                        data: {
                          report: chosenMsg,
                          sender_username: props.username,
                          sender_type: props.senderType,
                          _id: props.id,
                        },
                      },
                      {
                        onSuccess: () => {
                          setChosenMsg('');
                          props.handleThankyouModal();
                          props.handleOpen();
                        },
                      }
                    );
                  } else {
                    postReq.mutate(
                      {
                        endPoint: 'posts-or-comments/report',
                        data: {
                          id: props.id,
                          is_post: false,
                          reason: chosenMsg,
                        },
                      },
                      {
                        onSuccess: () => {
                          setChosenMsg('');
                          props.handleThankyouModal();
                          props.handleOpen();
                        },
                      }
                    );
                  }
                }}
              />
            </div>
          </div>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export const ThankYouModal = (props: {
  handleOpen: () => void;
  open: boolean;
  senderUsername: string;
  query: string;
}) => {
  const postReq = useMutation(postRequest);
  const { trigger, setTrigger, setAlertMessage, setIsError } = useAlert();
  const queryClient = useQueryClient();
  return (
    <>
      <Dialog size='md' open={props.open} handler={props.handleOpen}>
        <DialogHeader className='!block text-center border-b border-lines-color p-5'>
          <h6 className='flex items-center text-base text-gray-600 font-bold'>
            Submit a Report
          </h6>
          <IconButton
            color='blue-gray'
            size='sm'
            variant='text'
            onClick={props.handleOpen}
            className='!absolute right-[10px] top-[10px]'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
              className='h-5 w-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </IconButton>
        </DialogHeader>
        <DialogBody className='flex gap-6 p-5 flex-col'>
          <CheckCircleIcon className='w-10 h-10 text-blue-light' />
          <h3 className='text-2xl text-black font-bold'>
            Thanks for your report
          </h3>

          <p className='text-black text-lg'>
            Thanks again for your report and for looking out for yourself and
            your fellow redditors. Your reporting helps make Reddit a better,
            safer, and more welcoming place for everyone; and it means a lot to
            us.
          </p>
          <div className='border-y-2 border-lines-color py-5 flex justify-between'>
            <div className='flex gap-3 w-[70%]'>
              <div className='flex items-start'>
                <NoSymbolIcon className='w-[2.5rem] h-[2.5rem] text-black' />
              </div>
              <div>
                <h3 className='text-lg font-bold text-black'>
                  Block {props.senderUsername}
                </h3>
                <p className='text-gray-light'>
                  You won&apos;t be able to send direct messages or chat
                  requests to each other.
                </p>
              </div>
            </div>
            <div className='flex items-center justify-center'>
              <SwitchButton
                checked={false}
                onChange={(value) => {
                  console.log(value);
                  postReq.mutate(
                    {
                      endPoint: `users/block-unblock-user?blocked_username=${props.senderUsername}&block=${value}`,
                      data: {},
                    },
                    {
                      onSuccess: () => {
                        setTrigger(!trigger);
                        setIsError(false);
                        setAlertMessage('User blocked successfully!');
                      },
                      onError: () => {
                        setTrigger(!trigger);
                        setIsError(true);
                        setAlertMessage(
                          'An error ocurred while blocking user!'
                        );
                      },
                    }
                  );
                }}
              />
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <RoundedButton
            buttonBorderColor='border-blue-light'
            buttonColor='bg-blue-light'
            buttonText='DONE'
            buttonTextColor='text-white font-bold px-8'
            onClick={() => {
              props.handleOpen();
              queryClient.invalidateQueries(props.query);
            }}
          />
        </DialogFooter>
      </Dialog>
    </>
  );
};

const Message = (props: {
  unread: boolean;
  type: string;
  isReply?: boolean;
  sendingDate: Date;
  repliesArr?: [object];
  senderUsername: string;
  receiverUsername: string;
  senderType: string;
  receiverType: string;
  subject: string;
  isSent: boolean;
  senderVia?: string;
  messageContent: string;
  messageId: string;
  parentMessageId: string;
  refetch: () => void;
  query?: string;
}) => {
  const [msgUnread, setMsgUnead] = React.useState(props.unread);
  const [reply, setReply] = React.useState('');
  const [replyValid, setReplyValid] = React.useState(true);
  const [replyBool, setReplyBool] = React.useState(false);
  const [deleteBool, setDeleteBool] = React.useState(false);
  const [blockBool, setBlockeBool] = React.useState(false);
  const [reportModal, setReportModal] = React.useState(false);
  const [thankyouModal, setThankyouModal] = React.useState(false);
  const [isExpandedAll, setIsExpandedAll] = React.useState(true);
  const [isExpandedMain, setIsExpandedMain] = React.useState(true);

  const postReq = useMutation(postRequest);
  const { trigger, setTrigger, setAlertMessage, setIsError } = useAlert();

  const handleThankyouModal = () => {
    setThankyouModal(!thankyouModal);
  };
  const handleReportModal = () => {
    setReportModal(!reportModal);
  };
  React.useEffect(() => {
    setIsExpandedMain(isExpandedAll);
  }, [isExpandedAll]);
  // const repliesArr = [
  //   { recieverUsername: 'mido', reply: 'this is a reply' },
  //   { recieverUsername: 'mido', reply: 'this is a reply' },
  //   { recieverUsername: 'mido', reply: 'this is a reply' },
  // ];

  const ReplyBody = (props: {
    recUsername: string;
    reply: string;
    createDate: Date;
    recType: string;
    sendUsername: string;
    sendType: string;
    sendVia: string;
    isSent: boolean;
    repId: string;
    deleteDate: Date;
  }) => {
    const [isExpandedRep, setIsExpandedRep] = React.useState(true);
    const togglesIsExpandedRep = () => {
      setIsExpandedRep(!isExpandedRep);
    };
    React.useEffect(() => {
      setIsExpandedRep(isExpandedAll);
    }, [isExpandedAll]);
    return (
      <div>
        <p
          className={`text-xs ${msgUnread ? 'text-danger-red font-bold' : ''}`}
        >
          <span
            onClick={togglesIsExpandedRep}
            className='text-blue-light hover:underline cursor-pointer'
          >
            {`[${isExpandedRep ? '-' : '+'}]`}
          </span>
          {/* <span>
            {' '}
            to{' '}
            <Link to='/' className='text-[#80bce9] hover:underline'>
              {props.recUsername}
            </Link>{' '}
          </span>
          <span>
            {' '}
            from{' '}
            <Link to='/' className='text-[#80bce9] hover:underline'>
              {props.recUsername}
            </Link>{' '}
          </span>
          <span>
            {' '}
            via{' '}
            <Link to='/' className='text-[#80bce9] hover:underline'>
              {props.recUsername}
            </Link>{' '}
          </span>
          <span>sent {getTimeDifferenceAsString(props.createDate)}</span> */}

          {!props.isSent && (
            <span>
              {' '}
              from{' '}
              <Link
                to={`/${props.sendType === 'user' ? 'user/' + props.sendUsername : addPrefixToUsername(props.sendUsername, props.sendType)}`}
                className='text-[#80bce9] hover:underline'
              >
                {addPrefixToUsername(props.sendUsername, props.sendType)}
              </Link>{' '}
            </span>
          )}
          {props.isSent && (
            <span>
              {' '}
              to{' '}
              <Link
                to={`/${props.recType === 'user' ? 'user/' + props.recUsername : addPrefixToUsername(props.recUsername, props.recType)}`}
                className='text-[#80bce9] hover:underline'
              >
                {addPrefixToUsername(props.recUsername, props.recType)}
              </Link>{' '}
            </span>
          )}
          {props.isSent && props.sendType === 'moderator' && (
            <span>
              {' '}
              via{' '}
              <Link
                className='text-[#228822] hover:underline'
                to={`/${addPrefixToUsername(props.sendVia || '', 'moderator')}`}
              >
                {addPrefixToUsername(props.sendVia || '', 'moderator')}
              </Link>
              {' ['}
              <Link
                to={`/${addPrefixToUsername(props.sendVia || '', 'moderator')}/about/moderators`}
                className='text-[#80bce9] hover:underline'
              >
                M
              </Link>
              {'] '}
            </span>
          )}
          <span>sent {getTimeDifferenceAsString(props.createDate)}</span>
        </p>

        {isExpandedRep && <p>{props.reply}</p>}
      </div>
    );
  };
  return (
    <div
      onClick={() => {
        setMsgUnead(false);
      }}
      className='w-full odd:bg-[#f6f7f8] px-4 py-3'
    >
      {props.type === 'message' ? (
        <>
          <div className='flex gap-3'>
            <div className='border-2 border-blue-light rounded-[10px] px-3 font-bold text-blue-light'>
              <Link
                to={`/${props.senderType === 'user' ? 'user/' + props.senderUsername : addPrefixToUsername(props.senderUsername, props.senderType)}`}
              >
                {addPrefixToUsername(props.senderUsername, props.senderType)}
              </Link>
            </div>
            <h3 className='font-bold'>{props.subject}:</h3>
          </div>
          <div className='flex gap-3 text-xs font-semibold text-blue-light mt-1 ml-1'>
            <span
              className='cursor-pointer'
              onClick={() => {
                setIsExpandedAll(true);
              }}
            >
              expand all
            </span>
            <span
              className='cursor-pointer'
              onClick={() => {
                setIsExpandedAll(false);
              }}
            >
              collapse all
            </span>
          </div>
        </>
      ) : (
        <h3 className='font-bold'>
          {props.isReply && 're: '}
          {props.subject}:
        </h3>
      )}
      <div
        className={`px-5 py-2 ${msgUnread ? 'bg-[#edeff1]' : ''} ${props.type === 'message' ? 'border-l-2 border-dashed' : ''}	mt-2`}
      >
        <p
          className={`text-xs ${msgUnread ? 'text-danger-red font-bold' : ''}`}
        >
          {props.type === 'message' && (
            <span
              onClick={() => {
                setIsExpandedMain(!isExpandedMain);
              }}
              className='text-blue-light hover:underline cursor-pointer'
            >
              {`[${isExpandedMain ? '-' : '+'}]`}
            </span>
          )}
          {props.type !== 'sent' && !props.isSent && (
            <span>
              {' '}
              from{' '}
              <Link
                to={`/${props.senderType === 'user' ? 'user/' + props.senderUsername : addPrefixToUsername(props.senderUsername, props.senderType)}`}
                className='text-[#80bce9] hover:underline'
              >
                {addPrefixToUsername(props.senderUsername, props.senderType)}
              </Link>{' '}
            </span>
          )}
          {props.isSent && (
            <span>
              {' '}
              to{' '}
              <Link
                to={`/${props.receiverType === 'user' ? 'user/' + props.receiverUsername : addPrefixToUsername(props.receiverUsername, props.receiverType)}`}
                className='text-[#80bce9] hover:underline'
              >
                {addPrefixToUsername(
                  props.receiverUsername,
                  props.receiverType
                )}
              </Link>{' '}
            </span>
          )}
          {props.isSent && props.senderType === 'moderator' && (
            <span>
              {' '}
              via{' '}
              <Link
                className='text-[#228822] hover:underline'
                to={`/${addPrefixToUsername(props.senderVia || '', 'moderator')}`}
              >
                {addPrefixToUsername(props.senderVia || '', 'moderator')}
              </Link>
              {' ['}
              <Link
                to={`/${addPrefixToUsername(props.senderVia || '', 'moderator')}/about/moderators`}
                className='text-[#80bce9] hover:underline'
              >
                M
              </Link>
              {'] '}
            </span>
          )}
          <span>sent {getTimeDifferenceAsString(props.sendingDate)}</span>
        </p>
        {isExpandedMain && (
          <>
            <p>{props.messageContent}</p>
            <ul className='flex gap-3 mt-3 text-xs text-[#888] font-bold'>
              {!props.isSent &&
                (!deleteBool ? (
                  <li
                    onClick={() => {
                      setDeleteBool(true);
                    }}
                    className='cursor-pointer hover:underline'
                  >
                    Delete
                  </li>
                ) : (
                  <li className='text-danger-red font-normal'>
                    are you sure?{' '}
                    <span
                      onClick={() => {
                        postReq.mutate(
                          {
                            endPoint: 'messages/del-msg',
                            data: {
                              _id: props.messageId,
                              deleted_at: new Date(),
                            },
                          },
                          {
                            onSuccess: () => {
                              props.refetch();
                            },
                          }
                        );
                      }}
                      className=' cursor-pointer hover:underline text-[#888] font-bold'
                    >
                      Yes
                    </span>{' '}
                    /{' '}
                    <span
                      className='text-[#888] font-bold cursor-pointer hover:underline'
                      onClick={() => {
                        setDeleteBool(false);
                      }}
                    >
                      No
                    </span>
                  </li>
                ))}
              <ReportModal
                handleOpen={handleReportModal}
                open={reportModal}
                handleThankyouModal={handleThankyouModal}
                id={props.messageId}
                senderType={props.senderType}
                username={props.senderUsername}
                type='message'
              />
              <ThankYouModal
                handleOpen={handleThankyouModal}
                open={thankyouModal}
                senderUsername={props.senderUsername}
                query={props.query || ''}
              />
              {!props.isSent && (
                <li
                  onClick={handleReportModal}
                  className='cursor-pointer hover:underline'
                >
                  Report
                </li>
              )}

              {!props.isSent &&
                (!blockBool ? (
                  <li
                    onClick={() => {
                      setBlockeBool(true);
                    }}
                    className='cursor-pointer hover:underline'
                  >
                    Block{' '}
                    {!(props.senderType === 'moderator') ? 'User' : 'Subreddit'}
                  </li>
                ) : (
                  <li className='text-danger-red font-normal'>
                    are you sure?{' '}
                    <span
                      onClick={() => {
                        postReq.mutate(
                          {
                            endPoint: `users/block-unblock-user?blocked_username=${props.senderUsername}&block=${true}`,
                            data: {},
                          },
                          {
                            onSuccess: () => {
                              props.refetch();
                              setTrigger(!trigger);
                              setIsError(false);
                              setAlertMessage('User blocked successfully!');
                            },
                            onError: () => {
                              setTrigger(!trigger);
                              setIsError(true);
                              setAlertMessage(
                                'An error ocurred while blocking user!'
                              );
                            },
                          }
                        );
                      }}
                      className=' cursor-pointer hover:underline text-[#888] font-bold'
                    >
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
                ))}
              {props.isSent ||
                (!msgUnread && (
                  <li
                    onClick={(e) => {
                      e.stopPropagation();
                      setMsgUnead(true);
                    }}
                    className='cursor-pointer hover:underline'
                  >
                    Mark Unread
                  </li>
                ))}
              <li
                onClick={() => {
                  setReplyBool(true);
                }}
                className='cursor-pointer hover:underline'
              >
                Reply
              </li>
            </ul>
          </>
        )}
        {replyBool && (
          <div>
            <textarea
              value={reply}
              onChange={(e) => {
                setReply(e.target.value);
              }}
              className='w-[25rem] h-[6rem] mt-7 p-2 border-[1px] border-gray-500'
            ></textarea>
            {!replyValid && (
              <p className='text-danger-red text-sm'>We Need Something Here</p>
            )}
            <div className='flex gap-2 mt-2'>
              <Button
                onClick={() => {
                  setReplyValid(true);
                  if (!reply) {
                    setReplyValid(false);
                    return;
                  }
                  let senderUsername;
                  let senderType;
                  let senderVia;
                  let recUsername;
                  let recType;
                  if (props.isSent) {
                    senderUsername = props.senderUsername;
                    senderType = props.senderType;
                    senderVia = props.senderVia;
                    recUsername = props.receiverUsername;
                    recType = props.receiverType;
                  } else {
                    senderUsername = props.receiverUsername;
                    senderType = props.receiverType;
                    senderVia = props.receiverUsername;
                    recUsername = props.senderUsername;
                    recType = props.senderType;
                  }
                  console.log(props.parentMessageId || props.messageId);

                  postReq.mutate(
                    {
                      endPoint: 'messages/reply',
                      data: {
                        sender_username: senderUsername,
                        sender_type: senderType,
                        senderVia: senderVia,
                        receiver_username: recUsername,
                        receiver_type: recType,
                        message: reply,
                        created_at: new Date(),
                        deleted_at: null,
                        unread_flag: false,
                        isSent: true,
                        isReply: true,
                        parentMessageId:
                          props.parentMessageId || props.messageId,
                        subject: props.subject,
                      },
                    },
                    {
                      onSuccess: () => {
                        setReplyBool(false);
                        setReply('');
                        props.refetch();
                      },
                    }
                  );
                }}
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
        {props.repliesArr && (
          <div className='flex flex-col gap-2 mt-3'>
            {props.repliesArr.map((rep, i) => (
              <ReplyBody
                key={`${rep}+${i}`}
                recUsername={rep['receiver_username']}
                reply={rep['message']}
                createDate={new Date(rep['created_at'])}
                recType={rep['receiver_type']}
                sendUsername={rep['sender_username']}
                sendType={rep['sender_type']}
                sendVia={rep['senderVia']}
                isSent={rep['isSent']}
                repId={rep['_id']}
                deleteDate={rep['deleted_at']}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
