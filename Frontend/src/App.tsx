import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './assets/css/Layout.css';
import UserSettings from './Pages/UserSettings/UserSettings';
import NavigationBar from './Components/NavigationBar.tsx';
import Mainfeed from './Pages/Mainfeed.tsx';
import OfflineAlert from './Components/OfflineAlert.tsx';
import MessageRouter from './Pages/Messaging/MessageRouter.tsx';
import useSession from './hooks/auth/useSession.tsx';
import Notifications from './Pages/Notifications.tsx';
import Post from './Pages/Post.tsx';
import User from './Pages/User/User.tsx';
import CreatePost from './Pages/createPost/CreatePost.tsx';
import GeneralSettings from './Pages/Community/GeneralSettings.tsx';
import PostsCommentsSettings from './Pages/Community/PostsCommentsSettings.tsx';
import ContentControls from './Pages/Community/ContentControls.tsx';

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
            element={<HandleRoutes element={<Post />} />}
          />
          <Route
            path='/settings/:page'
            element={<HandleRoutes element={<UserSettings />} />}
          />
          <Route
            path={`/user/:username/:page`}
            element={<HandleRoutes element={<User />} />}
          />
          <Route
            path={'/submit'}
            element={<HandleRoutes element={<CreatePost />} />}
          />
          <Route
            path='/notifications'
            element={<HandleRoutes element={<Notifications />} />}
          />
          <Route
            path='/message/*'
            element={<HandleRoutes element={<MessageRouter />} />}
          />
          <Route
            path='/communitysettings'
            element={<HandleRoutes element={<GeneralSettings />} />}
          />
          <Route
            path='/postcommentsettings'
            element={<HandleRoutes element={<PostsCommentsSettings />} />}
          />
          <Route
            path='/contentcontrol'
            element={<HandleRoutes element={<ContentControls />} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
