import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AuthProvider, useAuth} from './context/userContext.js';
import { SubredditProvider, useSubreddits } from './context/subredditContext.js';

import LoginForm from './pages/loginPage.jsx';


import SubredditFeed from './pages/subredditFeed.jsx'
import HomePageFeedInfo from './pages/homeFeedInfo.jsx';
import ViewPost from './pages/viewPost.jsx'
import CreatePostPage from './pages/createPost.jsx';
import UserFeed from './pages/userPage.jsx';


import Layout from './context/layout.js'
import { useEffect } from 'react';

const App = () => {

  useEffect(() => {
    localStorage.removeItem('jwtToken')
    console.log('Token removed from local storage...')
  })

  console.log('App is being rendered...');
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      
      <Route element={<Layout />}>
        <Route path="/" element={<HomePageFeedInfo />} />
        <Route path="/subreddit/:subreddit" element={<SubredditFeed />} />
        <Route path="/post/:postId" element={<ViewPost/>}/>
        <Route path='/create-post' element={<CreatePostPage/>}/>
        <Route path ='/user/:user' element ={<UserFeed/>}/>
      </Route>
      
    </Routes>
  );
};


export default function MainApp(){
  return (
    
          <AuthProvider>
          <SubredditProvider>

              <App />

            </SubredditProvider>

          </AuthProvider>
 
    );
}