import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './assets/css/Layout.css';
import UserSettings from './Pages/UserSettings/UserSettings';
import NavigationBar from './Components/NavigationBar.tsx';
import Mainfeed from './Pages/Mainfeed.tsx';
import OfflineAlert from './Components/OfflineAlert.tsx';
import MessageRouter from './Pages/Messaging/MessageRouter.tsx';
import useSession from './hooks/auth/useSession.tsx';
import Notifications from './Pages/Notifications.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import OfflineAlert from './Components/OfflineAlert.tsx';
import { AuthProvider } from './Providers/AuthProvider.tsx';
import Post from './Pages/Post.tsx';
import User from './Pages/User/User.tsx';
import CreatePost from './Pages/createPost/CreatePost.tsx';

function App() {
  const { status } = useSession();
  const HandleRoutes = (props: { element: JSX.Element }) =>
    status !== 'authenticated' ? <Mainfeed /> : props.element;
  return (
    <div className='App'>
      <Router>
        <OfflineAlert />
        <NavigationBar />
        <Routes>
          <Route path={'/'} element={<Mainfeed />} />
          <Route path={'/:sortOption'} element={<Mainfeed />} />
          <Route
            path={'/r/:communityName/comments/:id/:title/'}
            element={<Post />}
          />
          <Route path='/settings/:page' element={<UserSettings />} />
          <Route path={`/user/:username/:page`} element={<User />} />
          <Route path={'/submit'} element={<CreatePost />} />
          <Route path='/notifications' element={<Notifications />} />
          <Route
            path='/message/*'
            element={<HandleRoutes element={<MessageRouter />} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
