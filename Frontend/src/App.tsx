import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './assets/css/Layout.css';
import Login from './Pages/credential/Login';
import Signup from './Pages/credential/Signup';
import RecoverUsername from './Pages/credential/RecoverUsername';
import ResetPassword from './Pages/credential/ResetPassword';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider clientId='178664293995-s6s92s28mme4eu54lg367sqhnj8bonff.apps.googleusercontent.com'>
      <div className='App'>
        <Router>
          <Routes>
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
