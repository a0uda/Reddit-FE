import { CommentType } from '../../types/types';
import Comment from './Comment';

const Reply = ({ reply }: { reply: CommentType }) => {
  return (
    // <>Reply: {replyId}</>
    <>
      <>
        <Comment comment={reply} />
      </>
    </>
  );
};

export default Reply;
