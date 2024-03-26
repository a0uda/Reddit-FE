import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin } from '@react-oauth/google';
import { postRequest } from '../API/User';
import { useNavigate } from 'react-router-dom';

function LoginWithGoogle() {
  const navigate = useNavigate();
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log('Google login successful', tokenResponse);
      try {
        const response = await postRequest({
          endPoint: 'users/signup-google',
          data: tokenResponse,
        });
        const { token } = response;
        localStorage.setItem('token', token);
        navigate('/');
      } catch (error) {
        console.log('errorrr');
      }
    },
    onError: () => {
      console.error('Google login failed');
    },
    flow: 'auth-code',
  });

  return (
    <div
      onClick={() => googleLogin()}
      className='btn rounded-full w-full form-control text-decoration-none p-2 m-2 border flex items-center justify-center'
    >
      <span>
        <FcGoogle className='mr-2' />
      </span>
      <span className='text-black'>Continue with Google</span>
    </div>
  );
}
export default LoginWithGoogle;
