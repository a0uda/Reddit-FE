import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './assets/css/Layout.css';
import Login from './Pages/credential/Login.tsx';
import Signup from './Pages/credential/Signup.tsx';
import RecoverUsername from './Pages/credential/RecoverUsername.tsx';
import ResetPassword from './Pages/credential/ResetPassword.tsx';
import UserSettings from './Pages/UserSettings/UserSettings';
import NavigationBar from './Components/NavigationBar.tsx';
import Mainfeed from './Pages/Mainfeed.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider clientId='178664293995-s6s92s28mme4eu54lg367sqhnj8bonff.apps.googleusercontent.com'>
      <div className='App'>
        <Router>
          <NavigationBar />
          <Routes>
            <Route path={'/'} element={<Mainfeed />} />
            <Route path={'/:sortOption'} element={<Mainfeed />} />
            <Route path='/settings/:page' element={<UserSettings />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/forget-username' element={<RecoverUsername />} />
            <Route path='/forget-password' element={<ResetPassword />} />
          </Routes>
        </Router>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
