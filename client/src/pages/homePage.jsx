import React, {useState, useEffect} from 'react'

import NavBar from '../react_components/navBar'
import SideBar from '../react_components/sideBar'
import HomePageFeedInfo from './homeFeedInfo.jsx'

import { useAuth } from '../context/userContext.js'

import axios from 'axios'


export default function HomePage(){
    const [alphabeticalSubs, setAlphabeticalSubs] = useState([])

    
    

    useEffect(() => {
        async function getSubs() {
          try {
            const response = await axios.get(`/api/subreddit/searchbar`);
            setAlphabeticalSubs(response.data)
          } catch (error) {
            console.log(`Error obtaining subreddits: ${error}`);
          }
        }
        getSubs();
      }, []);

    return(

      <div className="main-container">
      <NavBar alphabeticalSubs={alphabeticalSubs}/>
      <div className="layout-container">
        <SideBar alphabeticalSubs={alphabeticalSubs}/>
        <div className="feed-container">
        <HomePageFeedInfo/>
        </div>
      </div>
    </div>
        
    )

}


// http://localhost:5000/api/posts/home/loggedin/${category}