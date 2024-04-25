import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import { decodeToken, useJwt } from 'react-jwt';
import { removeToken } from '../../utils/tokens_helper';

type User = {
  name: string;
  username: string;
  imageUrl?: string;
};

type Session = {
  status: 'loading' | 'authenticated' | 'unauthenticated';
  user: User | null;
  expiresAt?: number;
};

function useSession() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useToken must be used within an AuthProvider');
  }

  const { decodedToken, isExpired } = useJwt(context.token || '');
  const [session, setSession] = useState<Session>({
    status: 'loading',
    user: null,
  });

  // exp: 1712281498, iat: 1712277898, username: "llllllllll"

  useEffect(() => {
    const token = decodeToken(context.token || '');
    if (token) {
      setSession({
        status: 'authenticated',
        user: token as User,
        // expiresAt: token.exp as number,
      });
    }
  }, [context.token]);

  if (!context.token) return { status: 'unauthenticated', user: null };
  if (isExpired) {
    removeToken();
    return { status: 'unauthenticated', user: null };
  }

  console.log('decodedToken', decodedToken);

  session.user = decodedToken as User;
  session.status = 'authenticated';

  return session;
}

export default useSession;
