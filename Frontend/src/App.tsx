import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './assets/css/Layout.css';
import UserSettings from './Pages/UserSettings/UserSettings';
import NavigationBar from './Components/NavigationBar.tsx';
import Mainfeed from './Pages/Mainfeed.tsx';
import Notifications from './Pages/Notifications.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import OfflineAlert from './Components/OfflineAlert.tsx';
import Post from './Pages/Post.tsx';
import User from './Pages/User/User.tsx';

function App() {
  return (
    <GoogleOAuthProvider clientId='178664293995-s6s92s28mme4eu54lg367sqhnj8bonff.apps.googleusercontent.com'>
      <div className='App'>
        <Router>
          <OfflineAlert />
          <NavigationBar />
          <Routes>
            <Route path={'/'} element={<Mainfeed />} />
            <Route
              path={'/r/:communityName/comments/:id/:title/'}
              element={<Post />}
            />
            <Route path={'/:sortOption'} element={<Mainfeed />} />
            <Route path='/settings/:page' element={<UserSettings />} />
            {/* to be deleted Ree */}
            <Route path='/user/:page' element={<User />} />
            <Route path='/notifications' element={<Notifications />} />
          </Routes>
        </Router>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
