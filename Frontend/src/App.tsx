import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './assets/css/Layout.css';
import Login from './Pages/credential/Login';
import Signup from './Pages/credential/Signup';
import RecoverUsername from './Pages/credential/RecoverUsername';
import ResetPassword from './Pages/credential/ResetPassword';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
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
