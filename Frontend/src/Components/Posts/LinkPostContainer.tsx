import { PostType } from '../../types/types';
import { Link } from 'react-router-dom';

const LinkPostContainer = (props: { post: PostType }) => {
  return (
    <div className='flex flex-col justify-center gap-1'>
      <Link
        to={props.post.link_url || '/'}
        className='text-purple-600 hover:underline'
      >
        {props.post.link_url}
      </Link>
    </div>
  );
};

export default LinkPostContainer;
