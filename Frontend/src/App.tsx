// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './assets/css/Layout.css';
import UserSettings from './Pages/UserSettings/UserSettings';
import { Button } from '@material-tailwind/react';

function App() {
  return (
    <div className='App'>
      <Button size='sm'>Button</Button>
      <Router>
        <Routes>
          <Route path='/settings/:page' element={<UserSettings />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
