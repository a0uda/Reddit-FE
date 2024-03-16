import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './assets/css/Layout.css';
import NavigationBar from './Components/NavigationBar';
import Mainfeed from './Pages/Mainfeed';
import OfflineAlert from './Components/OfflineAlert';

function App() {
  return (
    <div className='App'>
      <NavigationBar />
      <OfflineAlert />
      <Router>
        <Routes>
          <Route path='/' element={<Mainfeed />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
