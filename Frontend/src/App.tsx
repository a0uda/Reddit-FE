import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './assets/css/Layout.css';
import UserSettings from './Pages/UserSettings/UserSettings';
import NavigationBar from './Components/NavigationBar.tsx';
import Mainfeed from './Pages/Mainfeed.tsx';
import OfflineAlert from './Components/OfflineAlert.tsx';
import MessageRouter from './Pages/Messaging/MessageRouter.tsx';
import useSession from './hooks/auth/useSession.tsx';

function App() {
  const { status } = useSession();
  const HandleRoutes = (props: { element: JSX.Element }) =>
    status !== 'authenticated' ? <Mainfeed /> : props.element;
  return (
    <div className='App'>
      <Router>
        <OfflineAlert />
        <NavigationBar />
        <Routes>
          <Route path={'/'} element={<Mainfeed />} />
          <Route path={'/:sortOption'} element={<Mainfeed />} />
          <Route
            path='/settings/:page'
            element={<HandleRoutes element={<UserSettings />} />}
          />
          <Route
            path='/message/*'
            element={<HandleRoutes element={<MessageRouter />} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
