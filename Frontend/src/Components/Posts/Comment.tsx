import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from '@material-tailwind/react';
import { useState } from 'react';
import { dateDuration } from '../../utils/helper_functions';
import { useQuery } from 'react-query';
import { fetchRequest } from '../../API/User';
import { CommentType, UserType } from '../../types/types';
import PostOptions from './PostOptions';
import InteractionButtons from './InteractionButtons';
import { Link } from 'react-router-dom';
import Reply from './Reply';
import { EditorContent, useEditor } from '@tiptap/react';
import { tiptapConfig } from '../../utils/tiptap_config';

const Comment = ({ comment }: { comment: CommentType }) => {
  const [author, setAuthor] = useState<UserType | undefined>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const userResponse = useQuery({
    queryKey: ['user'],
    queryFn: () => fetchRequest(`users/about/${comment.username}`),
    onSuccess: (data) => {
      setAuthor(data.data);
    },
  });

  const editable = false;
  const editor = useEditor({
    ...tiptapConfig,
    editable,
    content: comment.description,
  });

  return (
    <>
      <Card className='w-full py-2' shadow={false}>
        <CardHeader
          shadow={false}
          floated={false}
          className='flex flex-row items-center justify-between gap-2 m-0 mb-2 bg-inherit'
        >
          <div className='flex items-center justify-between gap-1 m-0'>
            <Link
              to={`/user/${author?.username || comment.username}`}
              className='flex flex-row items-center gap-2 m-0'
            >
              <Avatar
                variant='circular'
                alt={author?.username || comment.username}
                src={
                  author?.profile_picture ||
                  'https://www.redditstatic.com/avatars/avatar_default_07_24A0ED.png'
                }
                className='h-8 w-8'
              />
              <Typography className='text-sm font-bold text-black hover:underline'>
                {comment.username}
              </Typography>
            </Link>
            <div className='flex flex-row items-center justify-between gap-1 m-0'>
              <span className='relative -top-0.5'>•</span>
              <Typography variant='small' className='text-xs'>
                {dateDuration(new Date(comment.created_at))}
              </Typography>
            </div>
          </div>
        </CardHeader>
        <CardBody className='grid grid-cols-[24px_1fr] sm:grid-cols-[32px_1fr] relative p-0'>
          <div className='flex justify-center group'>
            {/* {comment.replies_comments_ids.length > 0 && (
              <div className='w-[1px] h-full group-hover:bg-black bg-neutral-muted'></div>
            )} */}
          </div>
          <div>
            {/* <Typography variant='paragraph' className='ml-2 text-black'>
              {comment.description}
            </Typography> */}
            <EditorContent editor={editor} />
            <div className='flex items-center px-0'>
              <InteractionButtons
                isPost={false}
                id={comment.id}
                upvotes={comment.upvotes_count}
                downvotes={comment.downvotes_count}
                comments_replies={comment.replies_comments_ids.length}
              />
              <PostOptions saved={comment.saved} hidden={comment.hidden} />
            </div>
            {comment.replies_comments_ids.length > 0 && (
              <div className='flex flex-col gap-2 w-full col-span-2'>
                {/* <div
                  aria-hidden='true'
                  className='col-span-2 flex justify-end align-start relative bg-neutral-background'
                >
                  <div
                    data-testid='branch-line'
                    className='box-border h-4 border-0 border-neutral-muted border-solid border-b-[1px] cursor-pointer w-[calc(50%+0.5px)] border-l-[1px] rounded-bl-[12px]'
                  ></div>
                  <div className='box-border h-4 border-0 border-neutral-muted border-solid border-b-[1px] cursor-pointer w-xs absolute right-[-8px]'></div>
                </div> */}
                {comment.replies_comments_ids.map((reply) => (
                  <Reply key={reply.id} reply={reply} />
                ))}
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default Comment;
