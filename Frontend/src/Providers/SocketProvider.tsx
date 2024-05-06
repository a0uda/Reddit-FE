import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from 'react';
import io, { Socket } from 'socket.io-client';
import useSession from '../hooks/auth/useSession';

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [socket, setSocket] = useState<Socket>();
  const { user } = useSession();

  useEffect(() => {
    if (user?.username) {
      const socket = io('https://redditech.me', {
        path: '/socket.io',
        query: {
          token: localStorage.getItem('token'),
        },
      });
      setSocket(socket);
      socket.on('connect', () => {
        console.log('Connection established');
      });
      console.log('in socket');
      socket.on('connect_error', (error) => {
        console.log('Connection failed', error);
      });

      socket?.on('connection', () => {
        // newMessage.shouldShake = true;
        console.log('connected to server');
      });

      // socket.on() is used to listen to the events. can be used both on client and server side
      //   socket.on('getOnlineUsers', (users) => {
      //     setOnlineUsers(users);
      //   });

      //   return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(undefined);
      }
    }
  }, [user?.username]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
