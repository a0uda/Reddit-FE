import { CommentType } from '../../types/types';
import Comment from './Comment';

const Reply = ({ reply }: { reply: CommentType }) => {
  return (
    <>
      <>
        <Comment comment={reply} showButton={false} />
      </>
    </>
  );
};

export default Reply;
