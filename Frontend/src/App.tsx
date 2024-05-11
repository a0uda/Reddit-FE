import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './assets/css/Layout.css';
import UserSettings from './Pages/UserSettings/UserSettings';
import NavigationBar from './Components/NavigationBar.tsx';
import Mainfeed from './Pages/Mainfeed.tsx';
import OfflineAlert from './Components/OfflineAlert.tsx';
import MessageRouter from './Pages/Messaging/MessageRouter.tsx';
import useSession from './hooks/auth/useSession.tsx';
import Notifications from './Pages/Notifications.tsx';
import Post from './Pages/Post.tsx';
import User from './Pages/User/User.tsx';
import CreatePost from './Pages/createPost/CreatePost.tsx';
import GeneralSettings from './Pages/Community/GeneralSettings.tsx';
import PostsCommentsSettings from './Pages/Community/PostsCommentsSettings.tsx';
import ContentControls from './Pages/Community/ContentControls.tsx';
import Community from './Pages/Community/Community.tsx';
import Main from './Pages/Mod Queues/Main.tsx';
import Search from './Pages/Search.tsx';
import UserManagement from './Pages/User Management/UserManagement.tsx';
import RuleRemoval from './Pages/Rules and Removal reasons/RulesRemovalTab.tsx';
// import { useQueryClient } from '@tanstack/react-query';
import {
  // MutationCache,
  // QueryCache,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import ChatMain from './Pages/Chatting/ChatMain.tsx';
import { SocketContextProvider } from './Providers/SocketProvider.tsx';
import SchedulePost from './Pages/User Management/SchedulePosts.tsx';
import ResetPassword from './Pages/credential/ResetPassword.tsx';
import ResetPasswordPage from './Pages/credential/ResetPasswordPage.tsx';

function App() {
  const { status } = useSession();
  const HandleRoutes = (props: { element: JSX.Element }) =>
    status !== 'authenticated' ? <Mainfeed /> : props.element;
  // const { trigger, setTrigger, setAlertMessage, setIsError } = useAlert();

  const queryClient = new QueryClient({
    // mutationCache: new MutationCache({
    //   onError: (error) => {
    //     setAlertMessage(error);
    //     setIsError(true);
    //     setTrigger(!trigger);
    //   },
    // }),
    // queryCache: new QueryCache({
    //   onError: (error) => {
    //     setAlertMessage(error);
    //     setIsError(true);
    //     setTrigger(!trigger);
    //   },
    // }),
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        // onError: (error) => {
        //   // const errorObj = JSON.parse(error);
        //   // console.log(errorObj.Error.data, 'hiiiii');
        //   console.log('hiiii query');

        // setAlertMessage(error);
        // setIsError(true);
        // setTrigger(!trigger);
        //   console.log(error);
        // },
      },
      // mutations: {
      //   onError: (error) => {
      //     // const errorObj = JSON.parse(error);
      //     // console.log(errorObj.Error.data.err, 'midoo');
      //     // console.log(error.data.err.message, 'hiiii mutate');
      //     console.log('hiiii mutation');

      //     setAlertMessage(error);
      //     setIsError(true);
      //     setTrigger(!trigger);
      //   },
      // },
    },
  });
  return (
    <SocketContextProvider>
      <QueryClientProvider client={queryClient}>
        <div className='App'>
          <Router>
            <OfflineAlert />
            <NavigationBar />
            <Routes>
              <Route path={'/'} element={<Mainfeed />} />
              <Route
                path={'/resetpassword/:token'}
                element={<ResetPasswordPage />}
              />
              <Route path={'/:sortOption'} element={<Mainfeed />} />
              <Route
                path={'/:prefix/:communityNameOrUsername/comments/:id/:title/'}
                element={<Post />}
              />
              <Route
                path='/settings/:page'
                element={<HandleRoutes element={<UserSettings />} />}
              />
              <Route
                path={`/u/:username/:page`}
                element={<HandleRoutes element={<User />} />}
              />
              <Route
                path={'/:prefix?/:community_name?/submit'}
                element={<HandleRoutes element={<CreatePost />} />}
              />
              <Route
                path='/notifications'
                element={<HandleRoutes element={<Notifications />} />}
              />
              <Route
                path='/message/*'
                element={<HandleRoutes element={<MessageRouter />} />}
              />
              <Route
                path='/r/:community_name/about/unmoderated'
                element={<HandleRoutes element={<Main page='unmoderated' />} />}
              />
              <Route
                path='/r/:community_name/about/edited'
                element={<HandleRoutes element={<Main page='edited' />} />}
              />
              <Route
                path='/r/:community_name/about/spam'
                element={<HandleRoutes element={<Main page='removed' />} />}
              />
              <Route
                path='/r/:community_name/about/contributors'
                element={
                  <HandleRoutes element={<UserManagement page='approved' />} />
                }
              />
              <Route
                path='/r/:community_name/about/moderators'
                element={
                  <HandleRoutes
                    element={<UserManagement page='moderators' />}
                  />
                }
              />
              <Route
                path='/r/:community_name/about/banned'
                element={
                  <HandleRoutes element={<UserManagement page='banned' />} />
                }
              />
              <Route
                path='/r/:community_name/about/muted'
                element={
                  <HandleRoutes element={<UserManagement page='muted' />} />
                }
              />
              <Route
                path='/r/:community_name/about/rules/*'
                element={<HandleRoutes element={<RuleRemoval />} />}
              />
              <Route
                path='/search/*'
                element={<HandleRoutes element={<Search />} />}
              />
              <Route
                path='/chat/u/:username'
                element={<HandleRoutes element={<ChatMain page='chat' />} />}
              />
              <Route
                path='/chat/create'
                element={<HandleRoutes element={<ChatMain page='create' />} />}
              />
              <Route
                path='/r/:community_name/about/edit/community'
                element={<HandleRoutes element={<GeneralSettings />} />}
              />
              <Route
                path='/r/:community_name/about/scheduledposts'
                element={<HandleRoutes element={<SchedulePost />} />}
              />
              <Route
                path='/r/:community_name/about/edit/posts'
                element={<HandleRoutes element={<PostsCommentsSettings />} />}
              />
              <Route
                path='/r/:community_name/about/settings'
                element={<HandleRoutes element={<ContentControls />} />}
              />
              <Route
                path='/r/:communityName'
                element={<HandleRoutes element={<Community />} />}
              />
            </Routes>
          </Router>
        </div>
      </QueryClientProvider>
    </SocketContextProvider>
  );
}

export default App;
