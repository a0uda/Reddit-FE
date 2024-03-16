import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './assets/css/Layout.css';
import Login from './Pages/credential/Login.tsx';
import Signup from './Pages/credential/Signup.tsx';
import RecoverUsername from './Pages/credential/RecoverUsername.tsx';
import ResetPassword from './Pages/credential/ResetPassword.tsx';
import UserSettings from './Pages/UserSettings/UserSettings';
import NavigationBar from './Components/NavigationBar.tsx';
import OfflineAlert from './Components/OfflineAlert.tsx';

function App() {
  return (
    <div className='App'>
      <NavigationBar />
      <OfflineAlert />
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
