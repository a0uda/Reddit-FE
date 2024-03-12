import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './assets/css/Layout.css';
import UserSettings from './Pages/UserSettings/UserSettings';

function App() {
  return (
    <div className='App'>
      <UserSettings />
      {/* <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router> */}
    </div>
  );
}

export default App;
