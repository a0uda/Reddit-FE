// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import './assets/css/Layout.css';
import NavigationBar from './components/NavigationBar';

function App() {
  return (
    <div className='App'>
      <NavigationBar />
      <Router>
        <Routes>
          {/* <Route path='/settings/:page' element={<UserSettings />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
