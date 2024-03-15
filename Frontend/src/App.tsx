import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './assets/css/Layout.css';
import NavigationBar from './components/NavigationBar';
import Mainfeed from './Pages/Mainfeed';

function App() {
  return (
    <div className='App'>
      <NavigationBar />
      <Router>
        <Routes>
          <Route path='/' element={<Mainfeed />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
