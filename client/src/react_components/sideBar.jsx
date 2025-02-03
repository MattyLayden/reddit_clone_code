
import {useNavigate} from 'react-router-dom'

import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import AddIcon from '@mui/icons-material/Add';

import CircularProgress from '@mui/material/CircularProgress';

import { useSubreddits } from '../context/subredditContext.js';

import '../css/sidebar.css'

import { useEffect, useState } from 'react';
import axios from 'axios';

import { useAuth } from '../context/userContext.js';


function CircularIndeterminate() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2}}>
      <CircularProgress />
    </Box>
  );
}


export function SideBar(){
    const navigate = useNavigate();

    const [recentlyVisited, setRecentlyVisited] = useState([])
    const [recentLoading, setRecentLoading] = useState(false)
    
    const alphabeticalSubs = useSubreddits();
    console.log(alphabeticalSubs)
    const {isAuthenticated} = useAuth();
    

    useEffect(() => {
        async function fetchRecentSubs(){
            setRecentLoading(true)
            try{
                const token = localStorage.getItem('jwtToken')
                if(token){
                    const response = await axios.get(`/api/user/recentlyvisited`, {}, 
                        {headers:{Authorization: `Bearer ${token}`}}
                    )
                    if(response.status === 200){
                        const recentSubs = response.data.recentSubs || [];

                        console.log(recentSubs)


                        const normalisedSubs = recentSubs.map((sub) => {
                                return sub.replace(/^"|"$/g, '')
                        })

                        const getIcons = normalisedSubs.map((normalisedSub) => {
                            const match =  alphabeticalSubs.find((alphabeticalSub) => alphabeticalSub.name === normalisedSub)
                            return match ? {name: match.name, icon: match.icon} : ''
                        })

                        console.log(getIcons)
                        setRecentlyVisited(getIcons)

                        
                    }
                }
            }catch(error){
                console.log(`Error ${error}`)
            }finally{
                setRecentLoading(false)
            }
        }
        if(isAuthenticated){
            fetchRecentSubs()
        }
        
    }, [isAuthenticated])


    function handleSubredditClick(subredditName){
        navigate(`/subreddit/${subredditName}`)
    }
    
    function handleNewSubredditClick(){
        navigate(`/subreddit/create`)
    }

    function handleMoreClick(){
        navigate(`/user/subreddits/seeAll`)
    }

    function handleCreatePostClick(){
        navigate(`/create-post`)
    }


    //recentlyVisited & alphabeticalSubs e.g. [{name: "x", icon: "y"}, {name: "z", icon: "xyz"}]



    return (
        <>
            <div id='sidebar-container'>
                <Box sx={{ width: '100%', maxWidth: 360, marginLeft: '10px', boxShadow:'none', backgroundColor: '#f5f5f5' }}>
                    
                    {isAuthenticated && (
                        <>
                        <Typography variant="subtitle2" sx={{ marginTop: '16px', marginBottom: '8px' }}>
                        Recently Visited
                    </Typography>
                    <nav id="recentsubs">
                        {recentLoading ? 
                        <CircularIndeterminate/>
                        :
                        <List>
                        {/* First list is recently visited subs*/}
                        {recentlyVisited.map((recentsub, index) => (
                            <ListItem key={index} >
                                <ListItemButton onClick={() => handleSubredditClick(recentsub.name)}>
                                    <img src={recentsub.icon} alt={recentsub.name} style={{ width: '24px', height: '24px', marginRight: '8px' }} />
                                    <ListItemText primary={recentsub.name} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    }
                    </nav>
                        </>
                    )}
                
                    <Divider sx={{ marginTop: '16px', marginBottom: '16px' }} />
                    <Typography variant="subtitle2" sx={{ marginBottom: '8px' }}>
                        Communities
                    </Typography>
                    <nav id="allSubsAlphabetical">
                        <List>
                        <ListItem disablePadding>
                            <ListItemButton>
                            <ListItemIcon>
                                <AddIcon/>
                            </ListItemIcon>
                            <ListItemText onClick={handleNewSubredditClick} primary="Create a community" />
                            </ListItemButton>
                        </ListItem>
                            {/* Second list is all subs subscribed to alphabetically. Slicing as will be 100 objects*/}
                            {alphabeticalSubs.slice(0,10).map((alphabeticalSub, index) => (
                                <ListItem key={index} disablePadding>
                                    <ListItemButton onClick={() => handleSubredditClick(alphabeticalSub.name)}>
                                        <img src={alphabeticalSub.icon} alt={alphabeticalSub.name} style={{ width: '24px', height: '24px', marginRight: '8px' }} />
                                        <ListItemText primary={alphabeticalSub.name} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                            <ListItem disablePadding onClick={handleMoreClick}>
                                <ListItemButton>
                                    <ListItemText primary={"See all."}/>
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </nav>
                </Box>
            </div>
        </>
    );


}

export default SideBar