import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
export default function LoginWithGoogle() {
  return (
    <Link
      to='/'
      className='btn rounded-full w-full form-control text-decoration-none p-2 m-2 border flex items-center justify-center'
    >
      <span>
        <FcGoogle className='mr-2' />
      </span>
      <span>Continue with Google</span>
    </Link>
  );
}
