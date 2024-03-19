// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './assets/css/Layout.css';
// import UserSettings from './Pages/UserSettings/UserSettings';
import Login from './Pages/credential/Login.tsx';
import Signup from './Pages/credential/Signup.tsx';
import RecoverUsername from './Pages/credential/RecoverUsername.tsx';
import ResetPassword from './Pages/credential/ResetPassword.tsx';
import { Button } from '@material-tailwind/react';
import UserSettings from './Pages/UserSettings/UserSettings';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/settings/:page' element={<UserSettings />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/recoverUsername' element={<RecoverUsername />} />
          <Route path='/resetPassword' element={<ResetPassword />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
