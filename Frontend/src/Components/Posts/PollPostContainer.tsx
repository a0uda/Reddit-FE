import { useState } from 'react';
import { PostType } from '../../types/types';
import { useMutation } from 'react-query';
import { useAlert } from '../../Providers/AlertProvider';
import { Radio } from '@material-tailwind/react';
import RoundedButton from '../RoundedButton';
import { postRequest } from '../../API/User';
import NonEditableProvider from '../../Providers/NonEditableProvider';

const PollPostContainer = ({ post }: { post: PostType }) => {
  const [chosenOptionId, setChosenOptionId] = useState<string>(post.poll_vote);
  const [alreadyVoted, setAlreadyVoted] = useState<boolean>(!!post.poll_vote);
  const postReq = useMutation(postRequest);
  const { trigger, setTrigger, setAlertMessage, setIsError } = useAlert();

  return (
    <div>
      {post.description && <NonEditableProvider content={post.description} />}
      <div className='bg-white rounded-lg flex flex-col gap-2 p-2 border-2 border-lines-color mb-1 w-full'>
        <div className='flex flex-col gap-1'>
          {post.polls &&
            post.polls.map((poll) => (
              <Radio
                name={post._id}
                label={
                  poll.options +
                  ' ' +
                  '(Number of votes: ' +
                  (poll.votes + (chosenOptionId == poll._id ? 1 : 0)) +
                  ')'
                }
                value={poll._id}
                checked={poll._id == chosenOptionId}
                key={poll._id}
                crossOrigin={undefined}
                onChange={(e) => {
                  console.log(e.target.value);
                  setChosenOptionId(e.target.value);
                }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                disabled={alreadyVoted}
              />
            ))}
        </div>
        <div className='flex gap-2 items-center'>
          <RoundedButton
            buttonBorderColor='border-lines-color'
            buttonColor='bg-lines-color'
            buttonText='Vote'
            buttonTextColor='text-black'
            disabled={!chosenOptionId || alreadyVoted}
            onClick={(e) => {
              e.stopPropagation();
              postReq.mutate(
                {
                  endPoint: 'posts/poll-vote',
                  data: { id: post._id, option_id: chosenOptionId },
                },
                {
                  onSuccess: () => {
                    setAlreadyVoted(true);
                  },
                  onError: () => {
                    setIsError(true);
                    setAlreadyVoted(false);
                    setTrigger(!trigger);
                    setAlertMessage('Unable to vote!');
                  },
                }
              );
            }}
          />
          <span>
            {post.polls_voting_is_expired_flag
              ? 'Expired!'
              : "Didn't expire yet!"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PollPostContainer;
