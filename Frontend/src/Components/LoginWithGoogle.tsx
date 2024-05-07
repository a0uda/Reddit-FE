import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin } from '@react-oauth/google';
import { postRequest } from '../API/User';
import { saveToken } from '../utils/tokens_helper';

function LoginWithGoogle(props: { handleOpen: () => void }) {
  const clientId =
    '178664293995-s6s92s28mme4eu54lg367sqhnj8bonff.apps.googleusercontent.com';

  const googleLogin = useGoogleLogin({
    clientId: clientId,
    onSuccess: async (tokenResponse) => {
      console.log('Google login successful', tokenResponse.access_token);
      try {
        const response = await postRequest({
          endPoint: 'users/signup-google',
          data: {
            access_token: tokenResponse.access_token,
          },
        });

        const token = response.token;
        console.log('Token:', token);

        if (token) {
          saveToken(token);
          props.handleOpen();
          location.reload();
        } else {
          console.log('Token not found in response headers');
        }
      } catch (error) {
        console.log('Error:', error);
      }
    },
  });

  return (
    <div
      onClick={() => googleLogin()}
      className='btn rounded-full w-full form-control text-decoration-none p-2 m-2 border flex items-center justify-center cursor-pointer'
    >
      <span>
        <FcGoogle className='mr-2' />
      </span>
      <span className='text-black'>Continue with Google</span>
    </div>
  );
}
export default LoginWithGoogle;
